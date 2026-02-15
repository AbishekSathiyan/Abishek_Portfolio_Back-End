const express = require("express");
const { body, validationResult } = require("express-validator");
const contactController = require("../controllers/contactController");

const router = express.Router();

// Validation middleware
const validateContact = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("contact")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[0-9]{10}$/)
    .withMessage("Invalid 10-digit phone number"),
  body("subject").trim().notEmpty().withMessage("Subject is required"),
  body("message").trim().notEmpty().withMessage("Message is required"),
];

// POST /api/contact/submit
router.post(
  "/submit",
  validateContact,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  contactController.submitContact,
);

// GET /api/contact/all
router.get("/all", contactController.getContacts);
// PATCH /api/contact/:id
router.patch("/:id", contactController.updateContact);
// DELETE /api/contact/:id
router.delete("/:id", contactController.deleteContact);
module.exports = router;
