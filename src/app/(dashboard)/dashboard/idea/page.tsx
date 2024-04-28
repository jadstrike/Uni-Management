import BreadCrumb from "@/components/breadcrumb";
import { cookies } from "next/headers";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { isToday } from "date-fns";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import axios from "axios";
import IdeaComponent from "@/components/ideas/IdeaComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClosureDate from "@/components/closure/ClosureDate";
import { any } from "zod";

interface Idea {
  id: String;
  title: string;
  createdAt: string;
  content: string;
  authorId: string;
  file: string;
}
// import { users } from "@/constants/data";
async function getIdeas() {
  const response = await axios.get("http://localhost:3000/api/ideas");

  return response.data;
}

async function getClosureDate() {
  const response = await axios.get("http://localhost:3000/api/ideas/closure");
  return response.data;
}

const breadcrumbItems = [{ title: "Ideas", link: "/dashboard/user" }];
export default async function Page() {
  const cookieStore = cookies();

  const role = cookieStore.get("role");
  const userRole = role?.value;
  console.log(userRole);
  // const [userRole, setUserRole] = useState<string | undefined>(undefined);

  // useEffect(() => {
  //   // Get the user's role from cookies when the component mounts
  //   const role = getCookie("role");
  //   setUserRole(role);
  // }, []);
  const data = await getIdeas();
  const resDate = await getClosureDate();
  // const ideas = await getRecipes();
  // const ideas = await fetch("/api/ideas", {
  //   method: "GET",
  // });
  const closureDate = new Date(resDate.closure[0].finalClosureDate);
  const isClosureDateToday = isToday(closureDate);
  console.log(isClosureDateToday);

  return (
    <>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <BreadCrumb items={breadcrumbItems} />
          <div className="flex items-start justify-between">
            <Heading
              title={`Ideas (${data.ideas.length})`}
              description="Ideas submitted by employees for the university."
            />

            <Link
              href={isClosureDateToday ? "#" : "/dashboard/idea/add"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <Plus className="mr-2 h-4 w-4" />
              {isClosureDateToday ? "Passed closure date" : "Add New"}
            </Link>
          </div>
          <Separator />
          <div className=" text-red-500">Closure Date</div>
          <div className="text-lg text-blue-400">{closureDate.toString()}</div>
          {userRole === "Admin" && <ClosureDate closure={resDate.closure} />}
          <main>
            <IdeaComponent ideas={data} userRole={userRole} />
          </main>
        </div>
      </ScrollArea>
    </>
  );
}
