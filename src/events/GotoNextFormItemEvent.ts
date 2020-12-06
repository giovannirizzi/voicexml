import { FormItem } from "../elements";

class GotoNextFormItemEvent {

	private readonly _itemName : string;

	constructor(itemName : string) {
		this._itemName = itemName;
	}

	get itemName() : string{
		return this.itemName;
	}
}

export { GotoNextFormItemEvent };