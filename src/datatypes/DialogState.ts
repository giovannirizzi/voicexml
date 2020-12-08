
class DialogState{

    private _idDialog : string | undefined;
    private _lastFormItemId : number | undefined;
    private _formItemsVariableMap : { [key: string]: any} = {};

    constructor(dialogState : DialogState | undefined = undefined){

        this._lastFormItemId = -1;
        this._idDialog = undefined;
        Object.assign(this, dialogState);   
    }

    get lastFormItemId(){
        return this._lastFormItemId;
    }

    get idDialog(){
        return this._idDialog;
    }

    get initialized(){
        return this.lastFormItemId !== undefined;
    }

    set lastFormItemId(id){
        this._lastFormItemId = id;
    }

    set idDialog(id){
        this._idDialog = id;
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