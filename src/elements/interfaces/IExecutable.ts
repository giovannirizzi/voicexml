import { Element } from '../Element';

interface IExecutable{

    execute(/* Javascript Evaluator*/): void;
}

function isExecutable(arg : Element | IExecutable): arg is IExecutable {
    return (arg as IExecutable).execute !== undefined;
}

export { IExecutable, isExecutable };