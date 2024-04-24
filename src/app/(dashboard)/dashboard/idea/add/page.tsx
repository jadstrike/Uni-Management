"use client";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
  title: z.string().min(2).max(30, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "content must be at least 2 characters.",
  }),
  file:
    typeof FileList !== "undefined"
      ? z.instanceof(FileList).optional()
      : z.unknown().optional(),

  category: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .nonempty({ message: "At least one category is required" }),
});

interface Category {
  id: string;
  name: string;
}

export default function AddIdea() {
  const supabase = createClientComponentClient();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("file");

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

  //FOR FILE UPLOAD
  // Handle file upload event
  const uploadFile = async (userfile: any) => {
    console.log(userfile);
    const file = userfile[0];

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
    // console.log(url);
    toast.success("File uploaded successfully!", {
      duration: 5000,
    });
    return url;

    // await fetch("http://localhost:3000/api/documents", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: url,
    // });

    // alert("File uploaded successfully!");
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const selectedCategories = [];
    for (const category of values.category) {
      selectedCategories.push(category.value);
    }

    const file = values.file;
    const fileData = await uploadFile(file);
    console.log("File Data" + fileData);
    console.log(selectedCategories);

    try {
      const response = await axios.post(`http://localhost:3000/api/ideas`, {
        title: values.title,
        content: values.content,
        categories: selectedCategories,
        file: fileData,

        // add more data if needed
      });
      console.log(response.data);
      // alert(response.data.message);
      toast.success(response.data.message, {
        duration: 5000,
      });
      // <Toaster richColors />;
      form.reset();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <div className="w-full px-4 py-8 sm:px-6 md:max-w-md md:mx-auto md:py-12">
          <h1 className="text-3xl font-bold mb-6">Add New Idea</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a title for your idea"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[120px]"
                        placeholder="Describe your idea"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attachment</FormLabel>
                    <FormControl>
                      <Input
                        onChange={(event) => {
                          field.onChange(event.target?.files?.[0] ?? undefined);
                        }}
                        {...fileRef}
                        type="file"
                      />
                    </FormControl>
                    o
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    {/* <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    > */}
                    <Select
                      id="category"
                      {...field}
                      isMulti
                      name="category"
                      options={categories.map((category) => ({
                        value: category.id,
                        label: category.name,
                      }))}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                    {/* <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger> */}
                    {/* <SelectContent>
                        {categories.map((category, index) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                Submit Idea
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </ScrollArea>
  );
}
