import { Separator } from "@/components/ui/separator";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { type Theme } from "@clerk/types";

const appearance: Theme = {
  baseTheme: dark,
  variables: {
    borderRadius: "0.25rem",
  },
  elements: {
    card: "shadow-none w-[25rem] lg:w-[40rem] xl:w-[60rem] ",
    navbar: "hidden",
    navbarMobileMenuButton: "hidden",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
  },
};

export default function DashboardPage() {
  return (
    <>
      <section className="px-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground text-sm">
          Manage your profile settings
        </p>
        <Separator className="my-4" />
      </section>
      <section>
        <UserProfile
          appearance={{ ...appearance }}
        />
      </section>
    </>
  );
}
