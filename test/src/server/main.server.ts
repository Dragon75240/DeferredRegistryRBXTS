import { DeferredRegister, Registry } from "shared/DeferredRegister";
import { Item } from "shared/Types";

let StockRegistries = {
    defaultItem: new Registry("default")
};

let NewRegistry = new DeferredRegister<Item>(StockRegistries.defaultItem);
let NewRegistryObject = NewRegistry.register("new_item", new Item("Item", {}));