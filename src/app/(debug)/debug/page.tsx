import { SecureDebugDetails } from "@/components/debug/SecureDebugDetails";
import React from "react";
import HeadersPrinter from "@/components/debug/HeadersPrinter";

const DebugPage = async () => {
  return (
    <>
      <h1 className="hidden text-center text-3xl font-bold leading-tight tracking-tighter md:block md:text-6xl lg:leading-[1.1]">
        This is what we know
      </h1>
      <div className="flex flex-col space-y-2 px-2">
        <HeadersPrinter />
        <SecureDebugDetails />
      </div>
    </>
  );
};
export default DebugPage;
