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
