# FEATURE MODULE TEMPLATE

This document defines the standard structure for implementing new financial modules.

Examples:

payroll
tunkin
uang-makan
lembur

---

# MODULE STRUCTURE

features/module-name/

application
domain
data
presentation

Example:

features/tunkin/

application
domain
data
presentation

---

# DOMAIN LAYER

The domain layer defines the core business models.

Example structure:

domain/models/

Batch
Transaction
Component

Example:

TunkinBatch
TunkinTransaction
TunkinComponent

The domain layer should contain:

entity models
component definitions
domain types

Domain layer must not depend on infrastructure.

---

# APPLICATION LAYER

Application layer contains business workflows.

Examples:

Import service
Query services
Delete batch service

Example files:

tunkin-import.service.ts
get-tunkin-batches.service.ts
delete-tunkin-batch.service.ts

Application layer coordinates:

repositories
parsers
domain models

---

# DATA LAYER

The data layer handles persistence and infrastructure.

Includes:

database access
repositories
database schema

Example structure:

data/db
data/repositories

Example files:

tunkin-db.ts
tunkin-batch.repository.ts
tunkin-transaction.repository.ts

Repositories are responsible for:

saving data
querying data
deleting data

---

# PRESENTATION LAYER

Presentation layer handles UI.

Includes:

pages
components
hooks

Example:

presentation/pages

TunkinBatchListPage
TunkinImportPage
TunkinBatchDetailPage

---

# IMPORT PATTERN

Each module implements its own import workflow.

Import flow:

Upload file
Parse Excel
Preview data
Validate data
Commit import

Import services should exist in:

application/import/

Example:

tunkin-import.service.ts

---

# DATABASE PATTERN

Each module uses its own IndexedDB stores.

Example:

tunkin_batches
tunkin_transactions

This keeps domains isolated.

---

# TRANSACTION MODEL

All payment modules use the same structure.

Batch
Transaction
Components

Example:

TunkinBatch
→ TunkinTransaction
→ TunkinComponent[]

---

# COMPONENT REGISTRY

Each module defines its own component registry.

Example:

TUNKIN_COMPONENT_REGISTRY

Registry defines:

component code
component name
component type
display order

---

# CONSOLIDATION INTEGRATION

Each module must expose transaction data so it can be consumed by the Payment Consolidation layer.

Example output:

EmployeePaymentSource

Fields:

employeeId
periode
components
sourceType

---

# MODULE ROUTING

Each module defines its own routes.

Example:

/tunkin
/tunkin/import
/tunkin/batch/:batchId

---

# DEVELOPMENT CHECKLIST

Before completing a module ensure:

domain models implemented
repositories implemented
import service implemented
pages implemented
routes registered
consolidation integration ready

---

# DESIGN PRINCIPLES

Domain Isolation

Each module must remain independent.

Immutable Financial Data

Transactions cannot be edited.

Corrections require batch reimport.

Consistent Import Pattern

All modules must follow the same import workflow.

Scalable Architecture

New payment modules must be addable without modifying existing modules.

# CONSOLIDATION SOURCE FORMAT

Every payment module must expose transactions
in a format readable by the Payment Consolidation Engine.

Example structure:

PaymentSourceTransaction

employeeId
periode
source
batchId
total
snapshot

---
