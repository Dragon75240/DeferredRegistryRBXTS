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
