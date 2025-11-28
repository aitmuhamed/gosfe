import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";

export const metadata: Metadata = {
  title:
    "GOS",
  description: "GOS",
};

export default function Ecommerce() {

  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen">
            <iframe
              title="Power BI Report"
              width="100%"
              height="100%"
              // src="https://app.powerbi.com/view?r=eyJrIjoiYTY1Njg4MWMtZGM3Zi00Yjc3LWIxYzItMmE2NzA1YzM3NTQ1IiwidCI6IjE0MzhlZjFhLWYzOWMtNGYyNi04M2EyLTcwOGRiMzQwYWFlNSIsImMiOjEwfQ%3D%3D&pageName=7ed76eb39d7e8928d6bb"
              src="https://app.powerbi.com/view?r=eyJrIjoiY2E2ZjkzODQtMzAyNS00YTRiLWJlMzMtMWM4ZGIwYmVlNTgwIiwidCI6IjE0MzhlZjFhLWYzOWMtNGYyNi04M2EyLTcwOGRiMzQwYWFlNSIsImMiOjEwfQ%3D%3D"
              frameBorder="0"
              allowFullScreen={true}
            ></iframe>
          </div>

      {/* <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div> */}
    </div>
  );
}
