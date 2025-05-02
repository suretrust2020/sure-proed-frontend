import { Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { ActivityCard } from "./activity-card";
import { Users, MapPin, Calendar } from "lucide-react";

interface SeniorServiceCardProps {
  data: {
    hours: number;
    projects: number;
    location: string;
    lastActivity: string;
  };
}

export function SeniorServiceCard({ data }: SeniorServiceCardProps) {
  // Format date
  const formattedDate = new Date(data.lastActivity).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <ActivityCard
      title="Service to Senior Citizens"
      icon={<Icon as={Users} boxSize={5} />}
    >
      <Stack gap={4}>
        <Flex justify="space-between" align="center">
          <Text color="gray.600" fontWeight="medium">
            Service Hours
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="purple.700">
            {data.hours}
          </Text>
        </Flex>

        <Stack gap={3} mt={2}>
          <Flex justify="space-between" align="center">
            <HStack>
              <Icon as={Users} boxSize={4} color="purple.600" />
              <Text fontSize="sm" color="gray.700">
                Projects
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="medium">
              {data.projects}
            </Text>
          </Flex>

          <HStack>
            <Icon as={MapPin} boxSize={4} color="purple.600" flexShrink={0} />
            <Text fontSize="sm" color="gray.700">
              {data.location}
            </Text>
          </HStack>

          <Flex justify="space-between" align="center">
            <HStack>
              <Icon as={Calendar} boxSize={4} color="purple.600" />
              <Text fontSize="sm" color="gray.700">
                Last Activity
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="medium">
              {formattedDate}
            </Text>
          </Flex>
        </Stack>
      </Stack>
    </ActivityCard>
  );
}
