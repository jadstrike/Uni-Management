import BreadCrumb from "@/components/breadcrumb";
import { ProductForm } from "@/components/forms/idea-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

type Category = {
  ideaId: string;
  categoryId: string;
  category: object; // Replace with the actual type if known
};

type IdeaDetails = {
  id: string;
  title: string;
  createdAt: string;
  content: string;
  authorId: string;
  file: string;
  thumbsUp: number;
  thumbsDown: number;
  isHidden: boolean;
  isByAnonymous: boolean;
  categories: Category[];
};

async function getPostById(id: string): Promise<IdeaDetails> {
  const response = await fetch(`http://localhost:3000/api/ideas/${id}`, {
    method: "GET",
  });
  return response.json();
}

export default async function Page({ params }: any) {
  console.log(params);
  const id = params.id;
  const idea = await getPostById(id);
  console.log(idea);

  const breadcrumbItems = [
    { title: "Ideas", link: "/dashboard/idea" },
    { title: "Create", link: "/dashboard/idea/create" },
  ];
  return (
    <ScrollArea className="h-full">
      <div>{idea.title}</div>
    </ScrollArea>
  );
}
