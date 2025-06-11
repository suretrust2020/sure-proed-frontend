const SITE_NAME = "SURE ProEd";
const SITE_TAGLINE = "In association with SURE Trust";
const SITE_LOGO_URL =
  "https://img1.wsimg.com/isteam/ip/6f038646-2052-4598-8c4e-ed7fea8124d5/SURE%20INITIATIVE%20LOGO.png/:/rs=h:200,cg:true,m/qt=q:95";
const HOME_HERO_VIDEO_URL = "https://www.youtube.com/embed/4_NvQ57TYDo";
const ALUMNI_HERO_VIDEO_URL = "https://www.youtube.com/embed/5elv45wEImo";
const INTERNSHIP_HERO_IMAGE_URL = "internship-hero.jpeg";
const PAGE_SIZE = 12;
// stats
const ONGOING_BATCHES = 25;
const STUDENTS_PLACED = 300;
const STUDENTS_COMPLETED_TRAINING = 1000;
const STUDENTS_UNDERGOING_TRAINING = 300;

const COMMUNITY_SERVICES = {
  plantationStartTimestamp: 1665253800000,
  bloodDonationsStartTimestamp: 1692748800000,
  seniorCitizenStartTimestamp: 1692748800000,
};

// routes
const ROUTES_DIR = "./routes";
const PUBLIC_ROUTES_NAMESPACE = `${ROUTES_DIR}/public`;
const AUTH_ROUTES_NAMESPACE = `${ROUTES_DIR}/auth`;
const PROTECTED_ROUTES_NAMESPACE = `${ROUTES_DIR}/protected`;
const API_NAMESPACE = `${ROUTES_DIR}/api`;
const ADMIN_ROUTES_NAMESPACE = `${ROUTES_DIR}/admin`;

const COMMUNITY_SERVICE_PATH = "services-for-community";
const GALLERY_PATH = "gallery";

const ROUTES = {
  about: "about",
  contacts: "contacts",
  courses: "courses",
  communityService: COMMUNITY_SERVICE_PATH,
  plantations: "plantations",
  bloodDonations: "blood-donations",
  seniorCitizens: "senior-citizens",
  gallery: GALLERY_PATH,
  photosGallery: "photos",
  videosGallery: "videos",
  documentsGallery: "documents",
  websiteDevelopers: "website-developers",
  volunteers: "volunteers",
  alumni: "alumni",
  alumniDirectory: "alumni-directory",
  internships: "internships",
  lst: "lifeskills-training-program",
  admin: "admin",
  successStories: "success-stories",
};

const PROTECTED_ROUTES = {
  logout: "logout",
  profile: "profile",
};

export const ADMIN_ROUTES = {
  projects: "projects",
};

export const COMMUNITY_SERVICE_USER_ROLES = [
  { value: "STUDENT", label: "Student" },
  { value: "TRAINER", label: "Trainer" },
  { value: "BOARD_MEMBER", label: "Board menber" },
  { value: "IERY_MENTOR", label: "IERY mentor" },
  { value: "IERY_INTERN", label: "IERY Intern" },
];

export {
  SITE_NAME,
  SITE_TAGLINE,
  HOME_HERO_VIDEO_URL,
  INTERNSHIP_HERO_IMAGE_URL,
  ONGOING_BATCHES,
  STUDENTS_PLACED,
  STUDENTS_COMPLETED_TRAINING,
  STUDENTS_UNDERGOING_TRAINING,
  PUBLIC_ROUTES_NAMESPACE,
  AUTH_ROUTES_NAMESPACE,
  COMMUNITY_SERVICES,
  ROUTES,
  COMMUNITY_SERVICE_PATH,
  GALLERY_PATH,
  PAGE_SIZE,
  ROUTES_DIR,
  ALUMNI_HERO_VIDEO_URL,
  PROTECTED_ROUTES_NAMESPACE,
  PROTECTED_ROUTES,
  SITE_LOGO_URL,
  API_NAMESPACE,
  ADMIN_ROUTES_NAMESPACE,
};
