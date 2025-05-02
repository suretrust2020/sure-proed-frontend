import { Flex, HStack, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { ActivityCard } from "./activity-card";
import { BookOpen, Calendar, User } from "lucide-react";

interface EnrolledBatchCardProps {
  data: {
    name: string;
    startDate: string;
    endDate: string;
    progress: number;
    instructor: string;
  };
}

export function EnrolledBatchCard({ data }: EnrolledBatchCardProps) {
  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <ActivityCard
      title="Current Enrollment"
      icon={<Icon as={BookOpen} boxSize={5} />}
    >
      <Stack gap={4}>
        <Heading as="h3" size="md" color="purple.800">
          {data.name}
        </Heading>

        <Stack gap={2}>
          <Flex justify="space-between" align="center" fontSize="sm">
            <Text color="gray.600">Progress</Text>
            <Text fontWeight="medium">{data.progress}%</Text>
          </Flex>
        </Stack>

        <Stack gap={3} mt={2}>
          <HStack>
            <Icon as={User} boxSize={4} color="purple.600" />
            <Text fontSize="sm" color="gray.700">
              {data.instructor}
            </Text>
          </HStack>

          <HStack>
            <Icon as={Calendar} boxSize={4} color="purple.600" />
            <Text fontSize="sm" color="gray.700">
              {formatDate(data.startDate)} - {formatDate(data.endDate)}
            </Text>
          </HStack>
        </Stack>
      </Stack>
    </ActivityCard>
  );
}
