"use client";

import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { set } from "date-fns";
const CommentForm = (id: any) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const comment = formData.get("comment");
    console.log(comment);
    try {
      const response = await axios.post(`/api/ideas/${id.id}/comments`, {
        text: comment,
      });
      // Handle response and error
      if (response.status === 200) {
        setLoading(false);
        toast.success("Comment submitted successfully");
        // Handle success
        router.refresh();
        // const data = await response.json();
        // ...
      } else {
        // Handle error
        toast.error(response.data.error);
        console.error("Error:", response.data.error);
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Textarea
        className="resize-none"
        placeholder="Write your comment..."
        name="comment"
      />
      <div className="flex items-center justify-end">
        <Button size="sm" type="submit">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
