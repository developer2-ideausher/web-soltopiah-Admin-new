"use client";
import BackButton from "@/components/BackButton";
import CropModal from "@/components/CropModal";
import LoaderSmall from "@/components/LoaderSmall";
import { getToken } from "@/Services/Cookie/userCookie";
import { getCroppedImg } from "@/Utilities/helper";
import emojiRegex from "emoji-regex";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
// import CropModal from "@/components/CropModal"; 
// import { getCroppedImg } from "@/Utilities/helper"; 

function Page() {
  const [smallLoading, setSmallLoading] = useState(false);
  const [formData, setFormData] = useState({
    thumbnail: null,
    name: "",
    description: "",
    pageType: "",
  });
  const [preview, setPreview] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);

  const removeEmojis = (input) => {
    const regex = emojiRegex();
    return input.replace(regex, "");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (files && files[0]) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setOriginalImage(imageUrl);
      setCropModalOpen(true);
    } else {
      let sanitizedValue = value;
      if (name === "name" || name === "description") {
        sanitizedValue = removeEmojis(value);
      }
      setFormData({
        ...formData,
        [name]: sanitizedValue,
      });
    }
  };

  const handleCropComplete = async (croppedAreaPixels) => {
    try {
      const croppedImage = await getCroppedImg(originalImage, croppedAreaPixels);
      const croppedImageUrl = URL.createObjectURL(croppedImage);
      
      setFormData({
        ...formData,
        thumbnail: croppedImage,
      });
      setPreview(croppedImageUrl);
      setCropModalOpen(false); 
    } catch (e) {
      console.error(e);
      toast.error("Failed to crop image");
    }
  };

  const handleCropCancel = () => {
    setCropModalOpen(false);
    setOriginalImage(null);
    const fileInput = document.querySelector('input[name="thumbnail"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const isFormValid = formData.thumbnail && formData.name && formData.description && formData.pageType;
  const router = useRouter();
  const token = getToken();

  const postCategory = (e) => {
    e.preventDefault();
    setSmallLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const formdata = new FormData();
    formdata.append("title", formData.name);
    formdata.append("description", formData.description);
    formdata.append("image", formData.thumbnail);
    formdata.append("pageType", formData.pageType);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(process.env.NEXT_PUBLIC_URL + "/categories", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        toast.success("Category Created");
        setSmallLoading(false);
        router.push("/category-management");
      })
      .catch((error) => {
        toast.error("Error occurred");
        console.error(error);
        setSmallLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center gap-5">
        <Link href="/category-management">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Create Category 
        </p>
      </div>

      <form onSubmit={postCategory} className="flex flex-col w-1/3 gap-10">
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
                className="h-full w-full object-contain rounded-xl"
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
        
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">Description</p>
          <textarea
            name="description"
            className="py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal text-black"
            placeholder="Enter description"
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
            <option disabled value="">
              Select
            </option>
            <option value="homescreen"> Home-Screen</option>
            <option value="sleep"> Sleep</option>
            <option value="none"> None</option>
          </select>
        </div>
        
        <div className="w-1/2">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`text-base font-sans font-semibold w-full p-4 rounded-lg flex items-center justify-center ${
              isFormValid
                ? "bg-[#AE445A] text-white"
                : "bg-[#c08e97] text-white cursor-not-allowed"
            }`}
          >
            {!smallLoading ? "Save" : <LoaderSmall />}
          </button>
        </div>
      </form>

      <CropModal
        isOpen={cropModalOpen}
        onClose={handleCropCancel}
        imageSrc={originalImage}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
}

export default Page;