const Contact = require("../models/Contact");
const emailService = require("../utils/emailService");

// POST /api/contact/submit
exports.submitContact = async (req, res) => {
  try {
    const { name, email, contact, subject, message } = req.body;

    // Prevent duplicate submission
    const exists = await Contact.findOne({ email, subject, message });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "You already submitted this message.",
      });
    }

    // Save to DB
    const contactRecord = new Contact({
      name,
      email,
      contact,
      subject,
      message,
    });
    await contactRecord.save();

    // Auto-reply links
    const links = [
      {
        text: "Portfolio",
        url: "https://abishek-portfolio-front-end.vercel.app/",
      },
      { text: "GitHub", url: "https://github.com/AbishekSathiyan" },
      { text: "LinkedIn", url: "https://www.linkedin.com/in/abishek04/" },
    ];

    try {
      await emailService.sendAutoReply({
        name,
        email,
        message,
        contact,
        subject,
        links,
      });
    } catch (err) {
      console.error("Auto-reply email failed ❌", err);
    }

    res.status(201).json({
      success: true,
      message: "Message submitted! Auto-reply sent.",
      data: contactRecord,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error while submitting contact.",
    });
  }
};

// GET /api/contact/all
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find(); // ✅ corrected here
    res.json({ success: true, contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// PATCH /api/contact/:id
exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // { isRead: true, updatedAt: ... }

    const contact = await Contact.findByIdAndUpdate(id, updates, { new: true });
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    res.json({
      success: true,
      message: "Contact updated successfully",
      contact,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error while updating contact" });
  }
};

// POST /api/contact/submit
exports.submitContact = async (req, res) => {
  try {
    const { name, email, contact, subject, message } = req.body;

    // Prevent duplicate submission
    const exists = await Contact.findOne({ email, subject, message });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "You already submitted this message.",
      });
    }

    // Save to DB
    const contactRecord = new Contact({
      name,
      email,
      contact,
      subject,
      message,
    });
    await contactRecord.save();

    // Auto-reply links
    const links = [
      {
        text: "Portfolio",
        url: "https://abishek-portfolio-front-end.vercel.app/",
      },
      { text: "GitHub", url: "https://github.com/AbishekSathiyan" },
      { text: "LinkedIn", url: "https://www.linkedin.com/in/abishek04/" },
    ];

    try {
      await emailService.sendAutoReply({
        name,
        email,
        message,
        contact,
        subject,
        links,
      });
    } catch (err) {
      console.error("Auto-reply email failed ❌", err);
    }

    res.status(201).json({
      success: true,
      message: "Message submitted! Auto-reply sent.",
      data: contactRecord,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error while submitting contact.",
    });
  }
};

// GET /api/contact/all
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find(); // ✅ corrected here
    res.json({ success: true, contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// PATCH /api/contact/:id
exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // { isRead: true, updatedAt: ... }

    const contact = await Contact.findByIdAndUpdate(id, updates, { new: true });
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    res.json({
      success: true,
      message: "Contact updated successfully",
      contact,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error while updating contact" });
  }
};

// DELETE /api/contact/:id
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    // Use findByIdAndDelete to avoid remove() issues
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    res.json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error while deleting contact" });
  }
};
