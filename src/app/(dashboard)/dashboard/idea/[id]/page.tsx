import BreadCrumb from "@/components/breadcrumb";
import { ProductForm } from "@/components/forms/idea-form";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Edit2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormEvent } from "react";
import axios from "axios";
import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BoardColumn } from "@/components/kanban/board-column";
import { toast } from "sonner";
import CommentForm from "@/components/forms/comments/comment-form";
import DeleteComment from "@/components/forms/comments/delete-comment";
import { Separator } from "@/components/ui/separator";

type Category = {
  ideaId: string;
  categoryId: string;
  category: object; // Replace with the actual type if known
};
type comments = {
  id: string;
  text: string;
  createdAt: string;
  ideaId: string;
  userId: string;
  isHidden: boolean;
  isByAnonymous: boolean;
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
  ratio: number;
  viewCount: number;

  isHidden: boolean;
  isByAnonymous: boolean;
  categories: Category[];
  comments: comments[];
};

async function getPostById(id: string) {
  const response = await axios.get(`http://localhost:3000/api/ideas/${id}`);
  return response.data;
}

export default async function Page({ params }: any) {
  // console.log(params);
  const id = params.id;
  const idea = await getPostById(id);
  console.log(idea);
  const isImage = /\.(jpe?g|png|gif|bmp|svg)$/i.test(idea.file);

  const breadcrumbItems = [
    { title: "Ideas", link: "/dashboard/idea" },
    { title: "Details", link: "/dashboard/idea/" },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {isImage ? (
              <Image
                src={idea.file}
                alt={idea.title}
                width={600}
                height={400}
              />
            ) : (
              <div className="h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                No image
              </div>
            )}
            {idea.file ? (
              <Link href={idea.file}>
                <Badge
                  variant={"secondary"}
                  className=" mt-2 text-lg  text-blue-600"
                >
                  Click to view File Attachment
                </Badge>
              </Link>
            ) : (
              <Badge
                variant={"secondary"}
                className=" mt-2 text-lg  text-blue-600"
              >
                No Attachment
              </Badge>
            )}
            <div className="flex my-2 space-x-2">
              {idea.categories.map((category: Category) => (
                <span
                  key={category.categoryId}
                  className="bg-blue-100 text-blue-800   font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                >
                  {category.category.name}
                </span>
              ))}
            </div>
            <Separator />
            <div className=" mt-3">
              <h1 className="text-3xl font-bold mb-4">{idea.title}</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                {idea.content}
              </p>
            </div>
          </div>
          <div>
            {/* <h1 className="text-3xl font-bold mb-4">{idea.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              {idea.content}
            </p> */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
              <h2 className="text-xl font-bold mb-4">Comments</h2>
              <div className="space-y-6">
                {idea.comments.map((comment: any) => (
                  <div key={comment.id} className="flex items-start gap-4">
                    <div className="flex-1 border-2 border-gray-300 p-2 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">
                          {comment.isByAnonymous
                            ? "Anonymous"
                            : comment.user.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          1 week ago
                        </div>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400">
                        {comment.text}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button className=" " size="sm" variant="ghost">
                          <Edit2Icon className="h-4 w-4 " />
                          <p className=" pl-2">Edit</p>
                        </Button>
                        {/* <Button size="sm" variant="ghost">
                          <ReplyIcon className="h-4 w-4" />
                          Reply
                        </Button> */}
                        <DeleteComment id={idea.id} comment={comment.id} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Add a Comment</h3>
                {/* <form action={onSubmit} className="grid gap-4">
                  <Textarea
                    className="resize-none"
                    placeholder="Write your comment..."
                    name="comment"
                  />
                  <div className="flex items-center justify-end">
                    <Button size="sm" type="submit">
                      Submit
                    </Button>
                  </div>
                </form> */}
                <CommentForm id={idea.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
function ReplyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}

function ThumbsUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
