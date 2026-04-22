import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'LUXE Storefront',
  },
  siteEmail: {
    type: String,
    default: 'concierge@luxe.com',
  },
  sitePhone: {
    type: String,
    default: '+1 (800) 555-LUXE',
  },
  currency: {
    type: String,
    default: 'USD',
  },
  maintenanceMode: {
    type: Boolean,
    default: false,
  },
  socialLinks: {
    facebook: { type: String, default: '#' },
    instagram: { type: String, default: '#' },
    twitter: { type: String, default: '#' },
  }
}, { timestamps: true });

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;
