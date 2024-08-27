import { createUploadthing, type FileRouter } from "uploadthing/next";

// Create an instance of Uploadthing
const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // Since anyone can upload, simply return default metadata or remove middleware entirely
      return {}; // No auth, anyone can upload
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete");
      console.log("file url", file.url);
      // Return any data you want to send back to the client
      return { uploadedBy: "Anonymous", fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
