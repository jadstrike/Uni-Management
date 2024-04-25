import CategoryForm from "@/components/forms/categories/category-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/components/breadcrumb";
import DepartmentForm from "@/components/forms/departments/department-form";

const breadcrumbItems = [
  { title: "Departments", link: "/dashboard/departments" },
  { title: "Add Department", link: "/dashboard/department/add" },
];
const page = () => {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <DepartmentForm />
      </div>
    </ScrollArea>
  );
};

export default page;
