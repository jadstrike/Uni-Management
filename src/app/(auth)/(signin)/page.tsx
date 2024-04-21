"use client";
import Link from "next/link";
import UserAuthForm from "@/components/forms/user-auth-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4  top-4 md:right-8 md:top-8"
        )}
      >
        User Manual Guide
      </Link>

      <div className="p-8 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold ">
              University Management System
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to login
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
