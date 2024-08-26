import { IObjectable } from './interfaces';

export class Item implements IObjectable {
    private name: string;
    private metadata: Record<string, object>

    constructor(name: string, metadata: Record<string, object>) {
        this.name = name;
        this.metadata = metadata;
    }

    /**
     * printMetadata
     */
    public toObject() {
        return { "name": this.name, "data": this.metadata}
    }
}