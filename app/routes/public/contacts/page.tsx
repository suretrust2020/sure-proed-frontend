import {
  Container,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  Input,
  Textarea,
  SimpleGrid,
  Flex,
  Card,
} from "@chakra-ui/react";
import { contacts, address } from "@/lib/data/contact";
import { socialLinks } from "@/lib/data/social";
import { Field } from "@/components/ui/field";

export default function Contact() {
  return (
    <Container maxW="container.xl" py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={12}>
        <Box textAlign="center">
          <Heading>Contact</Heading>

          <Box py={4}>
            <SimpleGrid columns={1} gap={3}>
              {contacts.map((contact, i) => (
                <Box key={i}>
                  <Button
                    size="md"
                    height="48px"
                    variant="ghost"
                    _hover={{ border: "2px solid #1C6FEB" }}
                    asChild
                    width={"fit-content"}
                  >
                    <a href={contact?.link} target="_blank">
                      {contact.icon}
                      {contact.text}
                    </a>
                  </Button>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <Box my={4} maxW="sm" textAlign="center" mx="auto">
            <Text fontWeight="bold">{address.text}</Text>
          </Box>

          <Flex justify="center" my={4}>
            {socialLinks.map((link, i) => (
              <Box key={i}>
                <IconButton
                  aria-label={link.name}
                  size="lg"
                  rounded="full"
                  asChild
                >
                  <a href={link.link} target="_blank">
                    {link.icon}
                  </a>
                </IconButton>
              </Box>
            ))}
          </Flex>
        </Box>

        <Box>
          <Card.Root maxW={"xl"} mx="auto">
            <Card.Body>
              <VStack gap={5}>
                <Field label="Subject" required>
                  <Input placeholder="Subject" />
                </Field>
                <Field label="Description" required>
                  <Textarea rows={6} placeholder="Description" />
                </Field>

                <Button w={"full"} variant="solid" colorScheme="blue">
                  Submit
                </Button>
              </VStack>
            </Card.Body>
          </Card.Root>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
