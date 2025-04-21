import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { Route } from "./+types/page";
import { Button } from "@/components/ui/button";
import { UserCard } from "./user-card";
import Guidelines from "./guidelines";

export default function LSTPage({ loaderData }: Route.ComponentProps) {
  return (
    <Box>
      <Box
        as="section"
        py={16}
        px={6}
        textAlign="center"
        bg={{ base: "gray.50", _dark: "gray.950" }}
        borderRadius="lg"
        color={{ base: "black", _dark: "gray.300" }}
      >
        <Container maxW={"7xl"}>
          <VStack gap={6} maxW="800px" mx="auto">
            <Heading as="h1" size="3xl" fontWeight="bold">
              Life Skills Training Form & Guidelines
            </Heading>
            <Text
              fontSize="lg"
              color={{ base: "gray.700", _dark: "gray.300" }}
              lineHeight="1.8"
            >
              Greetings to one and all! We at <strong>SureTrust</strong>{" "}
              encourage you to share your skills and talents. However, while
              posting an image or video showcasing your talent, please ensure
              that you follow the guidelines.
            </Text>
            <Stack direction={{ base: "column", md: "row" }} gap={4}>
              <Button asChild colorPalette="purple" size="lg">
                <a target="_blank" href="https://forms.gle/GMiVg4AHFYPbEHuS7">
                  Fill Up Form
                </a>
              </Button>
              <Guidelines {...loaderData.guidelines} />
            </Stack>
          </VStack>
        </Container>
      </Box>
      <Container maxW={"7xl"} mt={8}>
        <Heading as="h2" size="2xl" fontWeight="bold" mb={6} textAlign="left">
          Introduction
        </Heading>
        <Stack gap={4} color={{ base: "gray.700", _dark: "gray.300" }}>
          {loaderData.into.map((text, i) => (
            <Text fontSize="lg" lineHeight="1.8" textAlign="justify" key={i}>
              {text}
            </Text>
          ))}
        </Stack>
      </Container>
      <Container maxW={"7xl"} mt={8}>
        <Box as="section" mb={16}>
          <Heading as="h2" size="2xl" fontWeight="bold" mb={6}>
            Life Skills Training Module
          </Heading>

          <SimpleGrid columns={[1, 2, 3]} gap={4}>
            {loaderData.trainingModules.map((user, index) => (
              <UserCard {...user} key={index} />
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}

export function loader() {
  return {
    into: [
      `Life skill is a term used to describe a set of basic skills acquired either through learning or  by direct life experience.  This enables individuals and groups to effectively handle issues and problems commonly encountered in daily life.`,
      `They include creativity, critical thinking, problem-solving, decision-making, the ability to communicate and collaborate, along with personal and social responsibility that contribute to wholesome wellbeing of an individual. `,
      `
          Sure Trust was initially founded to empower rural unemployed youth by bridging the gap between knowledge acquired at the university and skills required by the industries in a dynamic environment. To address this issue certain technical courses such as AI, Python , Machine Learning , Project Management and Spoken English were launched. Overtime, these courses exponentially grew to 40+ in number, catering to different needs of the industry.
          `,
      `However, some of us felt , mere technical or academic knowledge does not make an individual wholesome. There is a dire need to unleash the latent potential of a student. Every student is unique regardless of what background he/she comes from or what qualifications they have secured during their undergrad program. It is to tap and elicit this ‘uniqueness’ in them and also nurture it, we decided to launch ‘Lifeskills Training Sessions’ . They now become an asset to their company and immediate neighborhood. `,
    ],

    trainingModules: [
      {
        name: "Mrs. Kritika Ram",
        bio: "Chief Operating Officer, Feminist Approach To Technology (FAT), Delhi, India",
        imageUrl:
          "https://platform.suretrustforruralyouth.com/media/gallery/kritika.webp",
        category: "Personality Branding & Networking",
      },
      {
        name: "V.J.Ramanan",
        bio: "Moved to US in 2000. Worked at various chip / semiconductor / networking companies like AMD, Nvidia, Cisco. Presently working for Nokia. Scope of work: Design of processors and networking switches, Performance Modeling and characterization of next generation architecture.",
        imageUrl: "",
        category: "Lateral Thinking",
      },
      {
        name: "Gauri Balachandran",
        bio: "Associate consultant-product analytics currently pursuing M.Sc Data Science M.Sc Mathematics",
        imageUrl: "",
        category: "Communication Skills",
      },
      {
        name: "Mrs. Vijayalakshmi Suresh, M.Com, B.Ed",
        bio: "LST Anchor, Multimedia Volunteer : Vidya Vahini – Sri Satya Sai Central Trust. Profession: Special needs educator, Dubai",
        imageUrl: "",
        category: "Communication Skills",
      },
      {
        name: "Mr. Amar Vivek Aggarwal B.A (Hons), M.B.A and LL.B",
        bio: "Founding partner-Avsai Legal; and Legal Practitioner-practicing Attorney for more than 31yrs., at various High Courts, and Hon’ble Supreme Court of India. Last Assignment: Additional Advocate General, Haryana, at High Courts of Delhi, Punjab and Hy, and Supreme Court, from December 2014 till November, 2019.",
        imageUrl: "",
        category: "Social Service",
      },
      {
        name: "Posam Sai Teja",
        bio: "M.Sc in Data Science and Computing",
        imageUrl: "",
        category: "Wellbeing and Yoga",
      },
    ],

    guidelines: {
      title: `Guidelines for competitions /events`,
      headerText: `Greetings to one and all!. We at suretrust encourage you to post your skills & talent. However, while posting your talent/skill as an image or video please make sure that you follow the guidelines given below.`,
      footerText: `Anything you present, just make sure that you as presenters are well groomed. And what you are presenting is equally modest and decent. How you conduct yourselves even casually projects a lot about your inner personality. This is personality branding and networking too. Face is the index of mind. Your display picture in whats app /mobile or email also needs to align itself to a certain code of conduct. I understand these are extremely personal but since media is the medium through which,  all of us get connected predominantly, you need to take utmost care in maintaining your profile in the most professional manner.  `,
      lists: [
        {
          title: `Choice of any song either for singing/dancing`,
          content: `competition can be patriotic, devotional , philosophical or something meaningful. There should be some message in whatever you submit for any event. Even if it is a filmy song, please check for above parameters. Decency cannot be compromised under any circumstances.`,
        },
        {
          title: `Dresscode`,
          content: `lease be very conscious of what you are wearing when you are presenting yourself. What we wear reflects a lot about our personality. Groom very well, do not wear shorts. Wear dresses which are completely covered and modest. `,
        },
        {
          title: `Choice of images for  painting`,
          content: `Again,please choose good images that can convey meaningful messages or just nature or decent portrait is fine. You cannot draw or paint pictures which are not suitable enough to showcase it for a larger audience. `,
        },
        {
          title: `Timing`,
          content: `1min video where you are presenting , painting, any other skill etc. if you want to show more contents then it should be in fast forward mode for painting. For singing/dancing actual 1 min will do. Social service you can show for 2 mins`,
        },
        {
          title: `Gmail`,
          content: `post your videos and all the presentation to suretrustlifeskills99@gmail.com incase you are not able to upload it in the form itself.`,
        },
        {
          title: `Subject line`,
          content: `Talent show name / skill name/ social service title should be mentioned`,
        },
        {
          title: `Presentation format`,
          content: `ntroduce your name, Univ degree, suretrust course, title of your presentation and then go ahead with your video. If you are writing an article/ story / poem then you need to have these details in your presentation document itself`,
        },
        {
          title: `Photo`,
          content: `You need to also send your small passport size photo which can be taken at home itself. 3.5 by 3.5 cm . It should be a decent formal and a well groomed one. Also your photo file should be saved under your full name. so when you upload your photo from PC then your file should have your name. When we collect your photos in our drive, it will be easy for us to match your name to your photo. Please follow all these instructions.`,
        },
        {
          title: `File name`,
          content: `All your photo image, audio and video files should start with full name and course at suretrust Eg. Lakshmi Suresh_ Datascience`,
        },
      ],
    },
  };
}
