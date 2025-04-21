import { Box, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useAuthState } from "../../contexts/auth";
import { enrollStudentToCourse } from "../../services";

function EnrollCourse({ course, ...rest }) {
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuthenticated, role } = useAuthState();
  async function handleEnrollStudent() {
    try {
      const data = await enrollStudentToCourse(course.id);
      toast({
        duration: 3000,
        title: "Enroll",
        description: data.success || data.error,
        isClosable: true,
        status: data.success ? "success" : "error",
      });
      if (data.success) {
        navigate("/dashboard/batches");
      }
    } catch (error) {
      console.log(error);
      toast({
        duration: 3000,
        title: "Enroll",
        description: "Error during course enroll",
        isClosable: true,
        status: "error",
      });
    }
  }
  return (
    <Box>
      {!course.subcourses?.length && isAuthenticated && role === "student" && (
        <Button
          colorScheme={"purple"}
          size={"lg"}
          onClick={handleEnrollStudent}
          {...rest}
        >
          Enroll Now
        </Button>
      )}
    </Box>
  );
}

export default EnrollCourse;
