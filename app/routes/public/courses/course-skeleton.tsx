import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { Card, HStack } from "@chakra-ui/react";

export function CourseSkelton() {
  return (
    <Card.Root>
      <Card.Body>
        <SkeletonText height={6} noOfLines={2} />
        <SkeletonText height={4} noOfLines={1} mt={2} />
      </Card.Body>
      <Card.Footer>
        <HStack>
          <Skeleton width={16} height={8} />
          <Skeleton width={16} height={8} />
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
}
