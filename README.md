# Event Logging System

## Overview

This Event Logging System is a scalable and tamper-proof backend platform designed to store and manage event logs for distributed applications. The system provides a decentralized logging mechanism where each event is cryptographically linked (similar to a blockchain) and ensures data integrity.

The project includes:
- **Tamper-proof event logging** with cryptographic hashing.
- **Scalable API** to handle event logs.
- **Real-time querying** for event logs with filters and pagination.
- **Decentralization simulation** for consistency across multiple backend servers.
- **Lightweight dashboard** to visualize event logs and check for inconsistencies.

## Features

1. **Event Logging API**:
   - Allows clients to send event logs, including metadata like event type, timestamp, source application ID, and data payload.
   - Each event log is cryptographically hashed, referencing the previous log's hash for tamper-proof storage.

2. **Tamper-Proof Design**:
   - Event logs are stored in a way that ensures they cannot be modified, using cryptographic hashes.
   - Each log includes the hash of the previous log to ensure integrity.

3. **Scalable API**:
   - Utilizes MongoDB for data storage and supports pagination to handle large datasets.

4. **Decentralization Simulation**:
   - Multiple backend servers operate in a semi-decentralized mode, ensuring consistency across servers using a simple consensus mechanism (hash verification).

5. **Lightweight Dashboard**:
   - A simple frontend dashboard to visualize event logs and verify their consistency.


## Getting Started

### Prerequisites

- **Node.js** (LTS version recommended)
- **MongoDB** (local or cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/event-logging-system.git
   cd event-logging-system
   npm install
   npm start



