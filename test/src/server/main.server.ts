import { DeferredRegister, Registry } from "shared/index";
import { Item } from "shared/item";

let REGISTRIES: Record<string, Registry<any>> = {
    ITEM_REGISTRY: new Registry<Item>("item_registry"),
} as Record<string, Registry<any>>;

let DefferedItemRegistry = new DeferredRegister<Item>(REGISTRIES.ITEM_REGISTRY);

let NewItem = DefferedItemRegistry.register("new_item", () => new Item("new_item", {} as Record<string, object>));

print(NewItem.get())