import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    /* =========================
       ORDER IDENTITY
    ========================== */
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    /* =========================
       BUYER INFORMATION
    ========================== */
    buyer: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EComUser", // or Student if you separate models
        required: true
      },
      
      email: String,
      phone: String
    },

    /* =========================
       ORDER ITEMS
    ========================== */
    items: [
      {
        itemType: {
          type: String,
          enum: ["COURSE", "PRODUCT", "SUBSCRIPTION"],
          required: true
        },

        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "items.itemType"
        },

        titleSnapshot: {
          type: String,
          required: true
        },

        priceSnapshot: {
          type: Number,
          required: true
        },

        quantity: {
          type: Number,
          default: 1
        },

        fulfilled: {
          type: Boolean,
          default: false
        }
      }
    ],

    /* =========================
       PRICING BREAKDOWN
    ========================== */
    pricing: {
      subtotal: {
        type: Number,
        required: true
      },
      discount: {
        type: Number,
        default: 0
      },
      tax: {
        type: Number,
        default: 0
      },
      totalAmount: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        default: "INR"
      }
    },

    /* =========================
       PAYMENT INFORMATION
    ========================== */
    payment: {
      method: {
        type: String,
        enum: ["CARD", "UPI", "NETBANKING", "WALLET", "COD"],
        required: true
      },
      gateway: {
        type: String, // Razorpay / Stripe / Cashfree
      },
      transactionId: String,
      status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED", "PARTIALLY_REFUNDED"],
        default: "PENDING"
      },
      paidAt: Date
    },

    /* =========================
       ORDER STATUS
    ========================== */
    orderStatus: {
      type: String,
      enum: [
        "CREATED",
        "PAYMENT_PENDING",
        "PAID",
        "PROCESSING",
        "COMPLETED",
        "CANCELLED",
        "REFUNDED"
      ],
      default: "CREATED",
      index: true
    },

    /* =========================
       ADDRESS (OPTIONAL)
    ========================== */
    shippingAddress: {
      name: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      postalCode: String,
      country: {
        type: String,
        default: "India"
      }
    },

    /* =========================
       META & AUDIT
    ========================== */
    notes: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    cancelledAt: Date,
    cancelledReason: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Order", OrderSchema);
