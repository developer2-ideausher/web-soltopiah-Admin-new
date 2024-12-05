"use client";
import React, { useEffect, useState } from "react";
import Export from "../../../../icons/Export";

import SearchBar from "@/components/AddSearchBar";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import { getToken } from "@/Services/Cookie/userCookie";
import RedDustbin from "../../../../icons/RedDustbin";
import MaroonDustbin from "../../../../icons/MaroonDustbin";
import { useRouter } from "next/navigation";
import LoaderLarge from "@/components/LoaderLarge";
import Image from "next/image";
import DeleteModal from "@/components/DeleteModal";
import { toast } from "react-toastify";
import { truncateName } from "@/Utilities/helper";
import RobinPagination from "@/components/Pagination";
import { getAllChallengeApi } from "@/Services/Api/Challenge/challenge";

function Page() {
  const [challengeData, setChallengeData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [filter, setFilter] = useState("");

  const router = useRouter();
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, refresh,sort, searchTerm,filter]);


  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term.trim() === "") {
      // If search is empty, reset to default data
      fetchData(1); // Fetch default data
      return;
    }

    // Fetch filtered data based on search term
    setCurrentPage(1)
    fetchData(currentPage, sort, term);
  };
  const fetchData = async (page) => {
    setLoading(true);
    setChallengeData([]);
    const result = await getAllChallengeApi(page, sort, searchTerm,filter);
    if (result.status) {
      console.log(result.data.results);
      setChallengeData(result.data.results);
      setTotalPages(result.data.totalPages);
    } else {
      console.log(result.message);
    }
    setLoading(false);
  };

  const token = getToken();
  // const getAllChallengeApi = (page) => {
  //   setLoading(true);
  //   const myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Bearer " + token);
  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   fetch(
  //     process.env.NEXT_PUBLIC_URL + `/challenges?page=${page}&limit=10`,
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result.data.results);
  //       setChallengeData(result.data.results);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLoading(false);
  //     });
  // };
  const handleDelete = (challengeId, e) => {
    e.stopPropagation();
    setSelectedChallengeId(challengeId);
    setShowModal(true);
  };
  const handleConfirmDelete = () => {
    setLoading(true);
    deleteChallengeApi(selectedChallengeId);
    // getAllChallengeApi()
    toast.success("Challenge Deleted");

    setLoading(false);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedChallengeId(null);
  };
  const deleteChallengeApi = (challengeId) => {
    // e.stopPropagation();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,

      redirect: "follow",
    };

    fetch(
      process.env.NEXT_PUBLIC_URL + `/challenges/${challengeId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setRefresh((prev) => !prev);
      })
      .catch((error) => console.error(error));
  };
  const truncateDescription = (description) => {
    if (description.length > 80) {
      return description.substring(0, 80) + "...";
    }
    return description;
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
      <div className="flex flex-col gap-7 ">
        <div className="flex flex-row justify-between items-center">
          <p className="text-xl2 font-semibold text-userblack font-sans">
            All challenge programs
          </p>
          <div className="flex flex-row items-center gap-5">
            {/* <select className="py-[10px] px-3 border border-[#DCDBE1] rounded-lg text-sm font-sans font-normal text-userblack focus:outline-none">
              <option value="1">Feb 10 - Feb 16, 22</option>
            </select> */}
            <div className="bg-white border border-[#DCDBE1] py-[10px] px-3 rounded-lg flex flex-row items-center gap-2">
              <Export />
              <p className="text-sm font-sans font-normal text-userblack">
                Export
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <SearchBar
           filterArray={[
            { value: "free", label: "Free" },
            { value: "premium", label: "Premium" },
          ]}
          name={"Type"}
          handleSort={sort}
          setHandleSort={setSort}
          setHandleFilter={setFilter}
          handleSearch={handleSearch}
          showAddButton={false}
            title="Create Challenge"
            route="/challenge-module/create-challenge"
          />
          <div className="w-full overflow-x-scroll booking-table-wrapper">
            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center grid grid-cols-challengeTable justify-between p-4">
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Name
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Description
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Duration
                </span>

                <span className="text-[#666576] font-sans font-normal text-sm">
                  Created by
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Type
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Participants
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Status
                </span>

                <span className="text-[#666576] font-sans font-normal text-sm"></span>
              </div>
            </div>
            {loading && (
              <div className="flex justify-center items-center  min-w-fit w-full bg-white">
                <LoaderLarge />
              </div>
            )}
            {!loading &&
            challengeData &&
            challengeData.length === 0 &&
            searchTerm && (
              <div className="flex justify-center items-center bg-white p-10 w-full">
                <p className="text-gray-500 text-sm">
                  No data found for {searchTerm}.
                </p>
              </div>
            )}
            {!loading && challengeData.length === 0 &&  searchTerm.trim() === ""  && (
              <div className="text-center text-md font-semibold min-w-fit w-full text-gray-600 bg-white p-4">
                No data yet.
              </div>
            )}
            <div className="flex flex-col bg-white min-w-fit w-full ">
              {challengeData &&
                challengeData.map((item, index) => (
                  <div
                    key={item._id || index}
                    onClick={() => router.push(`/challenge-module/${item._id}`)}
                    className=" grid grid-cols-challengeTable justify-between border-b border-[#E9E9EC] items-center p-4 cursor-pointer"
                  >
                    <div className="flex flex-row items-center gap-4">
                      <img
                        className="w-12 h-12 object-cover rounded-lg"
                        src={item.thumbnail ? item.thumbnail.url : "image1.png"}
                        alt=""
                      />
                      <p
                        title={item.title}
                        className="text-sm font-sans font-semibold text-[#252322] break-all"
                      >
                        {truncateName(item.title)}
                      </p>
                    </div>
                    <p
                      title={item.description}
                      className="text-userblack w-[350px] font-sans font-semibold text-sm break-all"
                    >
                      {truncateDescription(item.description)}
                    </p>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      {item.durationInDays + " " + "days"}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      Soltopiah
                    </span>
                    <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                      {item.accessibility.toUpperCase()}
                    </span>
                    <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                      {item.participantsCount}
                    </span>
                    <span className="text-userblack font-sans w-[300px] font-semibold text-sm">
                      {item.isActive === true ? "Ongoing" : "Past/Upcoming"}
                    </span>

                    <button className="text-white p-4 rounded-lg w-[150px] bg-[#AE445A] font-sans font-semibold text-sm">
                      Forum
                    </button>
                    {/* for testing purpose */}
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
          />{" "}
        </div>
      </div>
    </>
  );
}

export default Page;
