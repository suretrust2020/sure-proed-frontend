"use client";

import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

Chart.register();

export function ServicesChart({
  courses,
  serviceType,
}: {
  courses: { course_name: string; count: number; users?: string[] }[];
  serviceType: "Plantations" | "Blood Donations" | "Senior Citizen";
}) {
  const labels = courses.map(
    (course) => course.course_name.slice(0, 16) + "..."
  );
  const options = {
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Sure Trust " + serviceType,
      },
    },
  };

  const backgroundColor =
    serviceType === "Blood Donations"
      ? "#E57373"
      : serviceType === "Plantations"
      ? "#81C784"
      : serviceType === "Senior Citizen"
      ? "#64B5F6"
      : "";
  const data = {
    labels,
    datasets: [
      {
        label: "Volunteers",
        data: courses.map((stat) => stat.count),
        backgroundColor,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
