function calculateTimeDifferenceFromNow(date: number) {
  const now = Date.now();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Converts a number of days into years, accounting for leap years.
 */
function convertDaysToYears(days: number) {
  const daysInYear = 365.25; // Average number of days in a year (accounts for leap years)
  const years = Math.floor(days / daysInYear);
  const remainingDays = Math.floor(days % daysInYear);
  const months = Math.floor(remainingDays / 30); // Approximation: 30 days in a month
  const daysLeft = remainingDays % 30;

  return `${years} years, ${months} months, and ${daysLeft} days`;
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard:", text);
    return true; // Indicating success
  } catch (error) {
    console.error("Failed to copy:", error);
    return false; // Indicating failure
  }
}
export { calculateTimeDifferenceFromNow, convertDaysToYears, copyToClipboard };

export function getLanguageColor(language: string): string {
  const languageColors: { [key: string]: string } = {
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    Ruby: "#701516",
    PHP: "#4F5D95",
    "C++": "#f34b7d",
    "C#": "#178600",
    TypeScript: "#3178c6",
    Go: "#00ADD8",
    Rust: "#dea584",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Swift: "#f05138",
    Kotlin: "#A97BFF",
    SQL: "#e38caa",
    Markdown: "#083fa1",
    R: "#198CE7",
    Dockerfile: "#384d54",
  };

  return languageColors[language] || "#d3d3d3"; // Default color for unknown languages
}

export function calculatePasswordStrength(password: string): number {
  let score = 0;
  if (!password) return score;

  // Criteria
  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score; // Max score: 4
}
