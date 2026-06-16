import type { Metadata } from "next";

import { ProfilePage } from "@/components/profile-page";

export const metadata: Metadata = {
  title: "Profile | Ares",
};

export default function Profile() {
  return <ProfilePage />;
}
