import { COMMUNITY_SERVICES } from "@/lib/constant";
import { daysAgo } from "@/lib/date-time";
import { env } from "@/lib/env";
import { connectToMongo } from "@/lib/mongodb/connections";
import { Plantations } from "@/lib/mongodb/models/plantations";
import type {
  CommunityService,
  CommunityServiceStats,
  PaginatedResp,
  PlantationType,
} from "@/lib/types";
import {
  calculateTimeDifferenceFromNow,
  convertDaysToYears,
} from "@/lib/utils";

async function fetchPlantationData() {
  await connectToMongo();
  const data = await Plantations.aggregate([
    {
      $group: {
        _id: "$course",
        count: { $sum: "$plants" },
        users: { $push: "$user" },
      },
    },
  ]);

  return data.map((d) => ({
    ...d,
  })) as { _id: string; count: number; users: string[] }[];
}

async function fetchPlantationStats() {
  await connectToMongo();
  const volunteers = await Plantations.estimatedDocumentCount();
  const data = await Plantations.find().select("plants");

  let plants = data.reduce((prev, curr) => prev + curr?.plants!, 0);
  const diffDays = calculateTimeDifferenceFromNow(
    COMMUNITY_SERVICES.plantationStartTimestamp
  );

  return {
    volunteers,
    plants,
    start: diffDays,
  };
}

async function fetchPlantationById(id: string) {
  const data = await Plantations.find({
    course: id,
  });
  return data.map((d) => ({
    ...d._doc,
    _id: d._id.toString(),
    createdAt: d?.createdAt?.toISOString(),
    updatedAt: d?.updatedAt?.toISOString(),
    images: d.images.map((image: any) => ({
      ...image._doc,
      _id: d._id.toString(),
    })),
  })) as PlantationType[];
}

async function fetchBloodDonationStats() {
  try {
    const resp = await fetch(
      `${env.BASEURL}/community/blood_donate_course_count`
    );
    const data = await resp.json();
    const start = calculateTimeDifferenceFromNow(
      COMMUNITY_SERVICES.bloodDonationsStartTimestamp
    );

    const courses = data.Result as CommunityServiceStats[];
    const volunteers = courses.reduce((prev, acc) => prev + acc.count, 0);
    return {
      courses,
      start,
      volunteers,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchBloodDonation(page: number, courseName: string) {
  try {
    const url = new URL(`${env.BASEURL}/community/blood_donate/`);
    url.searchParams.set("course_name", courseName);
    url.searchParams.set("page", String(page));
    const resp = await fetch(url);
    const data = await resp.json();
    return data as PaginatedResp<CommunityService>;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchSeniorCitizensStats() {
  try {
    const resp = await fetch(
      `${env.BASEURL}/community/senior_citizen_course_count`
    );
    const data = await resp.json();
    const start = calculateTimeDifferenceFromNow(
      COMMUNITY_SERVICES.seniorCitizenStartTimestamp
    );
    const courses = data.Result as CommunityServiceStats[];
    const volunteers = courses.reduce((prev, acc) => prev + acc.count, 0);
    return {
      courses,
      start,
      volunteers,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function fetchSeniorCitizens(page: number, courseName: string) {
  try {
    const url = new URL(`${env.BASEURL}/community/senior_citizen/`);
    url.searchParams.set("course_name", courseName);
    url.searchParams.set("page", String(page));
    const resp = await fetch(url);
    const data = await resp.json();
    return data as PaginatedResp<CommunityService>;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export {
  fetchPlantationData,
  fetchPlantationStats,
  fetchPlantationById,
  fetchBloodDonationStats,
  fetchBloodDonation,
  fetchSeniorCitizensStats,
  fetchSeniorCitizens,
};
