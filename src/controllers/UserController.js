const XLSX = require("xlsx");
const { writeFileSync, existsSync, mkdirSync } = require("fs");
const path = require("path");
const { sendEmail } = require("../utils/sendEmail");

exports.MembershipController = async (req, res, next) => {
  const {
    fullName,
    dateOfBirth,
    postcode,
    email,
    mobileNumber,
    address,
    emergencyContactName,
    emergencyPhone,
    relationship,
    alternativePhone,
    membershipType,
    medicalInfo,
  } = req.body;

  // Check for required fields
  if (
    !fullName ||
    !dateOfBirth ||
    !postcode ||
    !email ||
    !mobileNumber ||
    !address ||
    !emergencyContactName ||
    !emergencyPhone ||
    !relationship ||
    !membershipType
  ) {
    throw new Error("Please fill all the required fields.");
  }

  const data = [
    { Field: "Full Name", Value: fullName },
    { Field: "Date of Birth", Value: dateOfBirth },
    { Field: "Post Code", Value: postcode },
    { Field: "Email", Value: email },
    { Field: "Mobile Number", Value: mobileNumber },
    { Field: "Address", Value: address },
    { Field: "Emergency Contact Name", Value: emergencyContactName },
    { Field: "Emergency Contact Phone", Value: emergencyPhone },
    { Field: "Relationship", Value: relationship },
    { Field: "Alternative Contact Phone", Value: alternativePhone || "N/A" },
    { Field: "Membership Type", Value: membershipType },
    { Field: "Medical Information", Value: medicalInfo || "None" },
  ];

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Membership Data");

  const uploadsDir = path.join(__dirname, "..", "uploads");
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir);
  }
  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    "membership_data.xlsx"
  );
  writeFileSync(
    filePath,
    XLSX.write(workbook, { bookType: "xlsx", type: "buffer" })
  );

  const emailOptions = {
    email: "admin@chelsfieldcc.co.uk",
    subject: `New Membership`,
    message: `New membership registration data attached.`,
    attachments: [
      {
        filename: "membership_data.xlsx",
        path: filePath,
      },
    ],
  };

  const emailOptions2 = {
    email,
    subject: `New Membership`,
    message: `New membership registration data attached.`,
    attachments: [
      {
        filename: "membership_data.xlsx",
        path: filePath,
      },
    ],
  };

  try {
    await sendEmail(emailOptions);
    await sendEmail(emailOptions2);
    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
};
