import { Link } from "react-router";
import { HStack, Image, Heading, Text, VStack } from "@chakra-ui/react";
import { SITE_LOGO_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/constant";

export function Logo({
  compressed = false,
  width = 12,
  height = 12,
}: {
  compressed?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <Link to="/">
      <HStack gap={2}>
        <Image src={SITE_LOGO_URL} alt="Sure Trust" w={width} h={height} />
        {!compressed && (
          <VStack gap={0} align="start">
            <Heading size="md">{SITE_NAME}</Heading>
            <Text fontSize={"xs"}>{SITE_TAGLINE}</Text>
          </VStack>
        )}
      </HStack>
    </Link>
  );
}
