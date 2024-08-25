interface IItem {
	name: string;
	metadata: Record<string, object>;
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
}
