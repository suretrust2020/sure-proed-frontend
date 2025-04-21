import { formatDistanceToNow, subDays } from "date-fns";

function daysAgo(days: number) {
  const pastDate = subDays(new Date(), days); // Subtract days from the current date
  return formatDistanceToNow(pastDate, { addSuffix: false }); // Format the distance with "ago"
}

export { daysAgo };
