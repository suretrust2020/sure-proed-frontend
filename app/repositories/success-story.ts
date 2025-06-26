import { connectToMongo } from "@/lib/mongodb/connections";
import {
  SuccessStory,
  type SuccessStoryType,
} from "@/lib/mongodb/models/success-story";
import type { ApprovalStatus } from "@/lib/types";

export async function createSuccessStory(
  data: Omit<SuccessStoryType, "_id" | "createdAt" | "updatedAt">
) {
  await connectToMongo();
  const result = await SuccessStory.create(data);
  return result as SuccessStoryType;
}

export const getSuccessStories = async ({
  limit = 10,
  page = 1,
  roles,
  status,
}: {
  page?: number;
  limit?: number;
  roles?: string[];
  status?: ApprovalStatus;
} = {}) => {
  await connectToMongo();

  const skip = (page - 1) * limit;
  const filters: any = {};

  if (roles?.length) {
    filters.role = {
      $in: roles,
    };
  }
  if (status) {
    filters.status = status;
  }

  const [results, total] = await Promise.all([
    SuccessStory.find(filters)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean<SuccessStoryType[]>(),
    SuccessStory.countDocuments(filters),
  ]);

  const items = results.map((result) => ({
    ...result,
    _id: result._id?.toString(),
  }));

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

export const updateSuccessStories = async (
  project: Partial<
    Omit<SuccessStoryType, "_id" | "createdAt" | "updatedAt"> & {
      id: string;
    }
  >
) => {
  await connectToMongo();

  const { id, ...updateFields } = project;
  if (!id) return null;

  const updated = await SuccessStory.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true }
  ).lean();

  return updated;
};

type BulkUpdateProjectInput = Partial<
  Omit<SuccessStoryType, "_id" | "createdAt" | "updatedAt">
>;
export const bulkUpdateSuccessStories = async (
  ids: any[],
  project: BulkUpdateProjectInput
) => {
  await connectToMongo();
  if (!ids.length) return null;

  const updated = await SuccessStory.updateMany(
    { _id: { $in: ids } },
    { $set: project }
  ).lean();

  return updated;
};
