// const fetch = require("node-fetch");

exports.handler = async (event : any) => {
  const HUGGING_FACE_TOKEN = process.env.HUGGING_FACE_TOKEN;

  // Check if this is a POST request
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const fileBuffer = Buffer.from(event.body, "base64");
    const contentType = event.headers["content-type"];

    console.log("api calling from transcribe...")

    const response = await fetch(
      "https://api-inference.huggingface.co/models/openai/whisper-large-v3",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_TOKEN}`,
          "Content-Type": contentType,
        },
        body: fileBuffer,
      }
    );

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
