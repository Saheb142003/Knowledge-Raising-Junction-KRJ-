import mongoose from "mongoose";

const payrollRunSchema = new mongoose.Schema(
  {
    month: {
      type: String,            // Format: "2026-01"
      required: true,
      index: true,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    status: {
      type: String,
      enum: ["DRAFT", "APPROVED", "PAID"],
      default: "DRAFT",
      index: true,
    },

    // 💰 Final totals for the entire branch payroll
    totalEmployees: Number,
    totalTeachers: Number,
    totalPayout: Number, // total money payout for the month

    // 🧾 Salary Details for Each Person
    salaryRecords: [
      {
        employeeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
        },

        teacherId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
        },

        payableDays: Number,
        totalEarnings: Number,
        totalDeductions: Number,
        netPay: Number,

        components: [
          {
            componentId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "SalaryComponent",
            },
            name: String,
            type: String, // EARNING | DEDUCTION
            amount: Number,
          },
        ],
      },
    ],

    remarks: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Indexes
payrollRunSchema.index({ month: 1, branch: 1 }, { unique: true });
payrollRunSchema.index({ status: 1 });

export const PayrollRun = mongoose.model("PayrollRun", payrollRunSchema);




// Ye schema poora monthly salary process ko handle karega:

// Kis month ka payroll run hua

// Kin employees/teachers ka salary calculate hua

// Auto PF/ESI/TDS calculation

// Salary breakdown store

// Status: DRAFT / APPROVED / PAID


// 🔥 What This Schema Solves?

// ✔ Branch wise monthly payroll
// ✔ Teacher + Employee salary combined
// ✔ Salary components auto-apply hote
// ✔ Reports (PF, ESI, TDS) generate easily
// ✔ Status management for salary processing