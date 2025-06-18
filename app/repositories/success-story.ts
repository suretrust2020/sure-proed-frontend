import { connectToMongo } from "@/lib/mongodb/connections";
import {
  SuccessStory,
  type SuccessStoryType,
} from "@/lib/mongodb/models/success-story";
import { fetchCourseById } from "./courses";

export async function createSuccessStory(
  data: Omit<SuccessStoryType, "_id" | "createdAt" | "updatedAt">
) {
  await connectToMongo();
  const result = await SuccessStory.create(data);
  return result as SuccessStoryType;
}

export const getSuccessStories = async ({
  limit = 10,
  page,
}: {
  page: number;
  limit: number;
}) => {
  await connectToMongo();

  const skip = (page - 1) * limit;
  const filters: any = {
    status: "approved",
  };

  const [results, total] = await Promise.all([
    SuccessStory.find(filters)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean(),
    SuccessStory.countDocuments(filters),
  ]);

  const items = await Promise.all(
    results.map(async (result: any) => ({
      ...result,
      _id: result._id.toString(),
      course: await fetchCourseById(result.course),
    }))
  );

  const hasMore = skip + results.length < total;

  return {
    items,
    total,
    hasMore,
  };
};

export const getSuccessStory = async (id?: string) => {
  await connectToMongo();
  const result = await SuccessStory.findById(id).lean<SuccessStoryType>();
  if (!result) return null;
  return {
    ...result,
    _id: result._id?.toString(),
  };
};
