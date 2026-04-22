import asyncHandler from 'express-async-handler';
import Setting from '../models/Setting.js';

// @desc    Get global settings
// @route   GET /api/settings
// @access  Public
export const getSettings = asyncHandler(async (req, res) => {
  let settings = await Setting.findOne();
  
  if (!settings) {
    settings = await Setting.create({});
  }

  res.json({
    success: true,
    data: settings,
  });
});

// @desc    Update global settings
// @route   PUT /api/settings
// @access  Admin
export const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Setting.findOne();

  if (!settings) {
    settings = await Setting.create(req.body);
  } else {
    settings = await Setting.findByIdAndUpdate(
      settings._id,
      req.body,
      { new: true, runValidators: true }
    );
  }

  res.json({
    success: true,
    data: settings,
  });
});
