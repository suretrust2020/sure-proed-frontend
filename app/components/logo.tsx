import { Link } from "react-router";
import { HStack, Image, Heading, Text, VStack } from "@chakra-ui/react";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constant";

export function Logo() {
  return (
    <Link to="/">
      <HStack gap={2}>
        <Image
          src="https://img1.wsimg.com/isteam/ip/6f038646-2052-4598-8c4e-ed7fea8124d5/SURE%20INITIATIVE%20LOGO.png/:/rs=h:200,cg:true,m/qt=q:95"
          alt="Sure Trust"
          w={12}
          h={12}
        />
        <VStack gap={0} align="start">
          <Heading size="md">{SITE_NAME}</Heading>
          <Text fontSize={"xs"}>{SITE_TAGLINE}</Text>
        </VStack>
      </HStack>
    </Link>
  );
}
