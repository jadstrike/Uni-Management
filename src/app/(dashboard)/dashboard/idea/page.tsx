import BreadCrumb from "@/components/breadcrumb";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface Idea {
  id: String;
  title: string;
  createdAt: string;
  content: string;
  authorId: string;
}
// import { users } from "@/constants/data";
async function getIdeas() {
  const response = await fetch("http://localhost:3000/api/ideas", {
    method: "GET",
  });

  return response.json();
}

const breadcrumbItems = [{ title: "Ideas", link: "/dashboard/user" }];
export default async function page() {
  // const ideas = await getRecipes();
  // const ideas = await fetch("/api/ideas", {
  //   method: "GET",
  // });
  const data = await getIdeas();
  console.log(typeof data);
  console.log(data);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Ideas (${data.ideas.length})`}
            description="Ideas submitted by employees for the university."
          />

          <Link
            href={"/dashboard/idea/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <main>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {data.ideas.map((idea: Idea, index: Number) => (
              <Card key={1} className="flex flex-col justify-between">
                <CardHeader className="flex-row gap-4 items-center">
                  <div>
                    <CardTitle>{idea.title}</CardTitle>
                    {/* <CardDescription>
                      {idea.time} mins to cook.
                    </CardDescription> */}
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{idea.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button>Read Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
