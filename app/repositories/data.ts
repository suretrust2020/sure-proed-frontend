import {
  currentManagementTeams,
  pastManagementTeams,
} from "@/lib/data/website-developers";

async function getWebsiteDevelopers() {
  return {
    currentManagementTeams,
    pastManagementTeams,
  };
}

export { getWebsiteDevelopers };
