import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Detect Face API Working",
  });
}

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    const formData = new URLSearchParams();

    formData.append(
      "api_key",
      process.env.FACE_API_KEY!
    );

    formData.append(
      "api_secret",
      process.env.FACE_API_SECRET!
    );

    formData.append(
      "image_url",
      imageUrl
    );

    formData.append(
      "return_attributes",
      "gender,age"
    );

    const response = await fetch(
      "https://api-us.faceplusplus.com/facepp/v3/detect",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log("FACE++ RESPONSE:", data);

    return NextResponse.json(data);
  } catch (error) {
  console.error("FACE++ ERROR:", error);

  return NextResponse.json(
    {
      error: String(error),
    },
    { status: 500 }
  );
}
}