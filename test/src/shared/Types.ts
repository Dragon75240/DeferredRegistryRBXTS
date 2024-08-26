interface IItem extends IToObject {
	name: string;
	metadata: Record<string, object>;
	toObject(): object;
}

export class Item implements IItem {
	name: string;
	metadata: Record<string, object>;

	/**
	 *
	 * @param name Name of Item
	 * @param metadata Table of data inside of item
	 */
	constructor(name: string, metadata: Record<string, object>) {
		this.name = name;
		this.metadata = metadata;
	}

	toObject(): object {
		return {[this.name]: this.metadata};
	}
}

export interface IToObject {
    toObject(): object;
}