import BreadCrumb from "@/components/breadcrumb";
import { columns } from "@/components/tables/employee-tables/columns";
import { EmployeeTable } from "@/components/tables/employee-tables/employee-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";

const breadcrumbItems = [{ title: "Staffs", link: "/dashboard/staffs" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
      (country ? `&search=${country}` : "")
  );

  const resUsers = await axios.get("http://localhost:3000/api/users");
  console.log(resUsers.data);

  //STAFFS DATA FROM DATABASE
  const staffs = resUsers.data.users;
  const totaStaffs = staffs.length;

  const employeeRes = await res.json();
  const totalUsers = employeeRes.total_users; //1000
  const pageCount = Math.ceil(totaStaffs / pageLimit);
  const employee: Employee[] = employeeRes.users;
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Staffs (${totaStaffs})`}
            description="Manage Staffs"
          />

          <Link
            href={"/dashboard/employee/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <EmployeeTable
          searchKey="Name"
          pageNo={page}
          columns={columns}
          totalUsers={totaStaffs}
          data={staffs}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
