"use client";
import BackButton from "@/components/BackButton";
import { getOneSubs, updateSubs } from "@/Services/Api/Subscriptions/Subs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DownArrow from "../../../../../icons/DownArrow";
import { useRouter } from "next/navigation";
import LoaderLarge from "@/components/LoaderLarge";
import { getImageCacheRemover } from "@/Services/Api/Badges/BadgesApi";
import { toast } from "react-toastify";

function Page({ params }) {
  const { edit } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState();
  const [initialValues, setInitialValues] = useState({});

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);

    const result = await getOneSubs(edit);
    if (result.status) {
      console.log(result.data);
      setData(result.data);
      setDisplayName(result.data.displayName);
      setDescription(result.data.description);
      setLoading(false);
      if (result.data.thumbnail) {
        setPreview(result.data.thumbnail.url);
      }
      setInitialValues({
        displayName: result.data.displayName,
        description: result.data.description,
        thumbnail: result.data.thumbnail?.url || null,
      });
    } else {
      console.error(result.message);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const hasChanges = () => {
    // Check if any of the values have changed from their initial state
    return (
      displayName !== initialValues.displayName ||
      description !== initialValues.description ||
      (thumbnail && preview !== initialValues.thumbnail)
    );
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    formData.append("description", description);
    formData.append("displayName", displayName);

    const result = await updateSubs(edit, formData);
    if (result.status) {
      // console.log("Subscription updated successfully");
      toast.success("Changes Saved")
      router.push("/subscriptions");
    } else {
      console.error(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/subscriptions">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Edit Subscription
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center ">
          <LoaderLarge />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-2/5">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-sans font-semibold text-userblack">
              Cover Image
            </p>
            <div className="py-3 px-4 w-[168px] rounded-xl bg-white border border-[#E7E5E4] h-40 flex items-center justify-center text-sm font-sans font-normal text-[#9C9896] relative ">
              <input
                type="file"
                name="thumbnail"
                accept="image/jpeg,image/png"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleChange}
              />
              {preview ? (
                <img
                  src={getImageCacheRemover(preview)}
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
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4]"
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
          <div className="w-1/3">
            <button
              disabled={!hasChanges()}
              type="submit"
              className={`text-base font-sans font-semibold w-full p-4 rounded-lg flex items-center justify-center ${
                hasChanges()
                  ? "bg-[#AE445A] text-white"
                  : "bg-[#c08e97] text-white cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Page;
