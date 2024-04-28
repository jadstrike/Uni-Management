"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AnyPtrRecord } from "dns";
import { toast } from "sonner";

type Closure = {
  id: string;
  initialClosureDate: string;
  finalClosureDate: string;
};

type ClosureDateProps = {
  closure: Closure[];
};

const ClosureDate = (closure: any) => {
  const router = useRouter();
  const [date, setDate] = useState<Date>();

  const [id, setId] = useState();

  useEffect(() => {
    setDate(new Date(closure.closure[0].finalClosureDate));
    setId(closure.closure[0].id);
  }, [closure]);
  const changeClosureDate = async (id: any) => {
    const formattedDate = date?.toISOString();
    try {
      const res = await fetch(`/api/ideas/closure/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          initialClosureDate: closure.closure[0].initialClosureDate,

          finalClosureDate: formattedDate,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update closure date");
      }
      toast.success(res.statusText);

      // Handle successful response here
      router.refresh();
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  };

  //   console.log(closure.closure[0]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            changeClosureDate(id);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
export default ClosureDate;
