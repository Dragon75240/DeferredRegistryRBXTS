/**
 * Interface for matching class -- used outside instead of the class
 * @template {T} - Type of RegistryObject to create ( matches DeferredRegistry type)
 */
export interface IRegistryObject<T> {
	/**
	 * Value of registry object
	 * @returns {T} - Stores the value of the RegistryObject
	 */
	value: T;
	/**
	 * @returns {T} - Returns a RegistryObject's type **VALUE**
	 */
	get(): T;
}

export interface IObjectable {
	toObject(): object;
}


let Registries: Record<string, object> = {};

/**
 * @template RegistryType - The type of Register to use
 */
export class DeferredRegister<RegistryType extends IObjectable> {
	private _index: Record<string, Record<string, RegistryType>>;
	private localRegistry: Registry<RegistryType>;

	/**
	 * Makes a new DeferredRegistery inside of the _index
	 * @param {Registry<RegistryType>} registry - Takes in a registry to register to
	 */
	constructor(registry: Registry<RegistryType>) {
		if (Registries[registry.name] === undefined) {
			Registries[registry.name] = {} as Record<string, Record<string, RegistryObject<RegistryType>>>;
		}

		this._index = {
			[registry.name]: {},
		};

		this.localRegistry = registry;
	}

	/**
	 * @param {string} name - the name of the object to add
	 * @param {() => T} instance - the instance of object to add
	 * @returns {RegistryObject<T>} - returns the registryobject created
	 */
	public register(name: string, instance: () => RegistryType): RegistryObject<RegistryType> {
		const registryObj: RegistryObject<RegistryType> = new RegistryObject<RegistryType>(instance());
		this._index[this.localRegistry.name][name] = instance();
		this.localRegistry.registryEvent.Fire(name, instance);
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

export class Registry<T>  {
	public name: string;
	public registryEvent: BindableEvent;

	private registeredItems: Record<string, object>;

	constructor(name: string) {
		this.name = name;
		this.registryEvent = new Instance("BindableEvent");

		this.registeredItems = {};

		this.registryEvent.Event.Connect((name: string, registeringItem: () => Record<string, object>) => {			
			if (!typeIs(registeringItem().toObject, "function")){
				error("this error happened on: " + name + " Record :" + registeringItem())
			}
			this.Register(name, registeringItem());
		});
	}

	private Register(name: string, data: object) {
		this.registeredItems[name] = data;
	}
}
