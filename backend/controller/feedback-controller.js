// controller/feedback-controller.js

const { body, validationResult } = require('express-validator');
const Feedback = require('../models/Feedback.js');

const submitFeedback = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.param,
          message: err.msg
        }))
      });
    }

    const { email, feedback } = req.body;
    const newFeedback = await Feedback.create({ email: email || undefined, feedback });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: { id: newFeedback._id, createdAt: newFeedback.createdAt }
    });

  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ success: false, error: 'Failed to submit feedback' });
  }
};

const validateFeedback = [
  body('email').optional().isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('feedback').trim().notEmpty().withMessage('Feedback is required')
    .isLength({ min: 10 }).withMessage('Feedback must be at least 10 characters long')
];

module.exports = { submitFeedback, validateFeedback };