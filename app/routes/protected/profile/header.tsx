import { useColorModeValue } from "@/components/ui/color-mode";
import type { Student } from "@/lib/types";
import {
  Avatar,
  Box,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User, Mail, Phone, School, MapPin, GraduationCap } from "lucide-react";

export function ProfileHeader({ student }: { student: Student }) {
  const {
    name,
    college_name,
    college_district,
    college_place,
    college_state,
    enrolment_on,
    gender,
    is_alumni,
    linkedin_url,
    phone,
    placement_company,
    profile_pic,
    qualification,
    registration_no,
    user,
  } = student;
  const sectionBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Card.Root overflow="hidden">
      <Card.Body p={0}>
        <Flex direction={{ base: "column", md: "row" }} position="relative">
          {/* Avatar Section */}
          <Box
            width={{ base: "full", md: "250px" }}
            position="relative"
            borderRightWidth={{ base: 0, md: "1px" }}
            pt={4}
            px={4}
          >
            <Avatar.Root
              size="2xl"
              position="relative"
              colorPalette={"purple"}
              variant={"subtle"}
            >
              <Avatar.Fallback name={name} />
              <Avatar.Image src="/placeholder.svg?height=128&width=128" />
            </Avatar.Root>

            <Heading as="h2" size="lg" mt={2} color="gray.solid">
              {name}
            </Heading>

            <Stack gap={1} mt={4}>
              <HStack justify={["start"]} color="gray.solid">
                <Icon as={User} boxSize={4} />
                <Text fontWeight="medium">ID: {user.id}</Text>
              </HStack>
              <HStack justify={["start"]} color="gray.solid">
                <Icon as={GraduationCap} boxSize={4} />
                <Text fontWeight="medium">Reg: {registration_no}</Text>
              </HStack>
            </Stack>
          </Box>

          {/* Details Section */}
          <Box flex={1} p={6}>
            <Heading as="h3" size="md" mb={4} fontWeight="semibold">
              Personal Information
            </Heading>

            <Grid
              templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
              gap={4}
              p={4}
              borderRadius="md"
              mb={6}
              bg="gray.subtle"
            >
              <GridItem>
                <Stack gap={3}>
                  <HStack color="gray.solid">
                    <Icon as={Mail} boxSize={4} />
                    <Text fontWeight="medium">Email:</Text>
                    <Text>{user.email}</Text>
                  </HStack>

                  <HStack color="gray.solid">
                    <Icon as={Phone} boxSize={4} />
                    <Text fontWeight="medium">Phone:</Text>
                    <Text>{phone}</Text>
                  </HStack>
                </Stack>
              </GridItem>

              <GridItem>
                <Stack gap={3}>
                  <HStack color="gray.solid">
                    <Icon as={GraduationCap} boxSize={4} />
                    <Text fontWeight="medium">Qualification:</Text>
                    <Text>{qualification}</Text>
                  </HStack>

                  <HStack color="gray.solid">
                    <Icon as={User} boxSize={4} />
                    <Text fontWeight="medium">Gender:</Text>
                    <Text>{gender}</Text>
                  </HStack>
                </Stack>
              </GridItem>
            </Grid>

            <Separator my={4} />

            <Heading as="h3" size="md" mb={4} fontWeight="semibold">
              College Information
            </Heading>

            <Box p={4} bg={"gray.subtle"}>
              <Stack gap={3}>
                <HStack color="gray.solid">
                  <Icon as={School} boxSize={5} />
                  <Text fontWeight="bold" fontSize="lg">
                    {college_name}
                  </Text>
                </HStack>

                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={3}
                  mt={2}
                >
                  <HStack color="gray.solid">
                    <Icon as={MapPin} boxSize={4} />
                    <Text fontWeight="medium">Place:</Text>
                    <Text>{college_place}</Text>
                  </HStack>

                  <HStack color="gray.solid">
                    <Icon as={MapPin} boxSize={4} />
                    <Text fontWeight="medium">District:</Text>
                    <Text>{college_district}</Text>
                  </HStack>

                  <GridItem colSpan={{ base: 1, md: 2 }}>
                    <HStack color="gray.solid">
                      <Icon as={MapPin} boxSize={4} />
                      <Text fontWeight="medium">State:</Text>
                      <Text>{college_state}</Text>
                    </HStack>
                  </GridItem>
                </Grid>
              </Stack>
            </Box>
          </Box>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
