"use client"; // mark as client component

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import BasicTableOne from "@/components/tables/BasicTableOne";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useModal } from "@/hooks/useModal";
import { useEffect, useState } from "react";


export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [unitData, setUnitData] = useState<any[]>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [selectMaterialGroup, setSelectMaterialGroup] = useState<string>("");
  const [details, setDetails] = useState<any>(null);
  const [unit, setUnit] = useState<string>("");
  const [state, setState] = useState<any>({ group: "", type: "", category: "", division: "", short_description: "", long_description: "", units: "" });
  const [materialData, setMaterialData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://10.10.228.148:8000/material-groups/descriptions");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    const fetchUnitData = async () => {
      try {
        const res = await fetch("http://10.10.228.148:8000/units");
        const json = await res.json();
        setUnitData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    const fetchMaterialData = async () => {
      try {
        const res = await fetch("http://10.10.228.148:8000/all-requests ");
        const json = await res.json();
        setMaterialData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
    fetchUnitData();
    fetchMaterialData();
  }, []);

  const handleSelectChange = (value: string) => {
    setSelectMaterialGroup(value);
  };

  const handleSelectChangeUnit = (value: string) => {
    setUnit(value);
  }

  useEffect(() => {
    const fetchDetails = async () => {
      if (selectMaterialGroup) {
        try {
          const res = await post(`http://10.10.228.148:8000/material-groups/${selectMaterialGroup}`);
          const json = await res.json();
          setDetails(json);
        } catch (err) {
          console.error("Error fetching details:", err);
        }
      }
    };
    fetchDetails();
  }, [selectMaterialGroup]);

  const handleSave = async () => {
    const payload = {
        group: details?.group || "",
        type: details?.type || "",
        category: details?.category || "",
        division: details?.division ? "40" : "40", // send actual division
        short_description: `${state.name},${state.color},${state.size},${state.value}`,
        long_description: "",
        units: unit
      };
            console.log("body::",JSON.stringify(payload));
      debugger


    try {
      const res = await fetch("http://10.10.228.148:8000/material-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        console.error("Failed:", res.status, res.statusText);
        return;
      }
      console.log("Response:", data);
    } catch (err) {
      console.error("Error creating material request:", err);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Material" />
      <div className="space-y-6">
        <ComponentCard title="Material Table">
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Create
          </button>
          {/* Pass the fetched data into your table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <div className="min-w-[1102px]">
                <Table>
                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Group
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Type
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Category
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Division
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Units
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {materialData.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <div className="flex items-center gap-3">
                            <div>
                              <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                {order.group}
                              </span>
                              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {order.type}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <div className="flex -space-x-2">
                            {order.category}
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {order.division === 40 && "Gobi"}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {order.units}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Create Material
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>

              </div>
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-3">
                  <div className="col-span-3">

                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Material Group Description
                    </p>
                    <div className="relative">
                      <Select
                        options={data.map(opt => ({
                          value: String(opt.id),
                          label: opt.description
                        }))}
                        placeholder="Select an option"
                        onChange={handleSelectChange}
                      />

                    </div>
                  </div>


                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Category
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {details?.category}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Category ID
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {details?.category_id}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Division
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {details?.division === 40 && "Gobi"}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Group
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {details?.group}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Group Description
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {details?.group_description}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Type
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {details?.type}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      type ID
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {details?.type_id}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1 mt-6">
                  {details?.group?.slice(0, 1) === "Z" ? (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-4">
                      <div className="col-span-2">
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          Name
                        </p>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="Enter name"
                          />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          Additional info
                        </p>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="Enter additional info"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-4">
                      <div className="col-span-1">
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          Name
                        </p>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="Enter name"
                            defaultValue={state.name}
                            onChange={(e) => setState({ ...state, name: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          Color
                        </p>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="Enter color"
                            defaultValue={state.color}
                            onChange={(e) => setState({ ...state, color: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          Size
                        </p>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="Enter size"
                            defaultValue={state.size}
                            onChange={(e) => setState({ ...state, size: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          Value
                        </p>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="Enter value"
                            defaultValue={state.value}
                            onChange={(e) => setState({ ...state, value: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                  )}
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-4">
                    <div className="col-span-2">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Unit
                      </p>
                      <Select
                        options={unitData.map(opt => ({
                          value: opt.units,
                          label: opt.units
                        }))}
                        placeholder="Select an option"
                        onChange={handleSelectChangeUnit}
                      />
                    </div>
                    <div className="col-span-2">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Long Description
                      </p>
                      <Input
                        type="text"
                        placeholder="Enter long description"
                        defaultValue={state.long_description}
                        onChange={(e) => setState({ ...state, long_description: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Create
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}


function post(url: string) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ body: "example" })
  });
}

