import type { Metadata } from "next";

import { CreateAiPage } from "@/components/create-ai-page";

export const metadata: Metadata = {
  title: "Create market | Ares",
  description: "Create an AI market on Ares.",
};

export default function CreatePage() {
  return <CreateAiPage />;
}
