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
employee_index
employee_payments
↓
Merge employee_enrichment
↓
Employee View
↓
UI / Reports

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

employeeId = nip
employee snapshot
payment components
net income

Transactions are immutable.

Transactions cannot be edited.

Corrections require batch deletion and reimport.

Employee identifiers in transaction stores may differ
between modules (e.g. NIP, NRP).

The consolidation layer normalizes identifiers into:

employeeId

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

# EMPLOYEE ENRICHMENT

Some employee attributes are not available
in payment transaction data.

Examples:

NIK
NPWP correction
Position
Unit
Address
Notes

These attributes are stored in a separate dataset:

employee_enrichment

The enrichment dataset is maintained by operators
and may be updated manually or via Excel batch import.

The consolidation engine does not read or modify
this dataset.

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

# EMPLOYEE VIEW MODEL

Employee data displayed in the application
is produced by merging:

employee_index
employee_enrichment

Merge rules:

npwp_final = npwpOverride ?? npwp_from_index
unit_final = unit
position_final = position

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

The import service triggers the consolidation engine
after transactions are stored.

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

---

# CONSOLIDATION STRATEGY

The consolidation engine uses a full rebuild strategy.

When consolidation runs, the engine reads all payment
transactions and rebuilds the following datasets:

employee_index
employee_payments

This ensures the aggregated data is always consistent
with the underlying transaction stores.

---

# PERIOD SCOPED REBUILD

In practice consolidation may be executed per year.

Example:

Rebuild 2025 data
Rebuild 2026 data

This approach is aligned with financial and tax
reporting cycles where each year is processed
independently.

The rebuild process only reads transactions
belonging to the selected year.

---

# EMPLOYEE ENRICHMENT IMPORT

Employee enrichment data may be imported using Excel.

Import flow:

Download employee template
↓
User fills additional attributes
↓
Upload Excel
↓
Parse enrichment data
↓
Merge with employee_enrichment store
↓
Update records

---

# EMPLOYEE ENRICHMENT FLOW

Employee enrichment data can be managed through
Excel template export and import.

Export Template
↓
User fills enrichment fields
↓
Import Excel
↓
Merge enrichment data
↓
Update employee_enrichment store