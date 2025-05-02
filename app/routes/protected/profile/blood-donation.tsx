import {
  Badge,
  Center,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Heart, Calendar, Award } from "lucide-react";
import { ActivityCard } from "./activity-card";

interface BloodDonationCardProps {
  data: {
    count: number;
    lastDonated: string;
    bloodGroup: string;
    certificates: number;
  };
}

export function BloodDonationCard({ data }: BloodDonationCardProps) {
  // Format date
  const formattedDate = new Date(data.lastDonated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <ActivityCard
      title="Blood Donation"
      icon={<Icon as={Heart} boxSize={5} fill="red.500" color="red.500" />}
    >
      <Stack gap={4}>
        <Flex justify="space-between" align="center">
          <Text color="gray.600" fontWeight="medium">
            Donations
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="purple.700">
            {data.count}
          </Text>
        </Flex>

        <Center my={4}>
          <Flex
            w="80px"
            h="80px"
            borderRadius="full"
            bg="red.50"
            borderWidth={2}
            borderColor="red.100"
            align="center"
            justify="center"
          >
            <Text fontSize="xl" fontWeight="bold" color="red.600">
              {data.bloodGroup}
            </Text>
          </Flex>
        </Center>

        <Stack gap={3}>
          <Flex justify="space-between" align="center">
            <HStack>
              <Icon as={Calendar} boxSize={4} color="purple.600" />
              <Text fontSize="sm" color="gray.700">
                Last Donated
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="medium">
              {formattedDate}
            </Text>
          </Flex>

          <Flex justify="space-between" align="center">
            <HStack>
              <Icon as={Award} boxSize={4} color="purple.600" />
              <Text fontSize="sm" color="gray.700">
                Certificates
              </Text>
            </HStack>
            <Badge bg="purple.600" color="white">
              {data.certificates}
            </Badge>
          </Flex>
        </Stack>
      </Stack>
    </ActivityCard>
  );
}
