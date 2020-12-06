
import vm from 'vm';
import Scope from './Scope';

class Model {

	private _scopeStack : Array<Scope>;
	private _currentScope : Scope | undefined;
	private _rootContext;

	constructor() {
		this._scopeStack = [];
		this._currentScope = undefined;
		this._rootContext = vm.createContext({});
	}

	private _createScopeVariable(scope : Scope) {
		if (scope.name === Scope.ANONYMOUS) {
			return;
		}

		Object.defineProperty(this._rootContext, scope.name, {
			configurable: true,
			get: function () { return scope.context }
		});
	}

	private _deleteScopeVariable(scope : Scope) {
		Object.defineProperty(this._rootContext, scope.name, {
			value: undefined
		});
	}

	pushScope(scopeName : string) {
		var currentContext = this._currentScope
			? this._currentScope.context
			: this._rootContext;

		var scope = new Scope(scopeName, currentContext);
		this._createScopeVariable(scope);

		this._currentScope = scope;
		this._scopeStack.unshift(scope);
	}

	popScope() {
		var poppedScope = this._scopeStack.shift();

		if(poppedScope)
			this._deleteScopeVariable(poppedScope);

		this._currentScope = this._scopeStack.slice(0, 1).shift();
	}		

	create(name : string, value : any) {
		return this.run(`(value) => ${name} = value;`)(value);
	}

	assign(name : string, value : any) {
		return this.create(name, value);
	}

	clear(name : string, value : any) {
		return this.assign(name, undefined);
	}

	evaluate(expr : string, defaultValue : any = undefined) {
		return expr ? this.run(expr) : defaultValue;
	}

	run(code : string) {
		//TODO ASSERT _currentScope can be undefined
		if(this._currentScope)
			return vm.runInContext(code, this._currentScope.context);
	}
}

export default new Model();