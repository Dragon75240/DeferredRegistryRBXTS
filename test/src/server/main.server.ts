import { DeferredRegister, Registry } from "shared/index";
import { Item } from "shared/item";

let REGISTRIES: Record<string, Registry<any>> = {
    ITEM_REGISTRY: new Registry<Item>("item_registry", {} as Record<string, object>),
} as Record<string, Registry<any>>;

let DeferredItemRegistry = new DeferredRegister<Item>(REGISTRIES.ITEM_REGISTRY);

let NewItem = DeferredItemRegistry.register("new_item", () => new Item("new_item", {} as Record<string, object>));
let OtherNewItem = DeferredItemRegistry.register("other_new_item", () => new Item("other_new_item", {} as Record<string, object>));

print(REGISTRIES)