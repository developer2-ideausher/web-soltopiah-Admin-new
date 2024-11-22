"use client";
import SearchBar from "@/components/AddSearchBar";
import React, { useEffect, useState } from "react";
import MenuDots from "../../../../icons/MenuDots";
import Pagination from "@/components/Pagination";
import { getToken } from "@/Services/Cookie/userCookie";
import dayjs from "dayjs";
import LoaderLarge from "@/components/LoaderLarge";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MaroonDustbin from "../../../../icons/MaroonDustbin";
import DeleteModal from "@/components/DeleteModal";
import { getAllNotificationApi } from "@/Services/Api/Notification/Notification";
import { truncateDescription, truncateName } from "@/Utilities/helper";
import RobinPagination from "@/components/Pagination";

function Page() {
  const [notifcationData, setNotificationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const token = getToken();
  // const getAllNotificationApi = () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Bearer " + token);
  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,

  //     redirect: "follow",
  //   };

  //   fetch(
  //     process.env.NEXT_PUBLIC_URL +
  //       "/notifications/sent-by-admin?sortBy=createdAt&sortOrder=asc",
  //     requestOptions
  //   )
  //     .then((response) => {
  //       // if (!response.ok){
  //       //   throw new Error(response.message)
  //       // }
  //       return response.json();
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       if (result.message === "Failed to authenticate") {
  //         toast.error(result.message, { toastId: "1wmdewim" });
  //         router.push("/login");
  //       } else {
  //         setNotificationData(result.data.results);
  //       }
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast.error(result.message, { toastId: "1wmoim" });
  //       setLoading(false);
  //     });
  // };

  const fetchData = async (page) => {
    setLoading(true);
    setNotificationData([])
    const result = await getAllNotificationApi(page);

    if (result.status) {
      console.log(result.data.results);
      setNotificationData(result.data.results);
      setTotalPages(result.data.totalPages);

    } else {
      console.error(result.message);
    }

    setLoading(false);
  };

  const deleteNotificationApi = (notificationId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      process.env.NEXT_PUBLIC_URL + `/notifications/${notificationId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        toast.success("Notification Deleted");
        setRefresh((prev) => !prev);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Unable to delete");
        setLoading(false);
      });
  };
  const handleDelete = (notificationId, e) => {
    e.stopPropagation();
    setSelectedId(notificationId);
    setShowModal(true);
  };
  const handleConfirmDelete = () => {
    setLoading(true);
    setNotificationData([])
    deleteNotificationApi(selectedId);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [refresh,currentPage]);
  return (
    <>
      {" "}
      {showModal && (
        <DeleteModal
          loading={loading}
          onDelete={handleConfirmDelete}
          onClose={handleCloseModal}
        />
      )}
      <div className="flex flex-col gap-7 ">
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Notification Management
        </p>
        <div className="flex flex-col">
          <SearchBar route={"/notification-management/create-notification"} />
          <div className="w-full overflow-x-scroll booking-table-wrapper">
            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center grid grid-cols-notificationTable justify-between p-4">
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Title
                </span>

                <span className="text-[#666576] font-sans font-normal text-sm">
                  Message
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Date
                </span>
              </div>
            </div>
            {loading && (
              <div className="flex justify-center bg-white items-center p-10 w-full ">
                <LoaderLarge />
              </div>
            )}
            <div className="flex flex-col bg-white min-w-fit w-full ">
              {notifcationData &&
                notifcationData.map((item, index) => (
                  <div
                    key={item._id || index}
                    className=" grid grid-cols-notificationTable justify-between border-b border-[#E9E9EC] items-center p-4"
                  >
                    <span title={item.title} className="text-userblack  font-sans font-semibold text-sm break-all">
                      {truncateName(item.title)}
                    </span>
                    <span title={item.description} className="text-userblack font-sans font-semibold text-sm break-all">
                      {truncateDescription(item.description)}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      {dayjs(item.createdAt).format("MMM DD YYYY")}
                    </span>

                    <button onClick={(e) => handleDelete(item._id, e)}>
                      <MaroonDustbin />
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <RobinPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />         </div>
      </div>
    </>
  );
}

export default Page;
