"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
const DeleteComment = (props: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const DeleteComment = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/ideas/${props.id}/comments/${props.comment}`
      );

      if (response.status === 200) {
        setLoading(false);
        toast.success("Comment deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete comment");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to delete comment");
      console.error("Error:", error);
    }
  };
  return (
    <Button
      onClick={() => DeleteComment()}
      className="ml-auto"
      size="sm"
      variant="ghost"
    >
      <Trash className="h-4 w-4" />
      {loading ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteComment;
