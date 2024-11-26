// const ErrorHandler = require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail");
const XLSX = require('xlsx');
const { writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');


exports.HireHallController = async (
    req,
    res,
    next
) => {
      const { name, email, phone, bookingType, message } = req.body;
        if (!name || !email || !phone || !bookingType || !message) {
            throw new Error("Please fill all the fields");
        }

        const data = [
            {
                'Field': 'Full Name',
                'Value': name,
            },
            {
                'Field': 'Email',
                'Value': email,
            },
            {
                'Field': 'Phone Number',
                'Value': phone,
            },
            {
                'Field': 'Facility',
                'Value': bookingType,
            },
            {
                'Field': 'Message',
                'Value': message,
            },
          
        ];
    
        // Convert data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Membership Data');
    
        // Create a file path
        const uploadsDir = path.join(__dirname, '..', 'uploads');
        
        // Check if the uploads directory exists, if not create it
        if (!existsSync(uploadsDir)) {
            mkdirSync(uploadsDir);
        }
        const filePath = path.join(__dirname, '..', 'uploads', 'membership_data.xlsx');
        // Write the workbook to a file
        writeFileSync(filePath, XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }));
        const storedMessage = `
        Name: ${name}
        Email: ${email}
        Phone Number: ${phone}
        Facility Type: ${bookingType}
        Message: ${message}
        `;
        console.log(storedMessage);
        
        
        try {
            await sendEmail({
                email: "Admin@chelsfieldcc.co.uk",
                subject: `
                ${name} wants to ${bookingType} `,
                message: storedMessage,
                attachments: [
                    {
                        filename: 'facility_data.xlsx',
                        path: filePath,
                    },
                ],
            });
        } catch (error) {
            console.error("Failed to send email:", error);
            throw new Error("Failed to send email")
        }
        res.status(200).json({
            success: true,
            message: "Message Sent Successfully",
            storedMessage
        });
      
};