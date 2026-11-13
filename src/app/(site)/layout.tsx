import SiteLayout from "@/components/layout/SiteLayout";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
