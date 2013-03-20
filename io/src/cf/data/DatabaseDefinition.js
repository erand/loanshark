/**
 * 
 * @private
 *
 * Database Definition
 *
 */
Ext.define('Ext.cf.data.DatabaseDefinition', {
   requires: ['Ext.cf.Utilities'],

    config: {
        /**
         * @cfg groupId
         * @accessor
         */
        groupId: undefined,
        /**
         * @cfg userId
         * @accessor
         */
        userId: undefined,
        /**
         * @cfg databaseName
         * @accessor
         */
        databaseName: undefined,
        /**
         * @cfg generation
         * @accessor
         */
        generation: undefined, // of the database
        /**
         * @cfg idProperty
         * @accessor
         */
        idProperty: undefined,
        /**
         * @cfg version
         * The version of the client side storage scheme.
         * @accessor
         */
        version: 2
        // JCM include the epoch of the clock here?
    },  
    
    /** 
     * @private
     *
     * Constructor
     *
     * @param {Object} config
     *
     */
    constructor: function(config) {
        var validated = Ext.cf.util.ParamValidator.validateApi([
            { name: "config", type: "object",
                keys: [
                    { name: "databaseName", type: 'string' },
                    { name: "generation", type: 'number|string' }
                ]
            }
        ], arguments, 'DatabaseDefinition', 'constructor');
        this.initConfig(config);
    },

    /** 
     * hasOwner
     *
     * @return {Boolean} True/False
     *
     */
    hasOwner: function() {
        return this.getUserId()!==undefined || this.getGroupId()!==undefined;
    }

});
