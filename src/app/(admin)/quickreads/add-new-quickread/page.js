"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useState } from "react";
import UploadImage from "../../../../../icons/UploadImage";
import { getToken } from "@/Services/Cookie/userCookie";
import { ToastContainer, toast } from "react-toastify";

function Page() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const token = getToken();

  const postNewQuickReadApi = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const formdata = new FormData();

    for (let i = 0; i < images.length; i++) {
      formdata.append("pictures", images[i].file);
    }

    formdata.append("title", title);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(process.env.NEXT_PUBLIC_URL + "/quick-reads", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => console.error(error));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      toast.error("You can only upload up to 5 images");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 5));
  };
  console.log(images);
  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/quickreads">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Add new quick read
        </p>
      </div>
      <form
        onSubmit={postNewQuickReadApi}
        className="flex flex-col gap-5 w-1/3"
      >
        <div className="flex flex-col gap-2 ">
          <p className="text-sm font-sans font-semibold text-black">Title</p>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="py-3 px-4 rounded-xl border border-[#E7E5E4] bg-white"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <p className="text-sm font-sans font-semibold text-black">
            Upload slides
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative bg-[#E5E7F5] border-2 border-dashed border-[#D3D6EE] p-6"
              >
                <img
                  src={image.url}
                  alt={`Upload Preview ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute w-8 h-8 top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => handleImageRemove(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <div className="py-3 px-4 rounded-lg border border-[#D3D6EE] bg-[#E5E7F5] h-40 relative flex flex-col items-center gap-3">
            <div className="bg-[#DADDF1] rounded-full p-3">
              <UploadImage />
            </div>
            <p className="text-sm font-sans font-normal text-[#9C9896]">
              Drag and drop image (PNG, JPG or JPEG) or
            </p>
            <p className="text-[#4655B9] text-sm font-sans font-semibold">
              Choose File
            </p>
            <p className="text-sm font-sans font-normal text-[#9C9896]">
              {images.length} / 5 images uploaded
            </p>
            <input
              type="file"
              className="absolute opacity-0 inset-0"
              accept="image/png, image/jpeg, image/jpg"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#AE445A] text-base font-sans rounded-lg font-black p-4 w-2/5 text-white"
        >
          Save and publish
        </button>
      </form>
    </div>
  );
}

export default Page;
