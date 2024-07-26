"use client"
import BackButton from "@/components/BackButton";
import { getToken } from "@/Services/Cookie/userCookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const { title, type, description } = formData;
    setIsFormValid(title && type && description);
  }, [formData]);
  const router= useRouter()
  const token = getToken();
  const createNotificationApi = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
      targetRole: formData.type,
      title: formData.title,
      description: formData.description,
      // scheduledAt: new Date(Date.now()+5000).toISOString(),
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      process.env.NEXT_PUBLIC_URL + "/notifications/notify-people",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        router.push("/notification-management")
      })
      .catch((error) => console.error(error));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createNotificationApi();
  };
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/notification-management">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Create Notification
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/3">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-sans font-semibold text-userblack">
            Title
          </p>
          <input
            type="text"
            onChange={handleChange}
            value={formData.title}
            name="title"
            className="py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal placeholder:text-[#9C9896]"
            placeholder="Enter title"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-sans font-semibold text-userblack">Type</p>
          <select
            onChange={handleChange}
            value={formData.type}
            name="type"
            className="py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal placeholder:text-[#9C9896] focus:outline-none"
          >
            <option value="" disabled className="text-gray-500">
              Select Type
            </option>
            <option value="All">All</option>
            <option value="NormalUser">Users</option>
            <option value="Guide">Guides</option>
          </select>
          {/* <input
            type="text"
            className="py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal placeholder:text-[#9C9896]"
            placeholder="Enter type"
          /> */}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-sans font-semibold text-userblack">
            Message
          </p>
          <textarea
            value={formData.description}
            name="description"
            onChange={handleChange}
            type="text"
            className="py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal placeholder:text-[#9C9896]"
            placeholder="Enter Description"
          />
        </div>
        <button
          disabled={!isFormValid}
          type="submit"
          className={`text-base font-sans font-semibold w-1/3 mt-4 p-4 rounded-lg ${
            isFormValid
              ? "bg-[#AE445A] text-white"
              : "bg-[#c08e97] text-white cursor-not-allowed"
          }`}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default page;
