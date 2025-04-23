import { Logo } from "@/components/logo";
import { ROUTES, SITE_NAME } from "@/lib/constant";
import { LinkedinIcon } from "@/lib/icons";
import {
  Box,
  Text,
  Stack,
  HStack,
  Icon,
  SimpleGrid,
  Container,
  Separator,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router";

// Type definitions
interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  href: string;
  icon: any;
  label: string;
}

// Navigation link groups
const FOOTER_LINKS: FooterLinkGroup[] = [
  {
    title: "Common Links",
    links: [
      { label: "About", href: ROUTES.about },
      { label: "Contacts", href: ROUTES.contacts },
      { label: "Gallery", href: ROUTES.gallery },
    ],
  },
  {
    title: "Training",
    links: [
      { label: "Internships", href: ROUTES.courses },
      { label: "Lifeskills Training Program", href: ROUTES.lst },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Volunteers", href: ROUTES.volunteers },
      { label: "Alumni", href: ROUTES.alumni },
      { label: "Services for Community", href: ROUTES.communityService },
      { label: "Website Developers", href: ROUTES.websiteDevelopers },
    ],
  },
];

// Social media configuration
const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.linkedin.com/company/suretrustforruralyouth/",
    icon: LinkedinIcon,
    label: "LinkedIn",
  },
];

// Footer link group component
interface FooterLinkGroupProps {
  title: string;
  links: FooterLink[];
}

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="semibold" mb={4}>
        {title}
      </Text>
      <Stack gap={2} fontSize="sm" color="gray.300">
        {links.map((link) => (
          <Text key={link.href} fontSize={"sm"} color={"fg.muted"}>
            <Link to={link.href}>{link.label}</Link>
          </Text>
        ))}
      </Stack>
    </Box>
  );
}

// Social links component
function SocialLinks() {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="semibold" mb={4}>
        Follow Along
      </Text>
      <HStack>
        {SOCIAL_LINKS.map((social) => (
          <IconButton
            rounded={"full"}
            aria-label={social.label}
            key={social.href}
            asChild
            variant={"outline"}
          >
            <a target="_blank" href={social.href} rel="noopener noreferrer">
              <Icon as={social.icon} width={5} height={5} />
            </a>
          </IconButton>
        ))}
      </HStack>
    </Box>
  );
}

// Main footer component
export function Footer() {
  return (
    <Box as="footer" background={"gray.subtle"}>
      <Container py={12}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
          gap={{ base: 8, md: 10 }}
          mx="auto"
        >
          {/* Brand Section */}
          <Box>
            <Logo />
          </Box>

          {/* Navigation Link Groups */}
          {FOOTER_LINKS.map((group) => (
            <FooterLinkGroup
              key={group.title}
              title={group.title}
              links={group.links}
            />
          ))}

          {/* Social Links */}
          <SocialLinks />
        </SimpleGrid>
      </Container>

      <Separator />

      <Container maxW="container.xl" py={6}>
        <Text textAlign="center" fontSize="sm" color="gray.500">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
