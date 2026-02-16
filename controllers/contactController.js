const Contact = require("../models/Contact");
const emailService = require("../utils/emailService");

/*
|--------------------------------------------------------------------------
| POST /api/contact/submit
| Only one email allowed in database
|--------------------------------------------------------------------------
*/
exports.submitContact = async (req, res) => {
  try {
    const { name, email, contact, subject, message } = req.body;

    if (!name || !email || !contact || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Create record (email must be unique in schema)
    const contactRecord = await Contact.create({
      name,
      email,
      contact,
      subject,
      message,
    });

    // Auto-reply links
    const links = [
      {
        text: "Portfolio",
        url: "https://abishek-portfolio-front-end.vercel.app/",
      },
      {
        text: "GitHub",
        url: "https://github.com/AbishekSathiyan",
      },
      {
        text: "LinkedIn",
        url: "https://www.linkedin.com/in/abishek04/",
      },
    ];

    // Send auto reply (non-blocking safe)
    try {
      await emailService.sendAutoReply({
        name,
        email,
        message,
        contact,
        subject,
        links,
      });
    } catch (emailError) {
      console.error("Auto-reply failed ❌", emailError);
    }

    return res.status(201).json({
      success: true,
      message: "Message submitted successfully!",
      data: contactRecord,
    });

  } catch (error) {
    console.error("Submit Contact Error:", error);

    // 🔥 Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This email has already submitted a message.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while submitting contact.",
    });
  }
};


/*
|--------------------------------------------------------------------------
| GET /api/contact/all
|--------------------------------------------------------------------------
*/
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      contacts,
    });

  } catch (error) {
    console.error("Get Contacts Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching contacts.",
    });
  }
};


/*
|--------------------------------------------------------------------------
| PATCH /api/contact/:id
|--------------------------------------------------------------------------
*/
exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact updated successfully.",
      contact: updatedContact,
    });

  } catch (error) {
    console.error("Update Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating contact.",
    });
  }
};


/*
|--------------------------------------------------------------------------
| DELETE /api/contact/:id
|--------------------------------------------------------------------------
*/
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully.",
    });

  } catch (error) {
    console.error("Delete Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting contact.",
    });
  }
};