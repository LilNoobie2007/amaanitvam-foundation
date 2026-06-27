import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    departmentHead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["member", "intern", "lead"],
          default: "member",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    totalMembers: {
      type: Number,
      default: 0,
    },

    performance: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Department =
  mongoose.models.department ||
  mongoose.model("department", departmentSchema);

export default Department;