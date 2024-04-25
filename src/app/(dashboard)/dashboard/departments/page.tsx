"use client";

import BreadCrumb from "@/components/breadcrumb";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import CategoryDeleteButton from "@/components/forms/categories/category-delete-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import { cn } from "@/lib/utils";
import { get } from "http";
import Link from "next/link";
import axios from "axios";
import { Key } from "react";
import { Toaster, toast } from "sonner";
import CategoryEditButton from "@/components/forms/categories/category-edit-button";
import { id, tr } from "date-fns/locale";
import PageLoading from "../loading";

interface Department {
  id: string;
  name: string;
}
// async function getCategories() {
//   const response = await fetch("http://localhost:3000/api/categories", {
//     method: "GET",
//   });

//   return response.json();
// }

// const handleDelete = async (id: String) => {
//   const response = await axios.delete(
//     `http://localhost:3000/api/categories/${id}`
//   );
//   if (response.status === 200) {
//     toast.success("Category deleted successfully");
//     window.location.reload();
//   }
// };

// const CategoryDelete = (id: String) => {
//   const res = handleDelete(id);
// };

const breadcrumbItems = [
  { title: "Departments", link: "/dashboard/department" },
];

const formSchema = z.object({
  name: z.string().min(2).max(50),
  id: z.string(),
});

const Departments = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.name);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/categories/${values.id}`,
        {
          name: values.name,

          // add more data if needed
        }
      );
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
      alert("An error occurred. Please try again.");
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      // "use server";
      const response = await axios.get("http://localhost:3000/api/departments");
      setDepartments(response.data.departments);

      setLoading(false);
    };

    fetchDepartments();
  }, []);
  // const deleteCategoey = async (id: string) => {
  //   const response = await axios.put(
  //     `http://localhost:3000/api/categories/${id}`
  //   );
  //   if (response.status === 200) {
  //     toast.success("Category deleted successfully");
  //     window.location.reload();
  //   }
  // };

  // const updateCatrgory = async (id: string, name: string) => {
  //   const response = await axios.put(
  //     `http://localhost:3000/api/categories/${id}`,
  //     { name }
  //   );
  //   if (response.status === 200) {
  //     toast.success("Category updated successfully");
  //     window.location.reload();
  //   }
  // };

  // const response = await axios.get("http://localhost:3000/api/categories");
  return loading ? (
    <div className=" flex justify-center items-center h-full w-full ">
      <h2>Loading.....</h2>
    </div>
  ) : (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Departments (${departments.length})`}
            description="Departments submitted by QA Manager"
          />

          <Link
            href={"/dashboard/departments/add"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <main>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {departments.map((department: Department, index: Key) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => form.setValue("id", department.id)}
                    variant="outline"
                  >
                    {department.name}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8 w-full"
                    >
                      <DialogHeader>
                        <DialogTitle>Department Edit Form</DialogTitle>
                        <DialogDescription>Editing as a QA</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className=" w-full gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className=" text-lg">
                                  Category: {department.name}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Type new name to edit"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                        <CategoryDeleteButton id={department.id} />
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Departments;
