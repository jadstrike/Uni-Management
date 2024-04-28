"use client";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { useEffect } from "react";
import { NextRequest } from "next/server";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toaster";
import IdeaComponent from "@/components/ideas/IdeaComponent";
import MostViewedIdea from "@/components/ideas/MostViwedIdea";
import { count } from "console";
import PageLoading from "./loading";

export default function Page() {
  const [mostViewedIdeas, setMostViewedIdeas] = useState();
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState();

  useEffect(() => {
    // Fetch the most-viewed ideas when the component mounts
    const fetchMostViewedIdeas = async () => {
      setLoading(true);
      try {
        setLoading(false);
        const response = await axios.get("/api/ideas/most-viewed");
        toast.success("Most viewed ideas fetched successfully", {
          duration: 5000,
        });
        setMostViewedIdeas(response.data); // Update state with the fetched ideas
      } catch (error) {
        setLoading(false);
        console.error("Error fetching most-viewed ideas:", error);
        // Handle error, e.g., show notification
      }
    };

    fetchMostViewedIdeas();
  }, []);

  useEffect(() => {
    const getCounts = async () => {
      try {
        const response = await axios.get("/api/get-counts");
        console.log(response.data);
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    getCounts();
  }, []);
  // console.log(mostViewedIdeas.mostViewedIdeas);
  const handleDownload = async () => {
    try {
      const response = await axios.get("/api/ideas/download", {
        responseType: "blob", // Important: This tells Axios to handle the response as a Blob
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ideas.csv"); // or any other extension
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      toast.success(
        "Ideas downloaded successfully. Check your browser downloads folder",
        {
          duration: 5000,
        }
      );
    } catch (error) {
      toast.error("Error downloading the ideas. Please try again later.", {
        duration: 5000,
      });
      console.error("Error downloading the ideas:", error);
    }
  };
  return (
    <ScrollArea className="h-full">
      <Toaster />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back!
          </h2>
          <div className="hidden md:flex items-center space-x-2">
            <Button onClick={handleDownload}>Download Ideas</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          {/* <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList> */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Ideas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {counts?.ideaCount ?? ""}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Staffs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {counts?.staffCount ?? ""}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Comments
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {counts?.commentCount ?? ""}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              {/* <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card> */}
            </div>
          </TabsContent>
        </Tabs>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          mostViewedIdeas !== undefined && (
            <MostViewedIdea ideas={mostViewedIdeas} />
          )
        )}
      </div>
    </ScrollArea>
  );
}
