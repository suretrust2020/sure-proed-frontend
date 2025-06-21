export type PaginatedResp<T = any> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type StudentSession = {
  token?: string;
  user_id?: number;
  regno?: number;
  error?: string;
};
export type Student = {
  registration_no: number;
  user: { id: number; email: string };
  name: string;
  gender: string;
  phone: any;
  profile_pic: string;
  qualification: string;
  college_name: string;
  college_district: string;
  college_place: string;
  college_state: string;
  enrolment_on: string;
  is_alumni: boolean;
  linkedin_url: string | null;
  placement_company: string | null;
};
export type Stat = {
  courses: number;
  batches: number;
  trainers: number;
  studentsUndergoingTraining: number;
  studentCompletedTraining: number;
  studentsPlaced: number;
  ongoingBatches: number;
};
export type Project = {
  id: number;
  project_name: string;
  poster_url: string;
  description: string;
  is_featured: boolean;
  project_video_url: string;
  github_url: string | null;
  domain_name: string;
};
export type Collaborator = {
  id: number;
  name: string;
  link: string;
};
export type Feature = {
  id: number;
  title: string;
  description: string;
};
export type Course = {
  id: number;
  course_name: string;
  prerequisites: string;
  syllabus?: string;
  subcourses: Course[];
  category: "MEDICAL" | "NON MEDICAL";
  course_start_date?: string;
};
export type CourseListType = Pick<
  Course,
  "id" | "course_name" | "prerequisites"
>;

export type BoardMember = {
  id: number;
  name: string;
  image: string;
  about: string;
  linked_in_url: string;
};

export type CourseTeacher = {
  id: number;
  name: string;
  gender: string;
  phone: string | null;
  profile_pic: string | null;
  qualification: string;
};

export type PictureType = {
  id: number;
  image_name: string;
  images: string;
};

export type VideoType = {
  date_uploaded: string;
  id: number;
  video_name: string;
  videos: string | null;
};

export type ApiResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type PlantationType = {
  _id: string;
  course: string;
  user: string;
  plants: number;
  slug: string;
  images: { url: string; publicId: string }[];
  createdAt: string;
  updatedAt: string;
};

export type CommunityServiceStats = {
  course_name: string;
  count: number;
};

export type CommunityService = {
  id: number;
  course_name: string;
  batch_name: "G1";
  donar_name: string;
  blood_group: string;
  user_role: string;
  image_url: string;
  public_id: string;
};

export type DocumentType = {
  id: number;
  title: string;
  file: string;
};

export type DeveloperType = {
  image: string;
  name: string;
  education: string;
  active: boolean;
  links: {
    name: string;
    url: string;
    slug: string;
  }[];

  position: string;
};

export type NoticeType = {
  id: number;
  title: string;
  description: string;
};

export type VolunteerType = {
  companyName: string;
  contribution: string;
  designation: string;
  id: number;
  linkedinUrl: string;
  name: string;
  profile_pic: string;
  volunteer_type: string;
};

export enum VolunteerEnum {
  CORPORATE = "corporate",
  STUDENT = "student",
}

export type BatchType = {
  id: number;
  batch_name: string;
  course__course_name: string;
  course__id: number;
};
export type AlumniUserType = {
  registration_no: number;
  user: {
    id: number;
    email: string;
  };
  batches: BatchType[];

  placement_company: {
    id: number;
    company_name: string;
    designation: string;
    role: string;
    bio: string;
    from_date: string;
    to_date: string;
    is_current_company: true;
  };
  name: string;
  gender: "male" | "female" | "other";
  phone: number;
  profile_pic: string;
  qualification: string;
  college_name: string;
  college_district: string;
  college_place: string;
  college_state: string;
  enrolment_on: string;
  is_alumni: boolean;
  linkedin_url: string;
};

export type InternshipDomainType = {
  id: number;
  Name: string;
};

export type InternshipProjectType = {
  id: number;
  project_name: string;
  poster_url: string;
  description: string;
  github_url: null | string;
  STUDENTS: {
    name: string;
    image_url: string;
    bio: string;
    linkedin_url: string;
    github_url: string;
    is_admin: true;
  }[];
};
export type InternshipCoordinatorType = {
  name: string;
  image_url: string;
  bio: string;
  linkedin_url: string;
};

export type InternshipDetailsType = {
  COORDINATORS: InternshipCoordinatorType[];
  PROJECTS: InternshipProjectType[];
  RESULT: {
    domain_name: string;
  };
};

export type GithubRepoType = {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
};

export type ApprovalStatus = "pending" | "approved" | "declined";
