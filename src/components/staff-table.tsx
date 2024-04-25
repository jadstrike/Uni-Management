"use client";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

interface Staff {
  id: string;
  name: string;
  email: string;
  password: string;

  role: string;
  isBanned: boolean;
  department: { name: string };
}

export function StaffTable(staffs: { staffs: Staff[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //BAN USER
  const banUser = async (id: string) => {
    toast.loading("Banning user...");
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}/ban`, {
        method: "PUT",
      });

      const respone = res.json();
      console.log(respone);

      toast.success("User has been banned");
      router.refresh();
      toast.dismiss();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  //Unban User
  const unbanUser = async (id: string) => {
    toast.loading("Unbanning user...");
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}/unban`, {
        method: "PUT",
      });

      const respone = res.json();
      console.log(respone);

      toast.success("User has been unbanned");
      router.refresh();
      toast.dismiss();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  // console.log(staffs.staffs);
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffs.staffs.map((staff: any) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">{staff.name}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>
                  {staff.department !== null && staff.department !== undefined
                    ? staff.department.name
                    : "No Department"}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {staff.isBanned ? (
                    <Button
                      onClick={() => unbanUser(staff.id)}
                      size="sm"
                      variant="outline"
                    >
                      Unban
                    </Button>
                  ) : (
                    <Button
                      onClick={() => banUser(staff.id)}
                      color="red"
                      size="sm"
                      variant="outline"
                    >
                      {loading ? "Banning..." : "Ban"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
