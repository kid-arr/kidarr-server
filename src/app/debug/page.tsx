import { Button } from "@/components/ui/button";
import React from "react";
// import HeadersPrinter from "@/components/debug/headers-printer";
// import { SecureDebugDetails } from "@/components/debug/secure-debug-details";

const DebugPage = () => {
  return (
    <div className="p-8">
      <Button variant="default">default</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="link">link</Button>
      <Button variant="outline">outline</Button>

      <div className="flex flex-col space-y-2 px-2">
        {/*<HeadersPrinter />*/}
        {/*<SecureDebugDetails />*/}
      </div>
    </div>
  );
};

export default DebugPage;
