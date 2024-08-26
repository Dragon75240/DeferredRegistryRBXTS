/**
 * uhhh this interface has a function i guess
 */
export interface IToObject {
	/**
	 * this function returns the object version of the type implementing
	 */
	toObject(): object;
}

/**
 * Interface for matching class -- used outside instead of the class
 */
export interface IRegistryObject<T> {
	/**
	 * Value of registry object
	 */
	value: T;
	/**
	 * @returns {T} - Returns a RegistryObjects type **VALUE**
	 */
	get(): T;
}
