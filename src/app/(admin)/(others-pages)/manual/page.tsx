import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GOS",
  description:
    "GOS",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Manual" />
      <div className="space-y-6">
        <ComponentCard title="Manual Table">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
