"use client";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Edit2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { text } from "stream/consumers";

const EditCommentForm = (props: any) => {
  const router = useRouter();
  const formSchema = z.object({
    comment: z.string().min(2).max(200),
    id: z.string(),
    text: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: props.comment,
    },
  });

  const reportIdea = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/ideas/${props.id}/comments/${props.commentId}`,
        {
          text: values.comment,

          // add more data if needed
        }
      );
      console.log(response.data);
      toast.success(response.data.message, {
        duration: 5000,
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        "Idea could not be reported, Something wrong with the server",
        {
          duration: 5000,
        }
      );
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className=" text-blue-500" variant="outline">
            Edit Comment
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(reportIdea)}
              className="space-y-8 w-full"
            >
              <DialogHeader>
                <DialogTitle>Editing Comment: {props.comment}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className=" items-center gap-4">
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-lg">New Comment</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="comment"
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
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditCommentForm;
