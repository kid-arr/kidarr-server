import PrintEnv from "@/components/widgets/print-env";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

const DebugPage = async () => {
  const session = await getServerSession(authOptions);
  const request = headers();
  return (
    <div className="p-6">
      <PrintEnv session={null} request={request} />
    </div>
  );
};
export default DebugPage;
