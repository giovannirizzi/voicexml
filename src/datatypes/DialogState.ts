
class DialogState{

    private _lastFormItemId : number;
    private _formItemsVariableMap : { [key: string]: any} = {};
    private _isInitialized : boolean = false;

    constructor(dialogState : DialogState | undefined = undefined){

        this._lastFormItemId = -1;
        Object.assign(this, dialogState);   
    }

    get lastFormItemId(){
        return this._lastFormItemId;
    }

    set lastFormItemId(id){
        this.lastFormItemId = id;
    }

    get isInitialized(){
        return this._isInitialized;
    }

    getVariableOfFormItemByName(name : string) : any{
        return this._formItemsVariableMap[name];
    }

    get formItemsVariableMap(){
        return this._formItemsVariableMap;
    }

    setVariableOfFormItemByName(name : string, value : any){
        this.formItemsVariableMap[name] = value;
    }

}

export default DialogState;