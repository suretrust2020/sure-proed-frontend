import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Box } from "@chakra-ui/react";
import UserCard from "./user-card";

export default function UsersCarousel({ users }) {
  const handleDragStart = (e) => e.preventDefault();

  const items = users?.map((user) => (
    <UserCard onDragStart={handleDragStart} key={user.id} {...user} />
  ));

  return (
    <Box mt={6}>
      <AliceCarousel
        autoPlay
        autoPlayInterval={2000}
        autoPlayStrategy="default"
        mouseTracking
        items={items}
        controlsStrategy="default"
        responsive={{
          0: {
            items: 1,
          },
          480: {
            items: 1,
          },
          768: {
            items: 2,
          },
          1280: {
            items: 3,
          },
        }}
      />
    </Box>
  );
}
