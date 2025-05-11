import { env } from "@/lib/env";
import type { Route } from "./+types/cloudinary";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const files = formData.getAll("files[]");

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`;
  const uploadPreset = env.CLOUDINARY_UPLOAD_PRESET!;

  const uploads: { publicId: any; url: any }[] = [];

  for (const file of files) {
    if (!(file instanceof File)) continue;

    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("upload_preset", uploadPreset);

    const res = await fetch(cloudinaryUrl, {
      method: "POST",
      body: cloudForm,
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "One or more uploads failed" }),
        { status: 500 }
      );
    }

    const data = await res.json();
    uploads.push({ publicId: data.public_id, url: data.secure_url });
  }

  return uploads;
}
