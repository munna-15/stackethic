import SiteHeader from "@/components/layout/site-header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "../ui/FloatingWhatsApp";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {children}
      <Footer />
      <FloatingWhatsApp/>
    </>
  );
}
