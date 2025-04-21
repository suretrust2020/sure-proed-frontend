export type UserType = {
  name: string;
  bio: string;
  imageUrl: string;
  category: string;
};

export type GuidelinesType = {
  title: string;
  headerText: string;
  footerText: string;
  lists: {
    title: string;
    content: string;
  }[];
};
