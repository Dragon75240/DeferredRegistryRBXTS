import { IRegistryObject } from "./interfaces";

let Registries: Record<string, object> = {};

/**
 * @template RegistryType - The type of Register to use
 */
export class DeferredRegister<RegistryType> {
	private _index: Record<string, RegistryObject<RegistryType>>;

	/**
	 * Makes a new DeferredRegistery inside of the _index
	 * @param {Registry<RegistryType>} registry - Takes in a registry to register to
	 */
	constructor(registry: Registry<RegistryType>) {
		this._index = Registries[registry.name] as Record<string, RegistryObject<RegistryType>>;
	}

	/**
	 * @param {string} name - the name of the object to add
	 * @param {() => T} instance - the instance of object to add
	 * @returns {RegistryObject<T>} - returns the registryobject created
	 */
	public register(name: string, instance: RegistryType): RegistryObject<RegistryType> {
		const registryObj: RegistryObject<RegistryType> = new RegistryObject<RegistryType>(instance);
		this._index[name] = registryObj;

		print(this);

		return registryObj;
	}
}

/**
 * Represents an object registered in a registry.
 * @template ObjType - The type of the object being registered.
 */
export class RegistryObject<ObjType> implements IRegistryObject<ObjType> {
	value: ObjType;

	/**
	 * Creates a new RegistryObject.
	 * @param {ObjType} value - The value to store in this RegistryObject.
	 */
	constructor(value: ObjType) {
		this.value = value;
	}

	/**
	 *
	 * @returns Value of the RegistryObject<ObjType>
	 */
	public get(): ObjType {
		return this.value;
	}
}

export class Registry<T> {
	public name: string;
	// store T in a var so it can be used later
	private registryEvent: BindableEvent;

	// TODO : Add more shit

	constructor(name: string) {
		this.name = name;
		this.registryEvent = new Instance("BindableEvent");
	}

	public onRegistryRegister(ctx: Callback) {
		this.registryEvent.Event.Connect(ctx);
	}
}
