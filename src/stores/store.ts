import { Collection, CreateCollectionOptions, Document } from "mongodb";
import { databasePromise } from "../../lib/mongodb";

export abstract class Store<T extends Document> {
    abstract get schema(): CreateCollectionOptions;
    abstract get collectionName(): string;

    public get collection(): Promise<Collection<T>> {
        return databasePromise.then((database) => database.collection(this.collectionName));
    }

    public async createCollection(): Promise<Collection<T>> {
        const database = await databasePromise;
        return await database.createCollection(this.collectionName, this.schema);
    }
}
