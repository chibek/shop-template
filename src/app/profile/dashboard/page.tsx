import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  return (
    <section className="px-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="text-muted-foreground text-sm">Manage your profile settings</p>
      <Separator className="my-4"/>
    </section>
  );
}
