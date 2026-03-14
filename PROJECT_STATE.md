# PROJECT_STATE.md

## PROJECT

Payroll Processing Application  
Offline-first payroll data processing system.

Purpose:

Process payroll Excel exports and produce structured
datasets for employee income reporting.

The system aggregates multiple payment sources into a
single employee payment dataset.

sources

Map of payment source → total income.

Example:

sources:
  payroll: 8500000
  tunkin: 5000000

---

# VERSION

v0.2 – Consolidation Architecture

Major change:

Introduction of Payment Consolidation Engine.

---

# TECH STACK

Frontend

React  
TypeScript  
Vite

Storage

IndexedDB

Architecture

Feature Modular Architecture  
Domain Driven Design inspired structure

---

# PROJECT STRUCTURE

src/

features/
core/
components/
layouts/
lib/
styles/

---

# FEATURE MODULES

Each financial domain is implemented as an isolated feature module.

Example modules:

payroll
tunkin
uang_makan (planned)
lembur (planned)

Structure:

features/module-name/

application
domain
data
presentation

---

# CURRENT IMPLEMENTED MODULES

## Payroll Module

features/payroll/

Handles:

import payroll Excel
store payroll batches
store payroll transactions
display payroll transactions
generate payroll slip

Database stores:

payroll_batches
payroll_transactions

---

# CORE ENGINE

## Payment Consolidation Engine

Location:

src/core/payment-consolidation/

Purpose:

Aggregate payment transactions from all financial modules.

Produces derived datasets used by the application.

Output datasets:

employee_index
employee_payments

---

### Consolidation Engine Structure

src/core/payment-consolidation/

models/
  payment-source-transaction.model.ts
  employee-index.model.ts
  employee-payment.model.ts

services/
  read-payroll-transactions.service.ts
  build-employee-index.service.ts
  build-employee-payments.service.ts

repositories/
  employee-index.repository.ts
  employee-payment.repository.ts

engine/
  rebuild-consolidation.engine.ts

query/
  get-employees.service.ts
  get-employee-payments.service.ts
  get-employee-payment-by-periode.service.ts
  get-payments-by-periode.service.ts

---

# CONSOLIDATION DATASETS

## employee_index

Employee lookup dataset.

Fields:

employeeId
employeeType
name
rank
position
unit
sources
lastUpdated

Employee records are derived from payment transactions.

sources contains all payment sources where the employee
has received income (e.g. payroll, tunkin).

---

## employee_payments

Aggregated employee income per periode.

Primary Key:

employeeId + "_" + periode

Fields:

id
employeeId
periode
batchIds
sources
totalIncome

Example:

employeeId: 198701012010121001
periode: 2025-01

batchIds:
  payroll_batch_2025_01

sources:
  payroll: 8500000
  tunkin: 5000000

totalIncome: 13500000

Indexes:

employeeId
periode
---

# EMPLOYEE IDENTITY

Employee identity is unified.

employeeId = NIP || NRP

This allows different employee types
to share a common identifier.

---

# DATA PRINCIPLES

Immutable Transactions

Transactions cannot be edited.

Corrections must use:

delete batch
reimport batch

---

Append Only Synchronization

New data is appended through new batches.

Existing transactions must never be modified.

---

# CONSOLIDATION ENGINE

Type:

Materialized Aggregation Engine

Pipeline:

transactions
↓
payment consolidation
↓
employee_index
employee_payments

Consolidation runs:

after import batch
or manual rebuild

---

# REPORT DATA SOURCE

All reports must read data from:

employee_payments

Reports must never read raw transactions directly.

Examples:

employee slip
monthly report
annual report

---

# FUTURE MODULES

Planned payment sources:

tunkin
uang_makan
lembur

The consolidation engine must support
multiple payment sources without modification
to existing modules.

---

# DEPRECATED CODE

Folder:

backup/

Contains legacy code before architecture refactor.

Not part of the current system.

---

# CONSOLIDATION STRATEGY

The consolidation engine rebuilds derived datasets
from payment transactions.

Strategy:

Full Rebuild Aggregation

When executed, the engine reads transaction stores
and regenerates:

employee_index
employee_payments

This avoids incremental synchronization complexity
and ensures deterministic results.

---

# YEAR BASED PROCESSING

Financial data is primarily processed per year.

Consolidation may be executed for a specific year
to rebuild only the relevant payment data.

Example:

Rebuild 2025 payroll data.