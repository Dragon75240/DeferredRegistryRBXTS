export class DeferredRegister<RegistryType> {
	private _index: Record<string, object>;
	private localRegistrar: { [key: string]: Callback } = {};

	/**
	 * 
	 * @param registry Takes in a
	 */
	constructor(registry: Registry) {
		this._index = {};

		if (!this._index[registry.name]) {
			this._index[registry.name] = this.localRegistrar;
		}
	}

	/**
	 * @param {string name - the name of the object to add
	 * @param {() => T} instance - the instance of object to add
	 * @returns {RegistryObject<T>} returns the registryobject created
	 */
	public register<T>(name: string, instance: () => T): RegistryObject<T> {
		const registryObj: RegistryObject<T> = new RegistryObject(instance());
		this.localRegistrar[name] = instance;

		return registryObj;
	}
}

/**
 * I tried to clone down RegistryObject ( from ForgeMDK ) as best I could with this
 */
class RegistryObject<ObjType> implements IRegistryObject<ObjType>{
	value: ObjType;

	constructor(value: ObjType) {
		this.value = value;
	}

	public get(): ObjType {
		return this.value;
	}
}

export interface IRegistryObject<T> {
	value?: T;
	get(): T;
}

export class Registry {
	public name: string;

	// TODO : Add more shit

	constructor(name: string) {
		this.name = name
	}
}
