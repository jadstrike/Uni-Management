"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";
import { z } from "zod";
import BreadCrumb from "@/components/breadcrumb";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";

const breadcrumbItems = [
  { title: "Ideas", link: "/dashboard/idea" },
  { title: "Add new idea", link: "/dashboard/catrgories/add" },
];
const formSchema = z.object({
  title: z.string().min(2).max(50),
  content: z.string().min(2),
  file: z.string(),
  category: z.string(),
});

interface Category {
  id: string;
  name: string;
}

export default function AddIdea() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(categories);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      file: "",
      category: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      // "use server";
      const response = await axios.get("http://localhost:3000/api/categories");
      setCategories(response.data.categories);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get("/api/categories");
  //     console.log(response.data.categories);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="flex-1 space-y-4 p-5">
      <BreadCrumb items={breadcrumbItems} />
      <div className="w-full px-4 py-8 sm:px-6 md:max-w-md md:mx-auto md:py-12">
        <h1 className="text-3xl font-bold mb-6">Add New Idea</h1>
        <Form {...form}>
          <form className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter a title for your idea" />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                className="min-h-[120px]"
                id="content"
                placeholder="Describe your idea"
              />
            </div>
            <div>
              <Label htmlFor="file">Attachment</Label>
              <Input id="file" type="file" />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" type="submit">
              Submit Idea
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
