const mongoose = require("mongoose");

const MembershipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of Birth is required"],
    },
    postCode: {
      type: String,
      required: [true, "Post Code is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    emergencyContactName: {
      type: String,
      required: [true, "Emergency Contact Name is required"],
    },
    emergencyContactNumber: {
      type: String,
      required: [true, "Emergency Contact Number is required"],
    },
    emergencyRelationship: {
      type: String,
      required: [true, "Emergency Relationship is required"],
    },
    alternativeEmergencyContact: {
      type: String,
    },
    juniorMembership: {
      type: Boolean,
      default: false,
    },
    studentMembership: {
      type: Boolean,
      default: false,
    },
    regularMembership: {
      type: Boolean,
      default: false,
    },
    socialMembership: {
      type: Boolean,
      default: false,
    },
    medicalInformation: {
      type: String,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Member = mongoose.model("Member", MembershipSchema);

module.exports = { Member };
