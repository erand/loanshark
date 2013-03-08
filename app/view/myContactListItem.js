/*
 * File: app/view/myContactListItem.js
 *
 * This file was generated by Sencha Architect version 2.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.1.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Payback.view.myContactListItem', {
    extend: 'Ext.dataview.component.ListItem',
    alias: 'widget.myContactListItem',

    config: {
        //cls: 'x-list-item',
        items: [
            {
                xtype: 'container',
                //baseCls: 'x-list-item-label',
                itemId: 'contactListItemDetail',
                tpl: [
                    '<div>',
                    '<div style="margin-right:.5em;float:left;width:1.1em;height:1.1em;background-color:orange;-webkit-mask-image: url(\'resources/images/user_business.png\');-webkit-mask-size: 1.1em;"></div>',
                    '',
                    '{name}',
                    '<b class=\'money-label\' style=\'float: right;color:red;\'>',
                    '{[(values.balance<0)?\'-\':\'\']}${[Math.abs(values.balance).toFixed(2)]}',
                    '</b>',
                    '<br>',
                    '</div>',
                    ''
                ],
                items: [
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        docked: 'right',
                        hidden: true,
                        itemId: 'deleteContact',
                        margin: '0 0 0 10px',
                        iconCls: 'icon-delete',
                        iconMask: true,
                        text: 'delete'
                    }
                ]
            }
                 
        ],
        listeners: [
            {
                fn: 'onContactDeleteButtonTap',
                event: 'tap',
                delegate: '#deleteContact'
            }
        ]
    },

    onContactDeleteButtonTap: function(button, e, eOpts) {

        //stops propagation of event, without this sometimes both the itemtap 
        //and deletebuttontap would get fired after a previous record is deleted from dataview.
        e.stopEvent(); 

        var debts = this.getRecord().debts();
        var debtStore = Ext.getStore('Debts');
        var paymentStore = Ext.getStore('Payments');

        //remove payments from each debt
        debts.each(function(item,index,length){
            var payments = item.payments();
            paymentStore.remove(payments.getData().items); //remove from store
            payments.removeAll(); //remove from associated store
            paymentStore.sync(); //sync payments with localStorage
        });

        //remove debts from person
        debtStore.remove(debts.getData().items); //remove from store
        debts.removeAll(); //remove from associated store
        debtStore.sync(); //sync debts with localStorage

        //removes person from store 
        var dataview = this.up('dataview');
        dataview.getStore().remove(this.getRecord()); //remove person
        dataview.getStore().sync(); //sync with localStorage

        //update the summary
        Payback.app.application.getController('Payback.controller.Summary').updateSummary();

    },

    updateRecord: function(newRecord, oldeRecord) {
        //this stops propagation of event in deleteButtonTap and allows the record to be deleted from the store
        this.callParent(arguments);
        if (!newRecord) {
            return; // removal, not update
        }
        newRecord.getData(true);
        this.child('component').setData(newRecord.data);
    }

});