import { IToObject } from "./interfaces";

/**
 * @template RegistryType - The type of Register to use
 */
export class DeferredRegister<RegistryType extends IToObject> {
	private _index: Record<string, object>;
	private localIndex: Record<string, object>;

	/**
	 *
	 * @param {Registry<RegistryType>} registry - Takes in a registry to register to
	 */
	constructor(registry: Registry<RegistryType>) {
		this._index = {[registry.name]: {}};
        this.localIndex = this._index;
	}

	/**
	 * @param {string} name - the name of the object to add
	 * @param {() => T} instance - the instance of object to add
	 * @returns {RegistryObject<T>} - returns the registryobject created
	 */
	public register(name: string, instance: RegistryType): RegistryObject<RegistryType> {
		const registryObj: RegistryObject<RegistryType> = new RegistryObject<RegistryType>(instance);
		this.localIndex[name] = instance;

		print(this);

		return registryObj;
	}
}

/**
 * I tried to clone down RegistryObject ( from ForgeMDK ) as best I could with this
 */
export class RegistryObject<ObjType> implements IRegistryObject<ObjType> {
	value: ObjType;

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

export interface IRegistryObject<T> {
	value?: T;
	get(): T;
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
