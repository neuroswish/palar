import type { Metadata } from "next";

import { CreateAgentPage } from "@/components/create-agent-page";

export const metadata: Metadata = {
  title: "Create market | Ares",
  description: "Create an agent market on Ares.",
};

export default function CreatePage() {
  return <CreateAgentPage />;
}
