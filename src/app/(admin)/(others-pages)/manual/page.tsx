import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GOS",
  description:
    "GOS",
  // other metadata
};

  const docs = [
    { id: 1, title: "Document 1", file: "/docs/RFID/RFID-Алдааны тайлбар.pdf" },
    { id: 2, title: "Document 2", file: "/docs/doc2.pdf" },
  ];
export default function page() {
  
  return (
    <div>
      <PageBreadcrumb pageTitle="Manual" />
      <div className="space-y-6">
        <ComponentCard title="Manual Table">
                <ul>
        {docs.map(doc => (
          <li key={doc.id}>
            <Link href={`/docs/${doc.id}`}>{doc.title}</Link>
          </li>
        ))}
      </ul>
        </ComponentCard>
      </div>
    </div>
  );
}
