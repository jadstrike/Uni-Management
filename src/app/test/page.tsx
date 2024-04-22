"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Profile() {
  const supabase = createClientComponentClient();

  // Handle file upload event
  const uploadFile = async (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    const bucket = "files";

    // Call Storage API to upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(file.name, file);

    // Handle error if upload failed
    if (error) {
      alert("Error uploading file.");
      return;
    }

    const document = supabase.storage.from("files").getPublicUrl(data.path);
    const url = document.data.publicUrl;
    console.log(url);

    // await fetch("http://localhost:3000/api/documents", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: url,
    // });

    alert("File uploaded successfully!");
  };

  return (
    <div>
      <h1>Upload File</h1>
      <input type="file" onChange={uploadFile} />
    </div>
  );
}
