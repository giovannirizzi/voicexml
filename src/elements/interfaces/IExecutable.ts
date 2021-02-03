import { Element } from '../Element';

class ExecutionResult {

    private _speachableOutput : string;

    constructor(){
        this._speachableOutput = "";
    }

    appendSpeachableOutput(out : string){
        if(out.length > 0){

            if(this._speachableOutput.length > 0)
                this._speachableOutput += ' '

            this._speachableOutput += out;
        }
    }

    get speachableOutput(){
        return this._speachableOutput;
    }
}

export default ExecutionResult;

interface IExecutable{

    execute(/* Javascript Evaluator*/): ExecutionResult;
}

function isExecutable(arg : Element | IExecutable): arg is IExecutable {
    return (arg as IExecutable).execute !== undefined;
}

export { IExecutable, ExecutionResult, isExecutable };