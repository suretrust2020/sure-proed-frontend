import { Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { ActivityCard } from "./activity-card";
import { Leaf, Calendar, BookOpen } from "lucide-react";

interface PlantationCardProps {
  data: {
    count: number;
    name: string;
    batch: string;
    course: string;
  };
}

export function PlantationCard({ data }: PlantationCardProps) {
  return (
    <ActivityCard
      title="Plantation Activity"
      icon={<Icon as={Leaf} boxSize={5} />}
    >
      <Stack gap={4}>
        <Flex justify="space-between" align="center">
          <Text color="gray.600" fontWeight="medium">
            Plants Planted
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="purple.700">
            {data.count}
          </Text>
        </Flex>

        <Stack gap={2} mt={4}>
          <HStack>
            <Flex
              w={5}
              h={5}
              borderRadius="full"
              bg="purple.100"
              align="center"
              justify="center"
              mr={2}
            >
              <Icon as={Leaf} boxSize={3} color="purple.600" />
            </Flex>
            <Text fontSize="sm" color="gray.700">
              {data.name}
            </Text>
          </HStack>
          <HStack>
            <Flex
              w={5}
              h={5}
              borderRadius="full"
              bg="purple.100"
              align="center"
              justify="center"
              mr={2}
            >
              <Icon as={Calendar} boxSize={3} color="purple.600" />
            </Flex>
            <Text fontSize="sm" color="gray.700">
              {data.batch}
            </Text>
          </HStack>
          <HStack>
            <Flex
              w={5}
              h={5}
              borderRadius="full"
              bg="purple.100"
              align="center"
              justify="center"
              mr={2}
            >
              <Icon as={BookOpen} boxSize={3} color="purple.600" />
            </Flex>
            <Text fontSize="sm" color="gray.700">
              {data.course}
            </Text>
          </HStack>
        </Stack>
      </Stack>
    </ActivityCard>
  );
}
