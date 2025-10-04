# Migadu API Client
This is a Javascript / TypeScript adaptation for the [Migadu API v1](https://www.migadu.com/api/). It allows you to programmatically manage your email domains, mailboxes, aliases, and more.

## Installation
You can install the package using npm:

```bash
npm install migadu-api
```

## Usage
Here is a quick example of how to get started:

```typescript
import { MigaduClient } from 'migadu-api';

// Replace with your actual email and API key from Migadu
const client = new MigaduClient('your-email@example.com', 'your-api-key-here');

async function listAllDomains() {
  try {
    const domains = await client.getDomains();
    console.log(domains);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

listAllDomains();
```

## API Endpoints
The module will eventually support all of the Migadu API endpoints, including:

- Domains: Get, create, and manage your domains.
- Mailboxes: Create, list, update, and delete mailboxes.
- Aliases: Manage email aliases.
- Forwardings: Configure email forwardings.
- Rewrites: Set up rewrite rules for incoming email.

## Contributing
Contributions are welcome! If you find a bug or have a suggestion, please open an issue on the GitHub repository.

## License
This project is licensed under the MIT License.