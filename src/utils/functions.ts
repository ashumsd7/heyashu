import dayjs from "dayjs";

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

export function estimateReadingTime(paragraph, wordsPerMinute = 180) {
  if (!paragraph)
    return 0
  // Split the paragraph into words
  const words = paragraph.split(' ');

  // Count the number of words
  const wordCount = words.length;

  // Estimate the reading time in minutes
  const readingTime = wordCount / wordsPerMinute;

  // Return the reading time rounded to the nearest whole minute
  return Math.ceil(readingTime / 2);
}

// Example usage


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
  // Remove the 'public' part from the path
  return path.replace(/^\/?public/, "");
}


export const formateDate=(date)=>{
  const formattedDate =  dayjs(date, "DD-MM-YYYY").format("DD MMM, YYYY");

  return formattedDate
}