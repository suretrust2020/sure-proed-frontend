import AshokImage from "@/images/ashok.jpeg";
import JagadeeshImage from "@/images/jagadeesh.jfif";
import NiteshImage from "@/images/nitesh.jpeg";
import NamanImage from "@/images/naman.jpeg";
import AmitImage from "@/images/amit.jpeg";
import PraneethImage from "@/images/praneeth.jpg";
import VidushiImage from "@/images/vidhushi.jpeg";
import type { DeveloperType } from "../types";

export const currentManagementTeams = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDRrsCjM6ff5JgoR1KxQfFzUUCs1VXbVscIA&s",
    name: "Ram Uchit Kumar",
    active: true,
    education:
      "Python | GoLang | Django | Microservice | Socket | Postgres | MySql | Kubernetes | Docker | Kafka | PySpark | Gitlab | Jenkins | AWS | Azure | Agile",
    links: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/ramuchit/",
        slug: "linkedin",
      },
    ],
    position: "Back-end",
  },

  {
    image: "https://avatars.githubusercontent.com/u/84150035?v=4",
    name: "Kuldeep Ahlawat",
    active: true,

    education: "Full Stack, Open Source, 3D",
    links: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/imkuldeepahlawat/",
        slug: "linkedin",
      },
    ],
    position: "Frontend Contributer",
  },
  {
    image: "https://avatars.githubusercontent.com/u/57381638?v=4",
    name: "Harsh Mangalam",
    education:
      "Open Sourcer | Tech Blogger | Fullstack Engineer | Tech Event Speaker | Freelancer.",
    active: true,
    links: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/harsh-mangalam-3490001ba/",
        slug: "linkedin",
      },
    ],
    position: "Front-end",
  },
];

export const pastManagementTeams: DeveloperType[] = [
  {
    image: JagadeeshImage,
    active: false,

    name: "Mr. Jagadeesh Gajula",

    education:
      "BCA, PGD (AIML), MSc (AIML) - Liver Poole John Moores University, London; Jr Research Fellow, IITH, Technical Manager - Grey Scientific Labs.",
    links: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/jagadeeshgajula1",
        slug: "linkedin",
      },
    ],
    position: "Website Building Coordinator",
  },
  {
    image: AshokImage,
    active: false,

    name: "Mr. Ashok Babu",
    education:
      "B.Tech 3rd year, CSE, SRKR Engineering College, Bhimavaram, Andhra Pradhesh.",
    links: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/ashok-babu-g-5220971a5",
        slug: "linkedin",
      },
    ],
    position: "Backend Team Leader",
  },

  {
    image: NiteshImage,
    name: "Mr. Nitesh Kumar",
    active: false,

    education:
      "B.Tech 3rd year CSE, Netaji Subhash University of Technology, East Campus (Formerly AIACT&R), Geeta Colony, New Delhi, India.",
    links: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/nitesh-kumar-5ab3691b8",
        slug: "linkedin",
      },
    ],
    position: "Frontend Team Member",
  },

  {
    image: NamanImage,
    name: "Mr. Naman Garg",
    active: false,

    education:
      "BCA 2nd year, Kamal Institute of Higher Education and Advance Technology, New Delhi, India.",
    links: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/naman-garg-935658201",
        slug: "linkedin",
      },
    ],
    position: "Backend Team Member",
  },

  {
    image: AmitImage,
    name: "Mr. Amit",
    active: false,

    education:
      "MCA 2nd year, Lovely Professional University, Amritser, Punjab.",
    links: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/amit-kumar-bharti-76b811208",
        slug: "linkedin",
      },
    ],
    position: "Frontend Team Member",
  },

  {
    image: PraneethImage,
    name: "Mr. Praneeth Kumar Ketha",
    active: false,

    education:
      "B.Tech 3rd year CSE, Sri Venkateswara College of Engineering, Tirupati, Andhra Pradesh.",
    links: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/amit-kumar-bharti-76b811208",
        slug: "linkedin",
      },
    ],
    position: "Website Beautician",
  },

  {
    image: VidushiImage,
    name: "Ms. Vidushi Agarwal",
    active: false,

    education:
      "B.Tech 3rd year CSE, Dehradun Institute of Technology, Varanasi Tehsil, Uttar Pradesh.",
    links: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/vidushi-agrawal-0631721b6",
        slug: "linkedin",
      },
    ],
    position: "Frontend Team Member",
  },
];
