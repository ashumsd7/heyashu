import dayjs from "dayjs";

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

export function estimateReadingTime(paragraph, wordsPerMinute = 180) {
  if (!paragraph || paragraph.trim() === '') {
    return 0;
  }
  
  if (typeof wordsPerMinute !== 'number' || wordsPerMinute <= 0) {
    // Use default value if invalid
    wordsPerMinute = 180;
  }

  // Clean the text by removing extra whitespace and handling common punctuation
  const cleanText = paragraph
    .trim()
    .replace(/[\n\r]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[.,;:!?()[\]{}""'']/g, '');
  
  const words = cleanText
    .split(' ')
    .filter(word => word.length > 0);
  
  const wordCount = words.length;
  const readingTime = wordCount / wordsPerMinute;
  
  return Math.ceil(readingTime);
}

export function ensureHttps(url) {
  // Check if the URL starts with 'http://' or 'https://'
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url;
  }
  return url;
}

export function generateSlug(str) {
  return str
    .toLowerCase() // Convert the string to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/[^a-z0-9\s-]/g, "") // Remove all non-word characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
}

export function reverseSlug(slug) {
  if (!slug)
    return ''
  return slug
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\s+/g, ' ') // Remove extra spaces (in case there were multiple hyphens)
    .trim(); // Remove leading and trailing spaces
}

export function removePublicFromPath(path) {
  if(!path)
    return ""
  // Remove the 'public' part from the path
  return path.replace(/^\/?public/, "");
}


export const formateDate = (date) => {
  if (!date)
    return ""
  const formattedDate = dayjs(date, "MM-DD-YYYY").format("DD MMM, YYYY");

  return formattedDate
}

export function capitalizeWords(str) {
  return str
    .split(' ') // Split the string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter and keep the rest lowercase
    .join(' '); // Join the words back into a string
}
