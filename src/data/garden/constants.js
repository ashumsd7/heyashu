/**
 * Digital Garden — shared links & marketing constants.
 * Keep page JSX free of magic URLs.
 */
export const GARDEN_ADMIN_URL = "https://heyashu.in/admin/#/";
export const GARDEN_SUPPORT_URL = "https://topmate.io/aat/1148709/pay";
export const GARDEN_HELP_CHAI_URL = "https://help-chai.netlify.app/";
export const GARDEN_HELP_CHAI_IMG = "https://help-chai.netlify.app/chai_hero.png";
export const GARDEN_SUPPORT_QR = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
  GARDEN_SUPPORT_URL
)}`;
