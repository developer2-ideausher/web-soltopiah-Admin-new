"use client";
import React, { useEffect, useState } from "react";
import AddSearchBar from "../../../components/AddSearchBar";
import MenuDots from "../../../../icons/MenuDots";
import Pagination from "@/components/Pagination";
import { getToken } from "@/Services/Cookie/userCookie";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import RedDustbin from "../../../../icons/RedDustbin";
import MaroonDustbin from "../../../../icons/MaroonDustbin";
import DeleteModal from "@/components/DeleteModal";
import Modal from "@/components/Modal";
import LoaderLarge from "@/components/LoaderLarge";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { getImageCacheRemover } from "@/Services/Api/Badges/BadgesApi";
import { truncateDescription, truncateName } from "@/Utilities/helper";
import RobinPagination from "@/components/Pagination";

function Page() {
  const [showModal, setShowModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const token = getToken();

  useEffect(() => {
    if (!token) {
      toast.error("Session expired, login again");
      router.push("/login");
    } else {
      getCategoryData(currentPage);
    }
  }, [token, refresh,currentPage]);
  const router = useRouter();
  const getCategoryData = (page) => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(process.env.NEXT_PUBLIC_URL + `/categories?page=${page}&limit=10`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Failed to authenticate") {
          // toast.error(result.message, { toastId: "1wmdewilmh" });
          router.push("/login");
        } else {
          console.log(result.data.results);
          setCategoryData(result.data.results);
          setTotalPages(result.data.totalPages);

        }

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(result.message, { toastId: "1wmoikk" });

        setLoading(false);
      });
  };
  const deleteCategoryApi = (categoryId) => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,

      redirect: "follow",
    };

    fetch(
      process.env.NEXT_PUBLIC_URL + `/categories/${categoryId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log("hi", result);
        setShowModal(false);
        setRefresh((prev) => !prev);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error Occured");
        setLoading(false);
      });
  };
  const handleDelete = (categoryId, e) => {
    e.stopPropagation();
    setSelectedCategoryId(categoryId);
    setShowModal(true);
  };
  const handleConfirmDelete = () => {
    setLoading(true);
    deleteCategoryApi(selectedCategoryId);
    toast.success("Category Deleted");

    setLoading(false);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategoryId(null);
  };
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
          Category Management
        </p>
        <div className="flex flex-col">
          <AddSearchBar route="/category-management/addnew"  showAddButton={true} />
          <div className="w-full overflow-x-scroll booking-table-wrapper">
            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center grid grid-cols-categoryMainTable  justify-between p-4">
                <span className="text-[#666576] mr-10  font-sans font-normal text-sm">
                  Category
                </span>

                <span className="text-[#666576] font-sans font-normal text-sm">
                  Page Type
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Date Created
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Date Updated
                </span>

                <span className="text-[#666576] font-sans font-normal text-sm"></span>
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center bg-white items-center p-10 w-full ">
                <LoaderLarge />
              </div>
            ) : (
              <div className="flex flex-col bg-white min-w-fit w-full ">
                {categoryData &&
                  categoryData.map((item, index) => (
                    <div
                      key={item._id || index}
                      onClick={() =>
                        router.push(`/category-management/${item._id}`)
                      }
                      className=" grid grid-cols-categoryMainTable justify-between border-b border-[#E9E9EC] items-center p-4 cursor-pointer"
                    >
                      <div className="flex flex-row items-center gap-4">
                        <img
                          className="h-8 w-8 object-cover rounded-full"
                          src={getImageCacheRemover(
                            item.image?.url,
                            "image1.png"
                          )}
                          alt=""
                        />
                        <p className="text-sm font-sans font-semibold text-[#252322] break-all mr-10 ">
                          {truncateName(item.title)}
                        </p>
                      </div>
                      <p className="text-sm font-sans font-semibold capitalize text-[#252322]">
                        {item.pageType}
                      </p>

                      <span className="text-userblack font-sans font-semibold text-sm">
                        {dayjs(item.createdAt).format("MMM DD YYYY")}
                      </span>
                      <span className="text-userblack font-sans font-semibold text-sm">
                        {dayjs(item.updatedAt).format("MMM DD YYYY")}
                      </span>
                      <button onClick={(e) => handleDelete(item._id, e)}>
                        <MaroonDustbin />
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <RobinPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />{" "}
        </div>
      </div>
    </>
  );
}

export default Page;
