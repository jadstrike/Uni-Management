import CategoryForm from "@/components/forms/categories/category-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/components/breadcrumb";

const breadcrumbItems = [
  { title: "Categories", link: "/dashboard/categories" },
  { title: "Add Category", link: "/dashboard/catrgories/add" },
];
const page = () => {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <CategoryForm />
      </div>
    </ScrollArea>
  );
};

export default page;
