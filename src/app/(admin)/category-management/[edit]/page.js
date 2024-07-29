"use client";
import BackButton from "@/components/BackButton";
import { getToken } from "@/Services/Cookie/userCookie";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page({params}) {
  const { edit } = params;
  const [formData, setFormData] = useState({
    thumbnail: null,
    name: "",
  });
  const [initialData, setInitialData] = useState({
    thumbnail: null,
    name: "",
  });
  const [preview, setPreview] = useState(null);
  // const searchParams = useSearchParams();
  // const reqId = searchParams.get("requestID");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    if (files) {
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const isFormChanged =
    formData.thumbnail !== initialData.thumbnail ||
    formData.name !== initialData.name;

  const router = useRouter();
  const token = getToken();

  const patchCategoryApi = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const formdata = new FormData();
    formdata.append("title", formData.name);
    if (formData.thumbnail instanceof File) {
      formdata.append("image", formData.thumbnail);
    }

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,

      body: formdata,
      redirect: "follow",
    };

    fetch(
      process.env.NEXT_PUBLIC_URL +"/course-categories/" +edit,
      requestOptions
    )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      router.push("/category-management");
    })
    .catch((error) => console.error(error));
};

  const getOneCategoryData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      process.env.NEXT_PUBLIC_URL + "/course-categories/"+ edit,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const fetchedData = {
          thumbnail: result.data.image.url,
          name: result.data.title,
        };
        setFormData(fetchedData);
        setInitialData(fetchedData);
        setPreview(result.data.image.url);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (edit) {
      getOneCategoryData();
    }
  }, [edit]);

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

      <form onSubmit={handleSubmit} className="flex flex-col w-1/3 gap-10">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">
            Thumbnail
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
          <p className="text-sm font-sans font-semibold text-userblack">Name</p>
          <input
            type="text"
            name="name"
            className="py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal text-black"
            placeholder="Enter title"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="w-1/2">
          <button
            type="submit"
            disabled={!isFormChanged}
            className={`text-base font-sans font-semibold w-full p-4 rounded-lg ${
              isFormChanged
                ? "bg-[#AE445A] text-white"
                : "bg-[#c08e97] text-white cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
