"use client";
import BackButton from "@/components/BackButton";
import LoaderLarge from "@/components/LoaderLarge";
import LoaderSmall from "@/components/LoaderSmall";
import { getImageCacheRemover } from "@/Services/Api/Badges/BadgesApi";
import { getOneGoal, updateGoal } from "@/Services/Api/Goals/goal";
import { getToken } from "@/Services/Cookie/userCookie";
import emojiRegex from "emoji-regex";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Page({ params }) {
  const { edit } = params;
  console.log(edit);
  const [smallLoading, setSmallLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);

  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [initialName, setInitialName] = useState("");
  const [newFile, setNewFile] = useState(null);
  const router = useRouter();

  const removeEmojis = (input) => {
    const regex = emojiRegex();
    return input.replace(regex, "");
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const blobUrl = URL.createObjectURL(file);
    setPreview(blobUrl);
    setNewFile(file);
  };
  const isFormChanged = name.trim() !== initialName.trim() || newFile !== null;

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getOneGoal(edit);
      if (result.status) {
        setData(result.data);
        setName(result.data.title)
        setInitialName(result.data.title);
        setPreview(
          result.data?.image
            ? (result.data.image?.url)
            : null
        );
        setNewFile(null);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong,try again");
    }
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormChanged) return;

    setSmallLoading(true);
    try {
      const payload = {};
      if (name.trim() !== initialName.trim()) {
        payload.title = removeEmojis(name.trim());
      }
      if (newFile) {
        payload.image = newFile;
      }

      const result = await updateGoal(edit, payload);

      if (result.status) {
        toast.success("Goal updated successfully");
        router.push("/goals");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSmallLoading(false);
    }
  };
  useEffect(() => {
    if (edit) fetchData();
  }, [edit]);
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center gap-5">
        <Link href="/goals">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Goal management
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center p-10 w-full ">
          <LoaderLarge />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col w-1/3 gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-sans font-semibold text-userblack">
              Thumbnail
            </p>
            <div className="py-3 px-4 w-[168px] rounded-xl bg-white border border-[#E7E5E4] h-40 flex items-center justify-center text-sm font-sans font-normal text-[#9C9896] relative">
              <input
                type="file"
                name="thumbnail"
                accept="image/jpeg,image/png"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              {preview ? (
                <img
                  src={preview}
                  alt="Selected Thumbnail"
                  className="h-full w-full object-contain rounded-xl"
                />
              ) : (
                "Add Banner"
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-sans font-semibold text-userblack">
              Goal Name
            </p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              className="py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal text-black"
              placeholder="Enter title"
            />
          </div>
          {/* <div className="flex flex-col gap-2">
            <p className="text-sm font-sans font-semibold text-userblack">
              Description
            </p>
            <input
              type="text"
              name="description"
              className="py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal text-black"
              placeholder="Enter title"
            />
          </div> */}

          <div className="w-1/2">
            <button
            disabled={!isFormChanged || smallLoading}
              type="submit"
              className={`text-base font-sans font-semibold w-full p-4 rounded-lg flex items-center justify-center ${
                isFormChanged
                  ? "bg-[#AE445A] text-white"
                  : "bg-[#c08e97] text-white cursor-not-allowed"
              }`}
            >
              {!smallLoading ? "Update" : <LoaderSmall />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Page;
