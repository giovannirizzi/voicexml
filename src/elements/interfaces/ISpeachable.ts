import { Element } from '../Element';

interface ISpeachable{

    getSpeachableOutput(/* Javascript Evaluator*/): string;
}

function isSpeachable(arg : Element | ISpeachable): arg is ISpeachable {
    return (arg as ISpeachable).getSpeachableOutput !== undefined;
}

export { ISpeachable, isSpeachable };