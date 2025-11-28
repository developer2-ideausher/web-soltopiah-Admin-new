"use client";
import LoaderLarge from "@/components/LoaderLarge";
import RobinPagination from "@/components/Pagination";
import React, { useEffect, useMemo, useState } from "react";
import AddSearchBar from "@/components/AddSearchBar";
import {
  getAllInvites,
  requestApi,
  revokeInviteApi,
  approveRequestApi,
} from "@/Services/Api/Invites/page";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import RedDustbin from "../../icons/RedDustbin";
import Modal from "./Modal";
dayjs.extend(utc);

const UserRequestTable = ({ refreshKey }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [smallLoading, setSmallLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showApproveModal, setShowApproveModal] = useState(false);

  const openRevokeModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const closeRevokeModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  const openApproveModal = () => {
    console.log("Opening approve modal with selected IDs:", selectedIds);
    setShowApproveModal(true);
  };

  const closeApproveModal = () => {
    setShowApproveModal(false);
  };
  const selectedInvite = useMemo(
    () => data.find((d) => d._id === selectedId) || null,
    [data, selectedId]
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const selectableIds = data
        .filter(
          (item) =>
            item.status !== "revoked" &&
            item.status !== "expired" &&
            item.status !== "accepted"
        )
        .map((item) => item._id);
      setSelectedIds(selectableIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((selectedId) => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectableRowsCount = data.filter(
    (item) =>
      item.status !== "revoked" &&
      item.status !== "expired" &&
      item.status !== "accepted"
  ).length;
  const isAllSelected =
    selectableRowsCount > 0 && selectedIds.length === selectableRowsCount;
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await requestApi(
        currentPage,
        10,
        filter,
        searchTerm,
        sortBy,
        sortOrder
      );
      if (result.data) {
        setData(result.data.results || []);
        setTotalPages(result.data.totalPages || 1);
        setCurrentPage(result.data.page || 1);
      }
    } catch (error) {
      toast.error(error.message || "Error occured, please try again");
    }
    setLoading(false);
  };
  const handleFilterChange = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };
  const handleSort = (order) => {
    setSortOrder(order);
    setSortBy("createdAt");
    setCurrentPage(1);
  };
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  const revokeInvite = async () => {
    try {
      setSmallLoading(true);
      const result = await revokeInviteApi(selectedId);
      if (result.data) {
        toast.success("Invite revoked successfully");
        closeRevokeModal();
        fetchData();
      }
    } catch (error) {
      toast.error(error.message || "Error occured, please try again");
    }
    setSmallLoading(false);
  };

  const approveInvites = async () => {
    console.log("Approving invites with IDs:", selectedIds);
    try {
      setSmallLoading(true);
      const result = await approveRequestApi(selectedIds);
      console.log("Approve API result:", result);
      if (result.data) {
        toast.success(
          `${selectedIds.length} invite request(s) approved successfully`
        );
        closeApproveModal();
        setSelectedIds([]);
        fetchData();
      }
    } catch (error) {
      console.error("Approve error:", error);
      toast.error(error.message || "Error occured, please try again");
    }
    setSmallLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [refreshKey, currentPage, filter, searchTerm, sortBy, sortOrder]);

  useEffect(() => {
    setSelectedIds([]);
  }, [data]);
  useEffect(() => {
    console.log("Selected IDs:", selectedIds);
  }, [selectedIds]);

  return (
    <div className="flex flex-col">
      {/* {selectedIds.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-sm font-sans font-medium text-blue-700">
            {selectedIds.length} {selectedIds.length === 1 ? "item" : "items"} selected
          </p>
        </div>
      )} */}
      <AddSearchBar
        filterArray={[
          { value: "", label: "All" },

          { value: "accepted", label: "Accepted" },
          { value: "pending", label: "In-Progress" },
          { value: "revoked", label: "Revoked" },
          { value: "expired", label: "Expired" },
          { value: "requested", label: "Requested" },
          { value: "rejected", label: "Rejected" },
        ]}
        name={"Status"}
        handleSearch={handleSearch}
        handleSort={handleSort}
        setHandleSort={setSortOrder}
        setHandleFilter={handleFilterChange}
        showAddButton={false}
        title="Add new"
        route="/playlists/createPlaylist"
        showRefresh={true}
        showApproveButton={selectedIds.length > 0}
        handleRefresh={fetchData}
        handleApprove={openApproveModal}
      />
      <div className="w-full overflow-x-scroll booking-table-wrapper">
        <div className="bg-[#F0F2F5] min-w-fit w-full">
          <div className="items-center grid grid-cols-userInviteTable justify-between p-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-[#666576] font-sans font-normal text-sm">
                User
              </span>
            </div>
            <span className="text-[#666576] font-sans font-normal text-sm">
              Email Id
            </span>
            {/* <span className="text-[#666576] ml-2 font-sans font-normal text-sm">
                Created By
              </span> */}

            <span className="text-[#666576] font-sans font-normal text-sm">
              Invite Requested On
            </span>
            <span className="text-[#666576] font-sans font-normal text-sm">
              Code
            </span>
            {/* <span className="text-[#666576] font-sans font-normal text-sm text-center">
              Type
            </span> */}
            <span className="text-[#666576] font-sans font-normal text-sm text-center">
              Expiry
            </span>
            <span className="text-[#666576] font-sans font-normal text-sm text-center">
              Invite accepted on
            </span>
            <span className="text-[#666576] font-sans font-normal text-sm text-center">
              Status
            </span>
            <span className=" font-sans font-normal text-sm text-center"></span>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center bg-white items-center p-10 w-full ">
            <LoaderLarge />
          </div>
        )}
        {!loading && data && data.length === 0 && (
          <div className="flex justify-center items-center bg-white p-10 w-full">
            {searchTerm || filter ? (
              <p className="text-gray-500 text-sm">
                No data found
                {searchTerm && ` for "${searchTerm}"`}
                {filter && ` with filter "${filter}"`}.
              </p>
            ) : (
              <p className="text-gray-500 text-sm">No data found.</p>
            )}
          </div>
        )}
        <div className="flex flex-col bg-white min-w-fit w-full ">
          {data &&
            data.map((item, index) => (
              <div key={item._id || index} className="hover:bg-slate-100">
                <div className=" grid grid-cols-userInviteTable justify-between border-b border-[#E9E9EC] items-center p-4">
                  <div className="flex flex-row items-center gap-2">
                    {item.status !== "revoked" &&
                    item.status !== "expired" &&
                    item.status !== "accepted" ? (
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => handleSelectRow(item._id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    ) : (
                      <div className="w-4 h-4"></div>
                    )}
                    {/* <img
                                            className={`w-8 h-8 object-cover rounded-full`}
                                            src={item?.thumbnail?.url}
                                            alt=""
                                        /> */}
                    <span
                      title={item.name}
                      className="text-userblack font-sans font-semibold text-sm truncate"
                    >
                      {item.name}
                    </span>
                  </div>
                  <span
                    title={item.email}
                    className="text-userblack font-sans font-semibold text-sm truncate"
                  >
                    {item.email}
                  </span>
                  {/* <div className="flex flex-row items-center gap-2">
                      <img
                          className={`w-8 h-8 object-cover rounded-full`}
                          src={
                            item?.thumbnail?.url
                          }
                          alt=""
                        />
                      <span className="text-userblack font-sans font-semibold text-sm text-center ml-2">
                        {item.creatorRole == "Guide"
                          ? item?.creator?.firstName
                          : "Soltopiah"}
                      </span>
                    </div> */}

                  <span className="text-userblack font-sans font-semibold text-sm">
                    {dayjs(item.createdAt).format("DD/MM/YYYY ,   hh:mm A")}
                  </span>

                  <span className="text-userblack font-sans font-semibold text-sm capitalize">
                    {item?.code}
                  </span>
                  {/* <span className="text-userblack font-sans font-semibold text-sm capitalize">
                    {item?.type}
                  </span> */}
                  <span className="text-userblack font-sans font-semibold text-sm text-center">
                    {dayjs(item.expiry).format("DD/MM/YYYY , hh:mm A")}{" "}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm text-center">
                    {item?.acceptedAt
                      ? dayjs(item.acceptedAt).format("DD/MM/YYYY hh:mm A")
                      : "--"}
                  </span>
                  <div className="flex justify-center">
                    <span
                      className={`py-1 px-5  w-[130px] rounded-[78px] border font-sans font-normal text-base capitalize  text-center
    ${
      item.status?.toLowerCase() === "revoked" ||
      item.status?.toLowerCase() === "expired"
        ? "bg-red-100 text-red-500 border-red-500"
        : item.status?.toLowerCase() === "accepted"
        ? "bg-[#DDFDE8] text-[#08A03C] border-[#A8FBC4]"
        : item.status?.toLowerCase() === "pending"
        ? "bg-orange-100 text-orange-500 border-orange-500"
        : item.status?.toLowerCase() === "requested"
        ? "bg-blue-100 text-blue-500 border-blue-500"
        : ""
    }`}
                    >
                      {item.status?.toLowerCase() === "pending"
                        ? "In-progress"
                        : item.status?.toLowerCase() === "requested"
                        ? "Requested"
                        : item.status}
                    </span>
                  </div>
                  {item.status !== "expired" && item.status !== "revoked" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openRevokeModal(item._id);
                      }}
                    >
                      <RedDustbin />
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
        {showModal && selectedInvite && (
          <Modal>
            <div className="bg-[#F0F1FD] w-[32vw] rounded-lg p-3 flex flex-col gap-8">
              <p className="font-sans font-semibold text-base text-primary">
                Are you sure you want to revoke this invite?
              </p>
              <div className="flex flex-row items-center justify-between gap-3">
                <button
                  disabled={smallLoading}
                  type="button"
                  onClick={closeRevokeModal}
                  className="p-2 text-[#AE445A] font-semibold text-sm font-sans w-full rounded-md border border-[#AE445A]"
                >
                  Cancel
                </button>
                <button
                  disabled={smallLoading}
                  type="button"
                  onClick={revokeInvite}
                  className="p-2 bg-[#AE445A] text-white font-semibold text-sm font-sans w-full rounded-md border border-[#AE445A] flex items-center justify-center"
                >
                  {smallLoading ? "Revoking..." : "Revoke Invite"}
                </button>
              </div>
            </div>
          </Modal>
        )}
        {showApproveModal && (
          <Modal>
            <div className="bg-[#F0F1FD] w-[32vw] rounded-lg p-5 flex flex-col gap-4">
              <p className="text-black font-semibold text-2xl mt-4">
                Approve Invite Requests
              </p>
              <p className="font-sans font-semibold text-base  text-primary">
                Are you sure you want to approve {selectedIds.length} invite{" "}
                {selectedIds.length === 1 ? "request" : "requests"}?
              </p>
              <div className="flex flex-row items-center justify-between mt-5 gap-3">
                <button
                  disabled={smallLoading}
                  type="button"
                  onClick={closeApproveModal}
                  className="p-2 text-red-500 font-semibold text-sm font-sans w-full rounded-md border border-red-500"
                >
                  Cancel
                </button>
                <button
                  disabled={smallLoading}
                  type="button"
                  onClick={approveInvites}
                  className="p-2 bg-primary text-white font-semibold text-sm font-sans w-full rounded-md border flex items-center justify-center"
                >
                  {smallLoading ? "Approving..." : "Approve"}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
      {!loading && data && data.length > 0 && totalPages > 1 && (
        <RobinPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default UserRequestTable;
