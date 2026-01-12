import Joi from "joi";
import mongoose from "mongoose";

import { asyncHandler } from "../../../Utility/Response/AsyncHandler.Utility.js";
import ApiError from "../../../Utility/Response/ErrorResponse.Utility.js";
import successResponse from "../../../Utility/Response/SuccessResponse.Utility.js";

import { Fee } from "../../../Schema/Management/Fee/Fee.Schema.js";
import { Student } from "../../../Schema/Management/Student/Student.Schema.js";

/* ======================================================
   VALIDATION
====================================================== */

// Create Invoice
const feeCreateSchema = Joi.object({
  studentId: Joi.string().length(24).required(),
  title: Joi.string().min(2).required(),

  amount: Joi.number().min(1).required(),
  dueDate: Joi.date().required(),

  remarks: Joi.string().allow("").optional(),
});

// Payment Record
const feePaymentSchema = Joi.object({
  amountPaid: Joi.number().min(1).required(),
  paymentDate: Joi.date().default(() => new Date()),
  method: Joi.string().valid("CASH", "ONLINE", "BANK").required(),
  referenceId: Joi.string().allow("").optional(),
});

// Update Invoice
const feeUpdateSchema = Joi.object({
  title: Joi.string().min(2).optional(),
  amount: Joi.number().min(1).optional(),
  dueDate: Joi.date().optional(),
  remarks: Joi.string().allow("").optional(),
});

// Query
const feeQuerySchema = Joi.object({
  studentId: Joi.string().length(24).optional(),
  status: Joi.string().valid("PENDING", "PARTIAL", "PAID").optional(),
});

/* ======================================================
   CREATE FEE INVOICE
====================================================== */

export const createFeeInvoice = asyncHandler(async (req, res) => {
  const { error, value } = feeCreateSchema.validate(req.body);

  if (error)
    throw new ApiError(400, error.details[0].message);

  const { studentId, title, amount, dueDate, remarks } = value;

  // Check student
  const student = await Student.findById(studentId);
  if (!student) throw new ApiError(404, "Student not found");

  const invoice = await Fee.create({
    studentId,
    title,
    amount,
    dueDate,
    paid: 0,
    status: "PENDING",
    remarks: remarks || "",
  });

  // Add to student fee reference
  await Student.findByIdAndUpdate(studentId, {
    $addToSet: { feeAccount: invoice._id },
  });

  return successResponse(res, {
    statusCode: 201,
    message: "Fee invoice created successfully",
    data: invoice,
  });
});

/* ======================================================
   RECORD PAYMENT
====================================================== */

export const recordFeePayment = asyncHandler(async (req, res) => {
  const { invoiceId } = req.params;

  if (!invoiceId || invoiceId.length !== 24)
    throw new ApiError(400, "Invalid invoice ID");

  const { error, value } = feePaymentSchema.validate(req.body);
  if (error) throw new ApiError(400, error.details[0].message);

  const invoice = await Fee.findById(invoiceId);
  if (!invoice) throw new ApiError(404, "Invoice not found");

  invoice.paid += value.amountPaid;
  invoice.payments.push(value);

  // Change status
  if (invoice.paid === 0) invoice.status = "PENDING";
  else if (invoice.paid < invoice.amount) invoice.status = "PARTIAL";
  else invoice.status = "PAID";

  await invoice.save();

  return successResponse(res, {
    message: "Payment recorded successfully",
    data: invoice,
  });
});

/* ======================================================
   GET FEE INVOICES
====================================================== */

export const getFeeInvoices = asyncHandler(async (req, res) => {
  const { error, value } = feeQuerySchema.validate(req.query);
  if (error) throw new ApiError(400, error.details[0].message);

  const { studentId, status } = value;

  const query = {};
  if (studentId) query.studentId = studentId;
  if (status) query.status = status;

  const invoices = await Fee.find(query)
    .populate("studentId", "fullName branch")
    .sort({ dueDate: 1 })
    .lean();

  return successResponse(res, {
    message: "Fees fetched successfully",
    data: invoices,
  });
});

/* ======================================================
   UPDATE FEE INVOICE
====================================================== */

export const updateFeeInvoice = asyncHandler(async (req, res) => {
  const { invoiceId } = req.params;

  if (!invoiceId || invoiceId.length !== 24)
    throw new ApiError(400, "Invalid invoice ID");

  const { error, value } = feeUpdateSchema.validate(req.body);
  if (error) throw new ApiError(400, error.details[0].message);

  const invoice = await Fee.findByIdAndUpdate(invoiceId, value, {
    new: true,
  });

  if (!invoice) throw new ApiError(404, "Invoice not found");

  return successResponse(res, {
    message: "Invoice updated successfully",
    data: invoice,
  });
});

/* ======================================================
   DELETE FEE INVOICE
====================================================== */

export const deleteFeeInvoice = asyncHandler(async (req, res) => {
  const { invoiceId } = req.params;

  if (!invoiceId || invoiceId.length !== 24)
    throw new ApiError(400, "Invalid invoice ID");

  const invoice = await Fee.findByIdAndDelete(invoiceId);
  if (!invoice) throw new ApiError(404, "Invoice not found");

  return successResponse(res, {
    message: "Invoice deleted successfully",
    invoiceId,
  });
});

/* ======================================================
   STUDENT FEE SUMMARY
====================================================== */

export const getFeeSummary = asyncHandler(async (req, res) => {
  const { studentId } = req.query;

  if (!studentId || studentId.length !== 24)
    throw new ApiError(400, "Invalid student ID");

  const fees = await Fee.find({ studentId });

  let total = 0,
    paid = 0;

  fees.forEach((f) => {
    total += f.amount;
    paid += f.paid;
  });

  const summary = {
    totalFees: total,
    totalPaid: paid,
    due: total - paid,
  };

  return successResponse(res, {
    message: "Fee summary fetched",
    data: summary,
  });
});
