# Master devices

This sample project is managing gateways - master devices that control multiple peripheral devices.

## Requirements

### Software Requirements

-   **Programming language**: JavaScript
-   **Framework**: Node.js/JavaScript + Angular/React or other
-   **Database**: MongoDB or in-memory
-   **Automated build**: Solution of choice

### Description

This sample project is managing gateways - master devices that control multiple peripheral
devices.

Your task is to **create a REST service** (JSON/HTTP) for storing information about these gateways and their associated devices. This information must be stored in the database. When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway. The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it must be possible to add and remove a device from a gateway.

Each gateway has:

-   a unique serial number (string),
-   human-readable name (string),
-   IPv4 address (to be validated),
-   multiple associated peripheral devices.

Each peripheral device has:

-   a UID (number),
-   vendor (string),
-   date created,
-   status - online/offline.

### Other considerations

-   Provide an automated build.
-   Provide basic unit tests.

## Development

Necessary tools:

-   [git](https://git-scm.com/)
-   [Node.js](https://nodejs.org/en)
-   [yarn](https://yarnpkg.com/)
-   [Docker](https://www.docker.com/)

```sh
# Clone repository
git clone git@github.com:NekitCorp/master-devices.git

# Install packages
yarn

# Start local MongoDB
docker run -d -p 27017:27017 --name md-mongo mongo:5.0.15

# Copy and fill environment variables
cp .env.local.example .env.local

# Create MongoDB schema
yarn ts-node scripts/create-schema.ts

# [optional] Seed MongoDB collections
yarn ts-node scripts/seed.ts

# Start dev server on http://localhost:3000/
yarn dev
```
