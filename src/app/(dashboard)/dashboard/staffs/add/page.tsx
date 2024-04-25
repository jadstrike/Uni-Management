"use client";
import Select, { GroupBase } from "react-select";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BreadCrumb from "@/components/breadcrumb";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { useEffect, useState } from "react";

const AddStaff = () => {
  interface Department {
    id: string;
    name: string;
  }
  interface Role {
    id: string;
    name: string;
  }
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const roles = [
    { value: "Admin", label: "Admin" },
    { value: "Staff", label: "Staff" },
    { value: "QA_Manager", label: "QA_Manager" },
    { value: "QA_Coordinator", label: "QA_Coordinator" },
  ];

  const formSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long." })
      .max(50, { message: "Username must not exceed 50 characters." }),

    email: z.string().email({ message: "Invalid email address." }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(100, { message: "Password must not exceed 100 characters." }),

    role: z.object({
      value: z.string(),
      label: z.string(),
    }),

    departmentId: z.object({
      value: z.string(),
      label: z.string(),
    }),
  });

  const breadcrumbItems = [
    { title: "Staffs", link: "/dashboard/staffs" },
    { title: "Add new staff", link: "/dashboard/staffs/add" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Add default values
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: { value: "Staff", label: "Staff" },
      departmentId: { value: "", label: "" },
    },
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDepartments(data.departments);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitting(true);

    try {
      const response = await axios.post(`http://localhost:3000/api/signup`, {
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role.value,
        departmentId: values.departmentId.value,

        // add more data if needed
      });
      console.log(response.data);
      // alert(response.data.message);
      toast.success(response.data.message, {
        duration: 5000,
      });
      // <Toaster richColors />;
      form.reset();
    } catch (error: any) {
      console.error(error);
      toast.error(error, {
        duration: 5000,
      });
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <div className="w-full px-4 py-8 sm:px-6 md:max-w-md md:mx-auto md:py-12">
          <h1 className="text-3xl font-bold mb-6">Add New Staff</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name of the Staff" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email of the Staff"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passowrd for the staff to log in</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter passowrd for the staff"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    {/* <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    > */}
                    <Select
                      id="role"
                      {...field}
                      name="role"
                      className="basic-single"
                      options={roles}
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

              <FormField
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    {/* <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    > */}
                    <Select
                      id="department"
                      {...field}
                      name="department"
                      options={departments.map((department) => ({
                        value: department.id,
                        label: department.name,
                      }))}
                      className="basic-single"
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
                Submit new staff
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </ScrollArea>
  );
};

export default AddStaff;
