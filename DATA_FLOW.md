# DATA FLOW

## HIGH LEVEL FLOW

External System
→ Excel Export
→ Import Excel
→ Parse Data
→ Preview
→ Validate
→ Create Batch
→ Store Transactions
→ Payment Consolidation
→ Employee Index Update
→ Document Generation

---

# DATA SOURCE

Income data originates from external payroll systems.

Examples:

Payroll
Tunkin
Uang Makan
Uang Lembur

---

# IMPORT PROCESS

Import workflow:

Upload Excel
Parse Data
Preview Data
Validate Data
Confirm Import

Invalid files are rejected.

---

# BATCH CREATION

Each import generates a batch.

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

Transactions contain:

employee identity
payment components
employee snapshot

Transactions are immutable.

Transactions cannot be edited.

---

# COMPONENT EXTRACTION

Components are derived from Excel columns.

Examples:

Gapok
Tunjangan Istri
Pajak
Iuran

Component definitions are provided by component registry.

---

# DATABASE STORAGE

IndexedDB stores:

payroll_batches
payroll_transactions
employees

Period format:

YYYY-MM

Each financial module maintains its own object stores.

Example:

tunkin_batches
tunkin_transactions

---

# PAYMENT CONSOLIDATION

The consolidation engine aggregates payment transactions
from all income modules.

Sources may include:

payroll_transactions
tunkin_transactions
uang_makan_transactions
lembur_transactions

The consolidation engine produces derived datasets:

employee_payments
employees

Consolidation must never modify original transactions.

It only reads transaction data and produces aggregated outputs.

---

# EMPLOYEE INDEX UPDATE

Employee records are derived from consolidated payment data.

Employee data is not a master HR database.

Employees appear when they receive income in any module.

Employee records may contain:

employeeId
name
rank
position
unit

Employee attributes may be enriched without modifying
the original transaction records.

---

# DOCUMENT GENERATION

Documents are generated from consolidated payment data.

Examples:

Employee Slip
Monthly BPMP
Yearly BPA1 / A2

Documents must never read raw transactions directly.

All document generators must consume consolidated data.

---

# SYNCHRONIZATION FLOW

Operator A

Import Excel
Export Batch JSON

Shared Storage

Batch files stored

Operator B

Download Batch JSON
Import Batch

Synchronization is append-only.

Existing batches must never be modified.

---

# DESIGN PRINCIPLES

Offline First

All processing occurs locally.

Immutable Records

Transactions cannot be edited.

Append-Only Synchronization

Synchronization adds new batches only.

Feature Modular Design

Each income source is implemented as an isolated module.

Consolidation Driven Reporting

All reports and employee data must be derived from
consolidated payment data.
