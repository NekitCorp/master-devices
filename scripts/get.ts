require("dotenv-flow").config();

import { gatewayStore } from "../src/stores";
import { client } from "../lib/mongodb";

async function run() {
    try {
        const gateways = await gatewayStore.getList();

        console.log(JSON.stringify(gateways, null, 2));
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.log);
