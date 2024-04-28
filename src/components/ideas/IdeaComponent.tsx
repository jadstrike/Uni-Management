"use client";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import axios from "axios";
import { format } from "date-fns";
import { ScrollArea } from "../ui/scroll-area";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import next from "next";
import { useState } from "react";

interface Category {
  ideaId: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
}

interface Idea {
  id: string;
  title: string;
  createdAt: string;
  content: string;
  authorId: string;
  author: {
    name: string;
  };
  file: string;
  thumbsUp: number;
  thumbsDown: number;
  isHidden: boolean;
  isByAnonymous: boolean;
  categories: Category[];
}

interface IdeaComponentProps {
  ideas: { ideas: Idea[] };
}
const formSchema = z.object({
  message: z.string().min(2).max(200),
  id: z.string(),
});

const IdeaComponent: React.FC<IdeaComponentProps> = (data) => {
  const router = useRouter();
  const pageSize = 5;

  const totalIdeas = data.ideas.ideas.length;
  const totalPages = Math.ceil(totalIdeas / pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastIdea = currentPage * pageSize;
  const indexOfFirstIdea = indexOfLastIdea - pageSize;

  // Get the current ideas to display
  const currentIdeas = data.ideas.ideas.slice(
    indexOfFirstIdea,
    indexOfLastIdea
  );

  // Function to handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  //THUMBS UP AND THUMBS DOWN FUNCTIONALITY
  const thumbsUp = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/ideas/${id}/tup`
      );
      // alert(response.data.message);
      toast.success(response.data.message, {
        duration: 5000,
      });
      router.refresh();

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to thumb up idea", {
        duration: 5000,
      });
    }
    // revalidatePath("/dashboard/idea");
  };

  const thumbsDown = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/ideas/${id}/tdown`,
        {
          next: {
            revalidate: true,
          },
        }
      );
      // alert(response.data.message);
      toast.success(response.data.message, {
        duration: 5000,
      });
      // window.location.reload();
      router.refresh();
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to thumb down idea", {
        duration: 5000,
      });
    }
  };

  const reportIdea = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/ideas/${values.id}/report`,
        {
          message: values.message,

          // add more data if needed
        }
      );
      toast.success("Idea reported successfully", {
        duration: 5000,
      });
    } catch (error) {
      console.error(error);
      toast.error(
        "Idea could not be reported, Something wrong with the server",
        {
          duration: 5000,
        }
      );
    }
    // const response = await axios.post(`/api/ideas/${id}/report`);
    // if (response.status === 200) {
    //   toast.success("Idea reported successfully", {
    //     duration: 5000,
    //   });
    // }
    // if (response.status !== 200) {
    //   toast.error(
    //     "Idea could not be reported, Something wrong with the server",
    //     {
    //       duration: 5000,
    //     }
    //   );
    // }
  };

  // console.log("From Idea Component");
  // console.log(data);
  return (
    <ScrollArea className="h-full">
      <Toaster position="top-center" richColors />
      <div className="w-full px-4 py-8 sm:px-6 md:max-w-6xl md:mx-auto md:py-12">
        <h1 className="text-3xl font-bold mb-6"> All Ideas</h1>
        <p className="text-center mb-4">
          Page {currentPage} of {totalPages} (Showing {pageSize} ideas per page)
        </p>
        <div className="grid gap-8">
          {currentIdeas.map((idea: Idea) => (
            <div
              key={idea.id}
              className="bg-white border-2 border-gray-400 rounded-lg shadow-md overflow-hidden dark:bg-gray-800"
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row  items-center justify-between mb-4">
                  <div className="flex  space-x-2">
                    {idea.categories.map((category: Category) => (
                      <span
                        key={category.categoryId}
                        className="bg-blue-100 text-blue-800   font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                      >
                        {category.category.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center mt-4 sm:mt-0 space-x-4">
                    <Button
                      onClick={() => thumbsUp(idea.id)}
                      size="icon"
                      variant="ghost"
                    >
                      <ThumbsUpIcon className="w-5 h-5" />
                      <span className="ml-2">{idea.thumbsUp}</span>
                    </Button>
                    <Button
                      onClick={() => thumbsDown(idea.id)}
                      size="icon"
                      variant="ghost"
                    >
                      <ThumbsDownIcon className="w-5 h-5" />
                      <span className="ml-2">{idea.thumbsDown}</span>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => form.setValue("id", idea.id)}
                          className=" text-red-500"
                          variant="outline"
                        >
                          Report
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(reportIdea)}
                            className="space-y-8 w-full"
                          >
                            <DialogHeader>
                              <DialogTitle>
                                Write a report message for
                              </DialogTitle>
                              <DialogDescription>
                                {idea.title}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className=" items-center gap-4">
                                <FormField
                                  control={form.control}
                                  name="message"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className=" text-lg">
                                        Message
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          id="message"
                                          className="col-span-3"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Send</Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                    {/* <Button variant="destructive">
                      <span>Report</span>
                    </Button> */}
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-2">{idea.title}</h1>
                <h2 className="text-sm text-gray-500 mb-2">
                  Uploaded by {idea.author.name}
                </h2>
                <p className=" mb-4">{idea.content}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <Link
                    className="text-blue-500 hover:underline"
                    href={idea.file === null ? "#" : idea.file}
                  >
                    {idea.file === null ? "No Attachment" : "Attachment"}
                  </Link>
                  <span className="text-gray-500 dark:text-gray-400">
                    {format(new Date(idea.createdAt), "MM/dd/yyyy")}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4"></div>
                <Link href={`/dashboard/idea/${idea.id}`}>
                  <Button
                    className=" dark:bg-green-100 dark:text-black"
                    variant="outline"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center md:flex-row flex-col space-x-4 mt-8">
          <Button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            disabled={currentPage * pageSize >= data.ideas.ideas.length}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

function FlagIcon(props: any) {
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
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function ThumbsDownIcon(props: any) {
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
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
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

export default IdeaComponent;
