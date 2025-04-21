import { Count } from "@/components/count";
import { StatLabel, StatRoot, StatValueText } from "@/components/ui/stat";
import { BatchIcon, CourseIcon, StudentIcon, UsersIcon } from "@/lib/icons";
import type { Stat } from "@/lib/types";
import { SimpleGrid } from "@chakra-ui/react";

export function DashboardStats({ stats }: { stats: Stat }) {
  const data = [
    {
      label: "Students Undergoing Training",
      value: stats.studentsUndergoingTraining,
      icon: <StudentIcon size={36} />,
    },
    {
      label: "Students Completed Training",
      value: stats.studentCompletedTraining,
      icon: <StudentIcon size={36} />,
    },
    {
      label: "Students Placed",
      value: stats.studentsPlaced,
      icon: <StudentIcon size={36} />,
    },
    {
      label: "Trainers",
      value: stats.trainers,
      icon: <UsersIcon size={36} />,
    },
    {
      label: "Courses",
      value: stats.courses,
      icon: <CourseIcon size={36} />,
    },
    {
      label: "Ongoing Batches",
      value: stats.ongoingBatches,
      icon: <BatchIcon size={36} />,
    },
    {
      label: "Batches",
      icon: <BatchIcon size={36} />,
      value: stats.batches,
    },
  ];

  return (
    <SimpleGrid columns={[1, 1, 2, 3, 4]} gap={4}>
      {data.map(({ label, value }) => (
        <StatRoot
          key={label}
          px={6}
          py={4}
          shadow={"none"}
          borderWidth={"1px"}
          rounded={"lg"}
          h="full"
          bg={"bg.panel"}
          alignItems={"center"}
        >
          <StatValueText fontSize={"2xl"} fontWeight={"bold"}>
            <Count value={value} />+
          </StatValueText>
          <StatLabel fontSize={"md"}>{label}</StatLabel>
        </StatRoot>
      ))}
    </SimpleGrid>
  );
}
