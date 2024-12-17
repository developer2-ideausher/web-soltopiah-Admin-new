"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UploadImage from "../../../../../icons/UploadImage";
import { getToken } from "@/Services/Cookie/userCookie";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LoaderSmall from "@/components/LoaderSmall";
import { tokenValidator } from "@/Utilities/helper";
import { createQuickReads } from "@/Services/Api/quickReads/quickReads";

function Page() {
  const [formData, setFormData] = useState({
    title: "",
    pictures: [],
  });
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
const router = useRouter()
  useEffect(() => {
    setIsFormValid(title.trim().length > 0 && images.length > 0);
  }, [title, images]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 12) {
      toast.error("You can only upload up to 12 images");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 12));
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await createQuickReads(title, images);
    // The responseValidator should return an object with a 
    // "status" (boolean) and "message" (string), similar to createSubs.

    if (result?.status) {
      toast.success("Quick read added");
      router.push("/quickreads");
    } else {
      toast.error(result?.message || "Error occurred while creating quick read");
    }

    setLoading(false);
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
        onSubmit={handleSubmit}
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
              {images.length} / 12 images uploaded
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
          disabled={!isFormValid}
          type="submit"
          className={`text-base font-sans font-semibold w-1/3 mt-4 p-4 rounded-lg ${
            isFormValid
              ? "bg-[#AE445A] text-white"
              : "bg-[#c08e97] text-white cursor-not-allowed"
          } flex justify-center items-center`}
        >
          {loading ? <LoaderSmall /> : "Save and publish"}
        </button>
      </form>
    </div>
  );
}

export default Page;
