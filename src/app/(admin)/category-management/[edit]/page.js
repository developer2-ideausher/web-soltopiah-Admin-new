"use client";
import BackButton from "@/components/BackButton";
import LoaderLarge from "@/components/LoaderLarge";
import LoaderSmall from "@/components/LoaderSmall";
import { getImageCacheRemover } from "@/Services/Api/Badges/BadgesApi";
import { getToken } from "@/Services/Cookie/userCookie";
import emojiRegex from "emoji-regex";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Page({ params }) {
  const { edit } = params;
  const [smallLoading, setSmallLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    thumbnail: null,
    name: "",
    description: "",
    pageType: "none",
  });

  const [initialData, setInitialData] = useState({
    thumbnail: null,
    name: "",
    description: "",

    pageType: "none",
  });

  const [preview, setPreview] = useState(null);
  const router = useRouter();
  const token = getToken();

  const removeEmojis = (input) => {
    const regex = emojiRegex();
    return input.replace(regex, "");
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    if (files) {
      setPreview(URL.createObjectURL(files[0]));
    }
    let sanitizedValue = value;
    if (name === "name" || name === "description") {
      sanitizedValue = removeEmojis(value);
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: sanitizedValue,
    }));
  };

  const isFormChanged =
    formData.thumbnail !== initialData.thumbnail ||
    formData.name !== initialData.name ||
    formData.description !== initialData.description ||
    formData.pageType !== initialData.pageType;

  const patchCategoryApi = () => {
    setSmallLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const formdata = new FormData();
    formdata.append("title", formData.name);
    formdata.append("description", formData.description);
    formdata.append("pageType", formData.pageType);
    if (formData.thumbnail instanceof File) {
      formdata.append("image", formData.thumbnail);
    }

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(process.env.NEXT_PUBLIC_URL + "/categories/" + edit, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        toast.success("Category Edited");
        setSmallLoading(false);
        router.push("/category-management");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error Occurred");
      });
  };

  const getOneCategoryData = () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(process.env.NEXT_PUBLIC_URL + "/categories/" + edit, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        const fetchedData = {
          thumbnail: result.data?.image?.url,
          name: result.data?.title,
          description: result.data?.description,
          pageType: result.data?.pageType || "none", 
        };
        setFormData(fetchedData);
        setInitialData(fetchedData);
        setPreview(result.data?.image?.url);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (edit) {
      getOneCategoryData();
    }
  }, [edit]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormChanged) {
      patchCategoryApi();
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center gap-5">
        <Link href="/category-management">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Category management
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
                onChange={handleChange}
              />
              {preview ? (
                <img
                  src={getImageCacheRemover(preview, "image1.png")}
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
              Name
            </p>
            <input
              type="text"
              name="name"
              className="py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal text-black"
              placeholder="Enter title"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-sans font-semibold text-userblack">
              Description
            </p>
            <textarea
            rows={5}
              type="text"
              name="description"
              className="py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal text-black"
              placeholder="Enter title"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-sans font-semibold text-userblack">
              Page Type
            </p>
            <select
              name="pageType"
              value={formData.pageType}
              onChange={handleChange}
              className="py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal text-black focus:outline-none"
            >
              <option value="homescreen">Homescreen</option>
              <option value="sleep">Sleep</option>
              <option value="none">None</option>
            </select>
          </div>

          <div className="w-1/2">
            <button
              type="submit"
              disabled={!isFormChanged}
              className={`text-base font-sans font-semibold w-full p-4 rounded-lg flex items-center justify-center ${
                isFormChanged
                  ? "bg-[#AE445A] text-white"
                  : "bg-[#c08e97] text-white cursor-not-allowed"
              }`}
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
