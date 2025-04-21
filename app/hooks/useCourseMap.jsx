import { useEffect, useState } from "react";

export default function useCourseMap() {
  const courses = [
    {
      course: "Robotics Foundation",
      link: "https://suretrustforruralyouth.com/courses/23",
      stream: "Common Engineering Courses",
      subCourse: "",
    },
    {
      course: "Cybersecurity & Ethical Hacking",
      link: "https://suretrustforruralyouth.com/courses/32",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "Android App Development",
      link: "https://suretrustforruralyouth.com/courses/35",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "Full Stack Development",
      link: "https://suretrustforruralyouth.com/courses/37",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "Core Java Programming",
      link: "https://suretrustforruralyouth.com/courses/40",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "Python & Machine Learning Basic Applications",
      link: "https://suretrustforruralyouth.com/courses/43",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "Digital Marketing",
      link: "https://suretrustforruralyouth.com/courses/54",
      stream: "Management and Commerce",
      subCourse: "",
    },
    {
      course: "Embedded Systems and Internet of Things",
      link: "https://suretrustforruralyouth.com/courses/59",
      stream: "Electronics and Communication Engineering",
      subCourse: "",
    },
    {
      course: "Financial Modelling & Valuation",
      link: "https://suretrustforruralyouth.com/courses/62",
      stream: "Management and Commerce",
      subCourse: "",
    },
    {
      course: "SQL & Microsoft BI Tools including PowerBi",
      link: "https://suretrustforruralyouth.com/courses/65",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "Data Science and Data Analytics -- Basic Applications",
      link: "https://suretrustforruralyouth.com/courses/96",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "PCB Designing",
      link: "https://suretrustforruralyouth.com/courses/98",
      stream: "Electrical and Electronics Engineering",
      subCourse: "",
    },
    {
      course: "DevOps Foundation Course",
      link: "https://suretrustforruralyouth.com/courses/99",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "Robotic Process Automation",
      link: "https://suretrustforruralyouth.com/courses/101",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "Software Testing & Tools",
      link: "https://suretrustforruralyouth.com/courses/112",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "UI / UX Designing and Project Management",
      link: "https://suretrustforruralyouth.com/courses/120",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "Industrial Automation",
      link: "https://suretrustforruralyouth.com/courses/129",
      stream: "Electrical and Electronics Engineering",
      subCourse: "",
    },
    {
      course: "Industrial Training for Civil Engineers",
      link: "https://suretrustforruralyouth.com/courses/130",
      stream: "Civil Engineering",
      subCourse: "",
    },
    {
      course: "Cloud Computing",
      link: "https://suretrustforruralyouth.com/courses/134",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "Image Processing",
      link: "https://suretrustforruralyouth.com/courses/135",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "AutoCad & Solidworks for Mechanical Engineers",
      link: "https://suretrustforruralyouth.com/courses/136",
      stream: "Mechanical and Automobile Engineering",
      subCourse: "",
    },
    {
      course: "R Programming for Data Science",
      link: "https://suretrustforruralyouth.com/courses/137",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "Smart Plant 3D Training",
      link: "https://suretrustforruralyouth.com/courses/138",
      stream: "Electrical and Electronics Engineering",
      subCourse: "",
    },
    {
      course: "Medical Coding Training",
      link: "https://suretrustforruralyouth.com/courses/139",
      stream: "Medical Field",
      subCourse: "",
    },
    {
      course: "Data Engineering",
      link: "https://suretrustforruralyouth.com/courses/140",
      stream: "Computer Science Engineering",
      subCourse: "",
    },
    {
      course: "SAP Training",
      link: "https://suretrustforruralyouth.com/courses/113",
      stream: "Management and Commerce",
      subCourse: "SAP FICO Training",
    },
    {
      course: "SAP Training",
      link: "https://suretrustforruralyouth.com/courses/124",
      stream: "Management and Commerce",
      subCourse: "SAP S/4 HANA",
    },
    {
      course: "SAP Training",
      link: "https://suretrustforruralyouth.com/courses/114",
      stream: "Common Engineering Courses",
      subCourse: "SAP ABAP Consultant Training",
    },
    {
      course: "VLSI Designing",
      link: "https://suretrustforruralyouth.com/courses/125",
      stream: "Electronics and Communication Engineering",
      subCourse: "Back-End",
    },
    {
      course: "VLSI Designing",
      link: "https://suretrustforruralyouth.com/courses/63",
      stream: "Electronics and Communication Engineering",
      subCourse: "Front-End",
    },
    {
      course: "Data Structures & Algorithms",
      link: "https://suretrustforruralyouth.com/courses/133",
      stream: "Computer Science Engineering",
      subCourse: "Data Structures & Algorithms in Python",
    },
    {
      course: "Data Structures & Algorithms",
      link: "https://suretrustforruralyouth.com/courses/132",
      stream: "Computer Science Engineering",
      subCourse: "Data Structures & Algorithms in C++",
    },
  ];
  const [data, setData] = useState({});

  const buildTree = (courses, stream) => {
    const children = courses
      .filter((course) => course.stream === stream)
      .map((course) => ({
        name: course.course,
        children: [],
        url: course.link,
      }));

    children.forEach((child) => {
      child.children = buildTree(courses, child.name);
    });

    return children;
  };

  useEffect(() => {
    const categorizeCoursesByStream = () => {
      const streams = [...new Set(courses.map((course) => course.stream))];
      const result = streams.map((stream) => ({
        name: stream,
        children: buildTree(courses, stream),
      }));

      const final = {
        name: "Courses",
        children: result,
      };

      setData(final);
    };
    categorizeCoursesByStream();
  }, []);

  return {
    data,
  };
}
