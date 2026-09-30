import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getProfile } from "@/lib/data";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const profile = await getProfile();

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer profile={profile} />
    </div>
  );
}
