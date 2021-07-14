const dotenv = require("dotenv");

const result =
  process.env.NODE_ENV !== "production" ? dotenv.config() : undefined;

if (result.error) {
  console.log("error from dotenv", result.error);
}
module.exports = {
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  items_api_key: process.env.CLOUDINARY_ITEMS_API,
  items_api_secret: process.env.CLOUDINARY_ITEMS_API_SECRET,
  items_cloud_name: process.env.CLOUDINARY_ITEMS_CLOUD_NAME,
  stripe_key: process.env.STRIPE_SECRET_KEY,
  crypto_secret: process.env.CRYPTO_SECRET,
  firebase_admin_credentials: process.env.FIREBASE_ADMIN_CREDENTIAL,
  contactus_email: process.env.CONTACT_US_EMAIL,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_client_refres_token: process.env.GOOGLE_CLIENT_REFRESH_TOKEN,
};
