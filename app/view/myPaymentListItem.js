/*
 * File: app/view/myPaymentListItem.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Payback.view.myPaymentListItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.myPaymentListItem',

    config: {
        baseCls: 'x-data-item',
        updateRecord: function(newRecord, oldeRecord) {
            newRecord.getData(true);
            this.child('component').setData(newRecord.data);
        },
        cls: [
            'x-list-item'
        ],
        items: [
            {
                xtype: 'container',
                baseCls: 'x-list-item-label',
                itemId: 'paymentListItemDetail',
                tpl: [
                    '<div>',
                    '${amount} -  {memo} ',
                    '</div>'
                ],
                items: [
                    {
                        xtype: 'button',
                        docked: 'right',
                        hidden: true,
                        itemId: 'deletePayment',
                        ui: 'decline-round',
                        text: 'delete'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onPaymentDeleteButtonTap',
                event: 'tap',
                delegate: '#deletePayment'
            }
        ]
    },

    onPaymentDeleteButtonTap: function(button, e, options) {

        //retrieve dataview and payment
        var dataview = this.up('dataview');
        var payment = this.getRecord();

        //removes payment from debt, then from the store
        payment.getDebt().payments().remove(payment);
        dataview.getStore().remove(payment);
        dataview.getStore().sync(); //sync with local storage
    }

});