import {
  type RouteConfig,
  route,
  layout,
  index,
  prefix,
} from "@react-router/dev/routes";
import {
  ADMIN_ROUTES,
  ADMIN_ROUTES_NAMESPACE,
  API_NAMESPACE,
  AUTH_ROUTES_NAMESPACE,
  GALLERY_PATH,
  PROTECTED_ROUTES,
  PROTECTED_ROUTES_NAMESPACE,
  PUBLIC_ROUTES_NAMESPACE,
  ROUTES,
  ROUTES_DIR,
} from "./lib/constant";

export default [
  // * matches all URLs, the ? makes it optional so it will match / as well
  layout(`${ROUTES_DIR}/layout.tsx`, [
    layout(`${PUBLIC_ROUTES_NAMESPACE}/layout.tsx`, [
      index(`${PUBLIC_ROUTES_NAMESPACE}/home/page.tsx`),
      route(ROUTES.about, `${PUBLIC_ROUTES_NAMESPACE}/about/page.tsx`),
      route(ROUTES.lst, `${PUBLIC_ROUTES_NAMESPACE}/lst/page.tsx`),
      route(ROUTES.contacts, `${PUBLIC_ROUTES_NAMESPACE}/contacts/page.tsx`),
      ...prefix(ROUTES.courses, [
        index(`${PUBLIC_ROUTES_NAMESPACE}/courses/page.tsx`),
        route(
          ":courseId",
          `${PUBLIC_ROUTES_NAMESPACE}/course-details/page.tsx`
        ),
      ]),
      ...prefix(ROUTES.communityService, [
        index(`${PUBLIC_ROUTES_NAMESPACE}/community-services/page.tsx`),
        ...prefix(ROUTES.plantations, [
          index(
            `${PUBLIC_ROUTES_NAMESPACE}/community-services/plantations/page.tsx`
          ),
          route(
            ":id",
            `${PUBLIC_ROUTES_NAMESPACE}/community-services/plantations/details/page.tsx`
          ),
        ]),
        ...prefix(ROUTES.bloodDonations, [
          index(
            `${PUBLIC_ROUTES_NAMESPACE}/community-services/blood-donations/page.tsx`
          ),
          route(
            ":id",
            `${PUBLIC_ROUTES_NAMESPACE}/community-services/blood-donations/details/page.tsx`
          ),
        ]),
        ...prefix(ROUTES.seniorCitizens, [
          index(
            `${PUBLIC_ROUTES_NAMESPACE}/community-services/senior-citizens/page.tsx`
          ),
          route(
            ":id",
            `${PUBLIC_ROUTES_NAMESPACE}/community-services/senior-citizens/details/page.tsx`
          ),
        ]),
      ]),
      ...prefix(ROUTES.gallery, [
        index(`${PUBLIC_ROUTES_NAMESPACE}/${GALLERY_PATH}/page.tsx`),
        route(
          ROUTES.photosGallery,
          `${PUBLIC_ROUTES_NAMESPACE}/${GALLERY_PATH}/${ROUTES.photosGallery}/page.tsx`
        ),
        route(
          ROUTES.videosGallery,
          `${PUBLIC_ROUTES_NAMESPACE}/${GALLERY_PATH}/${ROUTES.videosGallery}/page.tsx`
        ),
        route(
          ROUTES.documentsGallery,
          `${PUBLIC_ROUTES_NAMESPACE}/${GALLERY_PATH}/${ROUTES.documentsGallery}/page.tsx`
        ),
      ]),
      route(
        ROUTES.websiteDevelopers,
        `${PUBLIC_ROUTES_NAMESPACE}/website-developers/page.tsx`
      ),
      route(
        ROUTES.volunteers,
        `${PUBLIC_ROUTES_NAMESPACE}/volunteers/page.tsx`
      ),
      route(ROUTES.alumni, `${PUBLIC_ROUTES_NAMESPACE}/alumni/page.tsx`),
      ...prefix(ROUTES.internships, [
        index(`${PUBLIC_ROUTES_NAMESPACE}/internships/page.tsx`),
        route(
          ":id",
          `${PUBLIC_ROUTES_NAMESPACE}/internships/projects/page.tsx`
        ),
      ]),
    ]),
    layout(`${ROUTES_DIR}/auth/layout.tsx`, [
      route("login", `${AUTH_ROUTES_NAMESPACE}/login/page.tsx`),
      route("signup", `${AUTH_ROUTES_NAMESPACE}/signup/page.tsx`),
    ]),

    layout(`${PROTECTED_ROUTES_NAMESPACE}/layout.tsx`, [
      route(PROTECTED_ROUTES.logout, `${PROTECTED_ROUTES_NAMESPACE}/logout.ts`),
      route(
        PROTECTED_ROUTES.profile,
        `${PROTECTED_ROUTES_NAMESPACE}/profile/page.tsx`
      ),
    ]),
  ]),
  ...prefix("/api", [route("/cloudinary", `${API_NAMESPACE}/cloudinary.ts`)]),
  ...prefix(ROUTES.admin, [
    layout(`${ADMIN_ROUTES_NAMESPACE}/layout.tsx`, [
      index(`${ADMIN_ROUTES_NAMESPACE}/page.tsx`),
      route(
        ADMIN_ROUTES.projects,
        `${ADMIN_ROUTES_NAMESPACE}/projects/page.tsx`
      ),
    ]),
  ]),
] satisfies RouteConfig;
