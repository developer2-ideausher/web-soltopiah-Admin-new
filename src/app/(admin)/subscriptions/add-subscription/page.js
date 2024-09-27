"use client";
import BackButton from "@/components/BackButton";
import { createSubs } from "@/Services/Api/Subscriptions/Subs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DownArrow from "../../../../../icons/DownArrow";
import { useRouter } from "next/navigation";

function Page() {
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [amount, setAmount] = useState("");
  const [recurringInterval, setRecurringInterval] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createSubs(
      displayName,
      description,
      amount,
      recurringInterval,
      thumbnail
    );

    if (result.status) {
      toast.success("Subscription created successfully!");
      router.push("/subscriptions");
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    } else {
      toast.error("Upload a valid image type 'PNG/JPEG' ");
    }
  };
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/subscriptions">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Add Subscription
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-2/5">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">
            Cover Image
          </p>
          <div className="py-3 px-4 w-[168px] rounded-xl bg-white border border-[#E7E5E4] h-40 flex items-center justify-center text-sm font-sans font-normal text-[#9C9896] relative ">
            <input
              type="file"
              required
              name="thumbnail"
              accept="image/jpeg,image/png"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleChange}
            />
            {preview ? (
              <img
                src={preview}
                alt="Selected Thumbnail"
                className="h-full w-full object-cover rounded-xl"
              />
            ) : (
              "Add Banner"
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">
            Subscription Name
          </p>
          <input
            type="text"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4]"
            placeholder="Enter the name"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <p className="text-sm font-sans font-semibold text-userblack">
            Description
          </p>
          <textarea
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4] h-40"
            placeholder="Enter the description"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <p className="text-sm font-sans font-semibold text-userblack">
            Amount $
          </p>
          <input
            required
            type="text"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
// only number input allowed
              if (/^\d*$/.test(value)) {
                setAmount(value);
              }
            }}
            className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4] "
            placeholder="Enter the amount"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">Type</p>
          <div className="flex items-center w-full border border-[#E7E5E4] bg-white rounded-xl">
            <select
              required
              value={recurringInterval} // Bind the value to the state
              onChange={(e) => setRecurringInterval(e.target.value)}
              className="bg-white py-3 px-4 rounded-xl  focus:outline-none text-[#9C9896] font-sans font-normal text-sm w-full"
            >
              <option disabled value="">
                Select
              </option>
              <option value="year">Annual</option>
              <option value="month">Monthly</option>
            </select>
            <span className=" py-3 px-4  ">
              <DownArrow />
            </span>
          </div>
        </div>
        <div className="w-1/3">
          <button
            type="submit"
            className="bg-[#AE445A] p-4 rounded-lg border border-[#B7B7B7] w-full text-base font-sans font-bold text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
