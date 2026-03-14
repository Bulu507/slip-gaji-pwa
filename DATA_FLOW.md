# DATA_FLOW.md

## HIGH LEVEL FLOW

External Payroll System
↓
Excel Export
↓
Import Excel
↓
Parse Data
↓
Preview
↓
Validate
↓
Create Batch
↓
Store Transactions
↓
Payment Consolidation
↓
Update Employee Index
↓
Generate Reports

---

# DATA SOURCE

Income data originates from external systems.

Examples:

Payroll
Tunkin
Uang Makan
Lembur

Each source is imported independently.

---

# IMPORT PROCESS

Import workflow:

Upload Excel
Parse Data
Preview Data
Validate Data
Confirm Import

If validation fails, import is rejected.

---

# BATCH CREATION

Each import creates a batch.

Batch contains metadata only.

Example fields:

nomorGaji
periodeBayar
tipePegawai
jumlahTransaksi
totalNetto

---

# TRANSACTION STORAGE

Each employee payment becomes a transaction.

Transactions include:

employeeId
employee snapshot
payment components
net income

Transactions are immutable.

Transactions cannot be edited.

Corrections require batch deletion and reimport.

---

# DATABASE STORES

Example stores:

payroll_batches
payroll_transactions

Future modules:

tunkin_batches
tunkin_transactions

Each module maintains its own stores.

---

# PAYMENT CONSOLIDATION

The consolidation engine reads transactions
from all financial modules.

Example sources:

payroll_transactions
tunkin_transactions
uang_makan_transactions
lembur_transactions

The engine aggregates data and produces:

employee_index
employee_payments

Consolidation does not modify original transactions.

---

# EMPLOYEE INDEX

Employee records are derived from consolidated payment data.

Employee data is not a master HR system.

Employees appear when they receive income.

Example attributes:

employeeId
name
rank
position
unit

Employee attributes may be enriched with additional fields.

---

# EMPLOYEE PAYMENTS

Employee payments aggregate income per periode.

Granularity:

employeeId + periode

Primary Key:

employeeId + "_" + periode

Fields:

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

totalIncome: 8500000

batchIds are stored to allow traceability
between consolidated data and original import batches.

---

# REPORT GENERATION

Reports must read data from:

employee_payments

Examples:

employee slip
monthly income summary
annual tax report

Reports must never read raw transactions directly.

---

# CONSOLIDATION TRIGGER

Consolidation runs when:

import batch completed

or

manual rebuild executed

---

# SYSTEM PRINCIPLES

Offline First

All data processing occurs locally.

Immutable Transactions

Transactions cannot be edited.

Append Only Imports

New data is added through new batches.

Consolidation Driven Reporting

All reporting is derived from consolidated datasets.