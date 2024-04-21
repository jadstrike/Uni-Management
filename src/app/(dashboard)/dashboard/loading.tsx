"use client";
import { GridLoader } from "react-spinners";

const PageLoading = () => {
  return (
    <div className=" w-full h-full flex justify-center items-center">
      <GridLoader />
    </div>
  );
};

export default PageLoading;
