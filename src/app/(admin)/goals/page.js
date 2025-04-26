"use client";
import React, { useEffect, useState } from "react";
import AddSearchBar from "../../../components/AddSearchBar";
import { getToken } from "@/Services/Cookie/userCookie";
import { useRouter } from "next/navigation";
import MaroonDustbin from "../../../../icons/MaroonDustbin";
import DeleteModal from "@/components/DeleteModal";
import LoaderLarge from "@/components/LoaderLarge";
import { toast } from "react-toastify";
import RobinPagination from "@/components/Pagination";
import { Switch } from "@/components/ui/switch";
import Edit from "../../../../icons/Edit";
import { getAllGoals, updateGoal } from "@/Services/Api/Goals/goal";
import LoaderSmall from "@/components/LoaderSmall";
import Link from "next/link";

function Page() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [smallLoading, setSmallLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const handleSearch = (term) => {
    setSearchTerm(term);

    setCurrentPage(1);
  };
  const fetchData = async (page) => {
    setLoading(true);
    try {
      const result = await getAllGoals(page, searchTerm);
      if (result.status) {
        setData(result.data.results);
        setTotalPages(result.data.totalPages);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong,try again");
    }
    setLoading(false);
  };

  const handleToggleStatus = async (id, checked) => {
    setSmallLoading(id);
    try {
      const result = await updateGoal(id, { isActive: checked });
      if (result.status) {
        setData((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, isActive: checked } : item
          )
        );
        toast.success("Status updated");
      }
    } catch (err) {
      toast.error(err.message || "Could not update status");
    } finally {
      setSmallLoading(null);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, searchTerm]);
  return (
    <>
      {showModal && (
        <DeleteModal
          loading={loading}
          onDelete={handleConfirmDelete}
          onClose={handleCloseModal}
        />
      )}
      <div className="flex flex-col gap-7">
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Goals
        </p>
        <div className="flex flex-col">
          <AddSearchBar
            name={"Type"}
            handleSearch={handleSearch}
            showAddButton={false}
            showFilters={false}
            sort={false}
          />
          <div className="w-full overflow-x-scroll booking-table-wrapper">
            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center grid grid-cols-3 w-full justify-between p-4">
                <span className="text-[#666576] mr-10  font-sans font-normal text-sm ">
                  Goal
                </span>

                <span className="text-[#666576] font-sans font-normal text-sm text-center">
                  Status
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm flex justify-end">
                  Action
                </span>
              </div>
            </div>
            {loading && (
              <div className="flex justify-center bg-white items-center p-10 w-full ">
                <LoaderLarge />
              </div>
            )}
            {!loading && data && data.length === 0 && (
              <div className="flex justify-center items-center bg-white p-10 w-full">
                <p className="text-gray-500 text-sm">
                  {searchTerm
                    ? `No data found for "${searchTerm}".`
                    : "No data yet."}
                </p>
              </div>
            )}
            <div className="flex flex-col bg-white min-w-fit w-full ">
              {!loading &&
                data &&
                data.map((item, index) => (
                  <div
                    key={item._id || index}
                    className=" grid grid-cols-3 justify-between border-b border-[#E9E9EC] items-center p-4 cursor-pointer"
                  >
                    <div className="flex flex-row items-center gap-4">
                      <img
                        className="h-11 w-11 object-contain rounded-full"
                        src={item.image?.url || "Frame1.png"}
                        alt=""
                      />
                      <p className="text-sm font-sans font-semibold text-[#252322] break-all ">
                        {item.title}
                      </p>
                    </div>

                    {smallLoading === item._id ? (
                      <div className="flex justify-center items-center">
                        <LoaderSmall />
                      </div>
                    ) : (
                      <div className="text-sm font-sans font-semibold text-[#252322] break-all flex justify-center  gap-2 ">
                        <p className="text-sm font-sans font-semibold text-red-700 ">
                          Deactivated
                        </p>
                        <Switch
                          className={
                            item.isActive ? "!bg-green-700" : "!bg-red-700"
                          }
                          checked={item.isActive}
                          onCheckedChange={(checked) =>
                            handleToggleStatus(item._id, checked)
                          }
                        />
                        <p className="text-sm font-sans font-semibold text-green-700  ">
                          Activated
                        </p>
                      </div>
                    )}
                    <Link href={`/goals/${item._id}`}>
                      <span className="flex justify-end">
                        <Edit />
                      </span>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          {data && data.length > 0 && (
            <RobinPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
