import BreadCrumb from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import CategoryDeleteButton from "@/components/forms/categories/category-delete-button";
import { Plus } from "lucide-react";
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
import { toast } from "sonner";

interface Category {
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

const breadcrumbItems = [{ title: "Categories", link: "/dashboard/category" }];

const Categories = async () => {
  "use server";
  const response = await axios.get("http://localhost:3000/api/categories");
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Categories (${response.data.categories.length})`}
            description="Categories submitted by QA Manager"
          />

          <Link
            href={"/dashboard/categories/add"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <main>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {response.data.categories.map((category: Category, index: Key) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Button variant="outline">{category.name}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Category Form</DialogTitle>
                    <DialogDescription>Editing as a QA</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue={category.name}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>

                    {/* <Button
                      onClick={() => CategoryDelete(category.id)}
                      variant={"destructive"}
                    >
                      Delete
                    </Button> */}
                    <CategoryDeleteButton id={category.id} />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Categories;
