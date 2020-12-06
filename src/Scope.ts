'use strict';

const vm = require('vm');

class Scope {

	private _name : string;
	private _context : any;

	public static readonly SESSION : string = 'session';
	public static readonly APPLICATION : string = 'application';
	public static readonly DOCUMENT : string = 'document';
	public static readonly DIALOG : string = 'dialog';
	public static readonly ANONYMOUS : string = 'anonymous';

	constructor(name : string, parentContext : any) {
		this._name = name;
		this._context = vm.createContext({});
		this._context.__proto__ = parentContext;
		// Object.defineProperty(this._context, name, {
		// 	enumerable: true,
		// 	get: function () { return this._context }
		// })


		// Object.defineProperty(context, previousScope, {
		// 	get: function () { return previousContext; }
		// });
	}

	get name() {
		return this._name;
	}

	get context() {
		return this._context;
	}
};

export default Scope;