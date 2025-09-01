const inquiryModel = require("../../model/inquiry");
const nodemailer = require("nodemailer");
const adminModel = require("../../model/Admin");
// Reusable transporter (use your SMTP details)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "developerinfo1212@gmail.com",
    pass: "cocb txob mfpk zrar", // App password
  },
});

// Add Inquiry
exports.addInquiry = async (req, res) => {
  try {
    const inquiry = new inquiryModel(req.body);
    await inquiry.save();
    const adminFind = await adminModel.findOne({ role: "Admin" });
    // Admin Email
    const adminMailOptions = {
      from: `"Novells INDIA" <developerinfo1212@gmail.com>`,
      to: adminFind.email,
      subject: "📩 New Inquiry Received",
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px; border:1px solid #ddd; border-radius:8px;">
          <h2 style="color:#2c3e50;">New Inquiry Notification</h2>
          <p>A new inquiry has been submitted. Details are as follows:</p>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td><strong>Name:</strong></td><td>${inquiry.name}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${inquiry.email}</td></tr>
            <tr><td><strong>Phone:</strong></td><td>${inquiry.number}</td></tr>
            <tr><td><strong>Quantity:</strong></td><td>${inquiry.quantity}</td></tr>
            <tr><td><strong>Address:</strong></td><td>${inquiry.address}</td></tr>
            <tr><td><strong>Description:</strong></td><td>${inquiry.description}</td></tr>
            <tr><td><strong>Status:</strong></td><td>${inquiry.status}</td></tr>
          </table>
          <p style="margin-top:20px; font-size:12px; color:#7f8c8d;">This is an automated message.</p>
        </div>
      `,
    };

    // User Email
    const userMailOptions = {
      from: `"Novells INDIA" <developerinfo1212@gmail.com>`,
      to: inquiry.email,
      subject: "✅ Inquiry Submitted Successfully",
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px; border:1px solid #ddd; border-radius:8px;">
          <h2 style="color:#27ae60;">Thank you for your inquiry, ${inquiry.name}!</h2>
          <p>We have received your request and will get back to you soon.</p>
          <h3>📌 Your Inquiry Details:</h3>
          <ul>
            <li><strong>Quantity:</strong> ${inquiry.quantity}</li>
            <li><strong>Description:</strong> ${inquiry.description}</li>
            <li><strong>Address:</strong> ${inquiry.address}</li>
          </ul>
          <p style="margin-top:20px; font-size:12px; color:#7f8c8d;">Best regards,<br/>Novells INDIA</p>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res
      .status(201)
      .json({ message: "Inquiry added successfully and emails sent", inquiry });
  } catch (error) {
    console.error("Inquiry Error:", error);
    res.status(500).json({ message: "Failed to add inquiry", error });
  }
};

// Get All Inquiries with Full Product Information
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await inquiryModel
      .find()
      .populate("productId") // ✅ full product info
      .sort({ createdAt: -1 });

    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to get inquiries", error });
  }
};

// ✅ Get Inquiry by ID with Full Product Information
exports.getInquiryById = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await inquiryModel.findById(id).populate("productId"); // will populate full product details

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry fetched successfully",
      inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get inquiry",
      error: error.message,
    });
  }
};

// Update Inquiry
exports.updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await inquiryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Inquiry not found" });
    res.status(200).json({ message: "Inquiry updated", inquiry: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update inquiry", error });
  }
};

// Delete Inquiry
exports.deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await inquiryModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Inquiry not found" });
    res.status(200).json({ message: "Inquiry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete inquiry", error });
  }
};
