"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const CategoryDeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/categories/${id}`
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message, {
          duration: 5000,
        });
        // router.push("/dashboard/categories");
        window.location.reload();
      }
    } catch (error) {
      toast.error("An error occurred while deleting the category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant={"destructive"} onClick={handleDelete} disabled={isLoading}>
      {isLoading ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default CategoryDeleteButton;
