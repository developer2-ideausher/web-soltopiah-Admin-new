"use client";
import Card from "@/components/DashBoardNew/Card";
import { Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import UserGuideTable from "@/components/UserGuideTable";
import UserInviteTable from "@/components/UserInviteTable";
import { createInvite, getInviteStats } from "@/Services/Api/Invites/page";
import LoaderSmall from "@/components/LoaderSmall";
import Modal from "@/components/Modal";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import UserRequestTable from "@/components/UserRequestTable";
import Select from "react-select";

const Page = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    expiryHours: "",
    expiryDate: "",
    role: null,
  });

  const roleOptions = [
    { value: "NormalUser", label: "User" },
    { value: "Guide", label: "Guide" },
  ];
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getInviteStats();
      if (result.data) {
        setData(result.data);
      }
    } catch (error) {
      toast.error(error.message || "Error occured, please try again");
    }
    setLoading(false);
  };
  const handleExpiryChange = (e) => {
    let value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    let num = Number(value);

    if (num > 168) num = 168;
    if (num < 1 && value !== "") num = 1;

    let expiryDate = "";
    if (num >= 1 && num <= 168) {
      expiryDate = dayjs().add(num, "hour").format("DD/MM/YYYY HH:mm");
    }

    setForm({
      ...form,
      expiryHours: num || "",
      expiryDate,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!form.name || !form.email || !form.expiryHours || !form.role) {
      toast.error("Please fill all fields properly");
      return;
    }
    if (form.name.length > 30) {
      toast.error("Name cannot exceed 30 characters");
      return;
    }
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setSubmitting(true);

      const expiryLocal = dayjs()
        .add(Number(form.expiryHours), "hour")
        .format("YYYY-MM-DDTHH:mm:ss");

      const payload = {
        name: form.name,
        email: form.email,
        role: form.role.value,
        expiryDurationHours: Number(form.expiryHours),
        expiry: expiryLocal,
      };

      const result = await createInvite(payload);
      if (result.data) {
        toast.success("Invite sent successfully!");
        setShowModal(false);
        setForm({ name: "", email: "", expiryHours: "", expiryDate: "", role: null });
        setRefreshKey((prev) => prev + 1);
        fetchData();
      }
    } catch (error) {
      toast.error(error.message || "Failed to send invite");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className=" flex flex-col gap-11 ">
      <div className="flex flex-row justify-between items-center">
        <p
          // onClick={() => router.push("/user-management")}
          className="text-xl2 font-semibold font-sans text-[#17161D]"
        >
          Invites
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="flex flex-row items-center justify-center gap-1 rounded-full p-3 bg-[#3090E9]"
        >
          <span>
            <Plus color="white" />
          </span>
          <p className="text-white text-sm font-sans font-medium">
            Create Invite
          </p>
        </button>
      </div>
      <div className="flex flex-col gap-5">
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 items-center gap-5">
          <Card
            Heading="Total invites sent"
            Number={loading ? <LoaderSmall /> : data.totalInvites || 0}
            color="[#E6FFEC]"
          />
          <Card
            Heading="Total invites accepted"
            Number={loading ? <LoaderSmall /> : data.acceptedInvites || 0}
            color="[#E6FFEC]"
          />
          <Card
            Heading="Guides onboarded"
            Number={loading ? <LoaderSmall /> : data.onboardedGuides || 0}
            color="[#E6FFEC]"
          />
          <Card
            Heading="Users onboarded"
            Number={loading ? <LoaderSmall /> : data.onboardedUsers || 0}
            color="[#E6FFEC]"
          />
        </div>
        <div className="flex flex-row items-center ">
          <button
            onClick={() => setActiveTab("users")}
            className={`${
              activeTab === "users"
                ? "bg-[#0000000D]   font-semibold text-[#252322]  border-b-2 border-[#1C1C1C]"
                : "font-normal text-[#838383] "
            }  font-sans  text-base py-2 px-6`}
            type="button"
          >
            Users
          </button>

          <button
            onClick={() => setActiveTab("userRequests")}
            className={`${
              activeTab === "userRequests"
                ? "bg-[#0000000D]   font-semibold text-[#252322]  border-b-2 border-[#1C1C1C]"
                : "text-[#838383] font-normal"
            }  font-sans text-base py-2 px-6`}
            type="button"
          >
            User Requests
          </button>
          <button
            onClick={() => setActiveTab("guides")}
            className={`${
              activeTab === "guides"
                ? "bg-[#0000000D]   font-semibold text-[#252322]  border-b-2 border-[#1C1C1C]"
                : "text-[#838383] font-normal"
            }  font-sans text-base py-2 px-6`}
            type="button"
          >
            Guides
          </button>
        </div>
        {activeTab === "users" && <UserInviteTable refreshKey={refreshKey} />}
        {activeTab === "userRequests" && <UserRequestTable refreshKey={refreshKey} />}
        {activeTab === "guides" && <UserGuideTable refreshKey={refreshKey} />}
      </div>
      {showModal && (
        <Modal>
          <form
            onSubmit={handleSubmit}
            className="bg-[#F0F1FD] w-[40vw] rounded-lg p-3 flex flex-col gap-4"
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-[#232946] font-semibold text-base font-sans">
                Create new invitation
              </p>
              <span
                onClick={() => setShowModal(false)}
                className="cursor-pointer"
              >
                <X />
              </span>
            </div>
            <div className="flex flex-col gap-1 mt-4">
              <label className="text-sm font-sans font-medium text-[#252322]">
                Role
              </label>
              <Select
                value={form.role}
                onChange={(selectedOption) =>
                  setForm({ ...form, role: selectedOption })
                }
                options={roleOptions}
                placeholder="Select role"
                className="w-full "
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: "0.375rem",
                    padding: "0.125rem",
                  }),
                }}
              />
            </div>
            <div className="flex flex-col gap-1 mt-4">
              <label className="text-sm font-sans font-medium text-[#252322]">
                Name
              </label>
              <input
                maxLength={30}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter name (max 30 characters)"
                className="w-full focus:outline-none p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col gap-1 mt-4">
              <label className="text-sm font-sans font-medium text-[#252322]">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter email"
                className="w-full focus:outline-none p-2 rounded-md"
              />
            </div>

            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-1 mt-4 w-full">
                <label className="text-sm font-sans font-medium text-[#252322]">
                  Expiry (in hours)
                </label>
                <input
                  type="text"
                  value={form.expiryHours}
                  onChange={handleExpiryChange}
                  placeholder="Enter hours (1–168)"
                  className="w-full focus:outline-none p-2 rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1 mt-4 w-full">
                <label className="text-sm font-sans font-medium text-[#252322]">
                  Expiry Date and Time
                </label>
                <input
                  disabled
                  value={form.expiryDate}
                  className="w-full focus:outline-none p-2 rounded-md bg-gray-100"
                />
              </div>
            </div>

            <div className="flex flex-row items-center justify-between gap-3">
              <button
                disabled={submitting}
                type="button"
                onClick={() => setShowModal(false)}
                className="p-3 text-[#AE445A] font-semibold text-sm font-sans w-full rounded-md border border-[#AE445A]"
              >
                Cancel
              </button>
              <button
                disabled={submitting}
                type="submit"
                className="p-3 bg-[#AE445A] text-white font-semibold text-sm font-sans w-full rounded-md border border-[#AE445A] flex items-center justify-center"
              >
                {submitting ? "Loading" : "Send Invite"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Page;
