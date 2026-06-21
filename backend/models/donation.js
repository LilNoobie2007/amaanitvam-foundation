import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 120
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 180
        },
        phone: {
            type: String,
            trim: true,
            maxlength: 20
        },
        amount: {
            type: Number,
            required: true,
            min: 10
        },
        currency: {
            type: String,
            default: "INR",
            trim: true
        },
        razorpayOrderId: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        razorpayPaymentId: {
            type: String,
            trim: true,
            sparse: true
        },
        razorpaySignature: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            enum: ["created", "paid", "failed"],
            default: "created",
            index: true
        },
        submissionTimestamp: {
            type: Date,
            default: Date.now,
            index: true
        }
    },
    {
        timestamps: true
    }
);

donationSchema.index({ submissionTimestamp: -1 });

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
