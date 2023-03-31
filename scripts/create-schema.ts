require("dotenv-flow").config();

import { deviceStore, gatewayStore } from "../src/stores";
import { client } from "../lib/mongodb";

async function run() {
    try {
        const gatewayCollection = await gatewayStore.createCollection();
        console.log(gatewayCollection);

        const deviceCollection = await deviceStore.createCollection();
        console.log(deviceCollection);

        const index = await gatewayCollection.createIndex({ serial_number: 1 }, { unique: true });
        console.log(index);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.log);
