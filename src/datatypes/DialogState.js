'use strict';

class DialogState{

    constructor(){

        this.lastFormItemId = -1;
        this.formItemsVariableMap = {}
    }

    constructor(dialogState){

        Object.assign(this, dialogState);
    }

    getVariableOfFormItemByName(name){
        return formItemsVariableMap[name];
    }

    get formItemsVariableMap(){
        return this.formItemsVariableMap;
    }

    setVariableOfFormItemByName(name, value){
        this.formItemsVariableMap[name] = value;
    }

    set lastFormItemId(id){
        this.lastFormItemId = id;
    }

}

module.exports = DialogState;