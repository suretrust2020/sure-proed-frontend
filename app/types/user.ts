export type T_User = {
  registration_no: number;
  user: { id: number; email: string };
  name: string;
  gender: string;
  phone: string;
  profile_pic: string;
  qualification: string;
  college_name: string | null;
  college_district: string | null;
  college_place: string | null;
  college_state: string | null;
  enrolment_on: string;
  is_alumni: boolean;
  linkedin_url: string | null;
  placement_company: string | null;
};
