export function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
}

export function estimateReadingTime(paragraph, wordsPerMinute = 180) {
  if(!paragraph)
    return 0
  // Split the paragraph into words
  const words = paragraph.split(' ');

  // Count the number of words
  const wordCount = words.length;

  // Estimate the reading time in minutes
  const readingTime = wordCount / wordsPerMinute;

  // Return the reading time rounded to the nearest whole minute
  return Math.ceil(readingTime/2);
}

// Example usage
