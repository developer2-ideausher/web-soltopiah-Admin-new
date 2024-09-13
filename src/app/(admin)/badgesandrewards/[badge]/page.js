"use client";
import BackButton from "@/components/BackButton";
import LoaderLarge from "@/components/LoaderLarge";
import LoaderSmall from "@/components/LoaderSmall";
import { getImageCacheRemover, getOneBadgeApi, patchApi } from "@/Services/Api/Badges/BadgesApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Profile from "../../../../../public/Profile.png"

function Page({ params }) {
  const { badge } = params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [smallLoading, setSmallLoading] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    const result = await getOneBadgeApi(badge);
    if (result.status) {
      console.log(result.data);
      setData(result.data);
      setPreview(result.data.photo?.url || null);
      setDescription(result.data.description || "");
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setIsFormChanged(true);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setIsFormChanged(true);
  };
  const patchData = async (e) => {
    setSmallLoading(true)
    e.preventDefault();
    if (selectedFile || description !== data.description) {
      const result = await patchApi(badge, selectedFile, description);
      if (result.status) {
        toast.success(
          "Badge photo updated successfully!",
          router.push("/badgesandrewards")
        );
      } else {
        toast.error(result.message);
      }
    }
    setSmallLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, [badge]);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-row items-center gap-5">
        <Link href="/badgesandrewards">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Badges and Rewards
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center p-10 w-full ">
          <LoaderLarge />
        </div>
      ) : (
        <form onSubmit={patchData} className="flex flex-col gap-7 w-1/2 ">
          <div className="py-3 px-4 w-[168px]  overflow-hidden gap-3 rounded-xl bg-white border border-[#E7E5E4] flex flex-col items-center justify-center relative">
            <input
              type="file"
              name="thumbnail"
              accept="image/jpeg,image/png"
              className="absolute inset-0 opacity-0 cursor-pointer "
              onChange={handleChange}
            />

            {preview ? (
              <img
              src={getImageCacheRemover(preview, "Profile.png")}
                alt="Selected Thumbnail"
                className="h-full w-full object-cover rounded-xl shadow-lg"
              />
            ) : (
              "Add Banner"
            )}
            <span className=" w-12 flex items-center justify-center    text-red-500 text-sm font-semibold ">
              Update
            </span>
          </div>
          <div>
            <p className="text-base font-sans text-[#252322] font-semibold">
              Badge Name
            </p>
            <p className="text-[#414554] text-base capitalize font-sans font-normal">
              {data.name}
            </p>
          </div>
          <div>
            <p className="text-base font-sans text-[#252322] font-semibold">
              Awarding Condition
            </p>
            <p className="text-[#414554] text-base font-sans font-normal">
              {data.criteria}
            </p>
          </div>
          <div className="w-4/5 flex flex-col gap-2">
            <p className="text-base font-sans text-[#252322] font-semibold">
              Description
            </p>
            <textarea
              className="text-[#414554] text-base font-sans font-normal rounded-md p-2"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="w-1/3">
            <button
              type="submit"
              className={`text-base font-sans font-semibold w-full p-4 rounded-lg flex items-center justify-center ${
                isFormChanged
                  ? "bg-[#AE445A] text-white"
                  : "bg-[#c08e97] text-white cursor-not-allowed"
              }`}
              disabled={!isFormChanged}
            >
              {!smallLoading ? "Save" : <LoaderSmall />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Page;
