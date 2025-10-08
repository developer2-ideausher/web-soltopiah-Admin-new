"use client";
import BackButton from "@/components/BackButton";
import Modal from "@/components/Modal";
import RobinPagination from "@/components/Pagination";
import {
  getAllChaptersForPlaylists,
  createPlaylist,
} from "@/Services/Api/Guide/GuideApi";
import { CloudUpload, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Page = () => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [selected, setSelected] = useState("audio");
  const [content, setContent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const [smallLoading, setSmallLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      media: "audio",
      accessType: "Premium",
      chapters: [],
    },
  });

  const watchedAccessType = watch("accessType");
  const watchedMedia = watch("media");

  const fetchContentData = async (search = "", page = 1) => {
    setSmallLoading(true);
    try {
      const result = await getAllChaptersForPlaylists(selected, search, page);
      if (result.data) {
        setChapters(result.data?.results || []);
        setTotalPages(result.data?.totalPages || 1);
        setCurrentPage(result.data.page || 1);
      }
    } catch (error) {
      toast.error(error.message || "Error occurred, please try again");
    }
    setSmallLoading(false);
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };
  const handleContentSelect = (contentId) => {
    setSelectedContent(contentId);
  };
  const router = useRouter();

  const handleAddContent = () => {
    if (selectedContent) {
      const selectedChapter = chapters.find((ch) => ch._id === selectedContent);
      if (selectedChapter && !content.find((c) => c._id === selectedContent)) {
        const newContent = [...content, selectedChapter];
        setContent(newContent);
        setValue(
          "chapters",
          newContent.map((c) => c._id)
        );
        toast.success("Content added successfully");
      }
      setSelectedContent("");
      setShowModal(false);
    }
  };

  const handleRemoveContent = (contentId) => {
    const newContent = content.filter((c) => c._id !== contentId);
    setContent(newContent);
    setValue(
      "chapters",
      newContent.map((c) => c._id)
    );
    toast.success("Content removed");
  };

  const handleImageChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(String(reader.result));
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  };

  const onSubmit = async (data) => {
    if (!file) {
      toast.error("Please upload a thumbnail image");
      return;
    }

    if (data.chapters.length === 0) {
      toast.error("Please add at least one content item to the playlist");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", data.name);
      formData.append("description", data.description);
      formData.append("type", data.media);
      formData.append("thumbnail", file);

      data.chapters.forEach((chapterId) => {
        formData.append("chapters[]", chapterId);
      });

      const result = await createPlaylist(formData);
      if (result) {
        toast.success("Playlist created successfully");
        router.push("/playlists");
      }
    } catch (error) {
      toast.error(error.message || "Error creating playlist");
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurrentPage(1);
      fetchContentData(searchQuery, 1);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selected]);

  useEffect(() => {
    if (showModal) {
      fetchContentData(searchQuery, currentPage);
    }
  }, [currentPage, selected]);
  useEffect(() => {
    setValue("media", selected);
  }, [selected, setValue]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/playlists">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Create Playlists
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-2/5 mt-4"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="thumbnail"
            className="text-base font-semibold nuni text-userblack"
          >
            Thumbnail Image <span className="text-red-500">*</span>
          </label>

          <div className="relative 2xl:w-40 2xl:h-40 w-32 h-32 border border-dashed border-primary rounded-lg flex items-center justify-center shadow-md">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {preview ? (
              <img
                src={preview}
                alt="Thumbnail Preview"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <div className="flex flex-col gap-2 items-center justify-center text-center px-2 py-4">
                <CloudUpload color="gray" />
                <p className="2xl:text-sm text-xs font-semibold nuni text-gray-400">
                  Browse and choose the files you want to upload from your
                  computer.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-base font-semibold nuni text-userblack"
            htmlFor="name"
          >
            Name of Playlist <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Playlist name is required" })}
            className="py-3 px-4 rounded-xl border border-[#E7E5E4] bg-white text-sm font-sans font-normal text-userblack"
            placeholder="Enter Name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-base font-semibold nuni text-userblack"
            htmlFor="Description"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            id="Description"
            {...register("description", {
              required: "Description is required",
            })}
            className="py-3 px-4 rounded-xl border border-[#E7E5E4] bg-white text-sm font-sans font-normal text-userblack"
            placeholder="Enter Description"
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold nuni text-userblack">
            Media <span className="text-red-500">*</span>
          </p>
          <select
            {...register("media")}
            value={selected}
            onChange={(e) => {
              if (content.length > 0) {
                toast.error(
                  "Cannot change media type after adding content. Please remove all content first."
                );
                return;
              }
              setSelected(e.target.value);
              setValue("media", e.target.value);
            }}
            disabled={content.length > 0}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Select option</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
        </div>

        {/* <div className="flex flex-col gap-2">
          <p className="text-base font-semibold nuni text-userblack">
            Access Type <span className="text-red-500">*</span>
          </p>
          <div className="grid grid-cols-2 gap-2 justify-between items-center">
            <div
              onClick={() => setValue("accessType", "Free")}
              className={`flex flex-row justify-between items-center gap-3 w-full bg-white rounded-lg p-3 border cursor-pointer transition-all ${
                watchedAccessType === "Free"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className="text-gray-900 font-medium">Free</p>
              <div
                className={`rounded-full w-5 h-5 border-2 flex items-center justify-center ${
                  watchedAccessType === "Free"
                    ? "border-green-500 bg-green-500"
                    : "border-gray-300"
                }`}
              >
                {watchedAccessType === "Free" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>

            <div
              onClick={() => setValue("accessType", "Premium")}
              className={`flex flex-row justify-between items-center gap-3 w-full bg-white rounded-lg p-3 border cursor-pointer transition-all ${
                watchedAccessType === "Premium"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className="text-gray-900 font-medium">Premium</p>
              <div
                className={`rounded-full w-5 h-5 border-2 flex items-center justify-center ${
                  watchedAccessType === "Premium"
                    ? "border-green-500 bg-green-500"
                    : "border-gray-300"
                }`}
              >
                {watchedAccessType === "Premium" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        </div> */}

        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold nuni text-userblack">
            Add Content <span className="text-red-500">*</span>
          </p>
          <div className="bg-white rounded-lg p-3 border border-gray-300 flex flex-col gap-2">
            {content?.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-4">
                <p className="text-xl font-semibold text-userblack font-sans">
                  No content
                </p>
                <p className="text-xs font-normal text-[#25232270] font-sans">
                  Please add audio or videos to your playlist
                </p>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="p-3 mt-5 bg-[#3090E933] rounded-full font-semibold text-base flex flex-row items-center gap-2 text-[#3090E9]"
                >
                  <Plus />
                  Add Content
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {content.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-row justify-between items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200"
                  >
                    <div className="flex flex-row items-start gap-3">
                      <img
                        className="w-14 h-16 object-cover rounded"
                        src={item.thumbnail?.url}
                        alt="content thumbnail"
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='64' viewBox='0 0 56 64'%3E%3Crect width='56' height='64' fill='%23f3f4f6'/%3E%3Ctext x='28' y='32' text-anchor='middle' fill='%236b7280' font-size='12'%3EImage%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <div className="flex flex-col gap-1">
                        <span className="text-[#3090E9] font-normal text-xs">
                          {item.type}
                        </span>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-md">
                          {item.title}
                        </p>
                        <span className="text-[#848BB3] font-normal text-xs">
                          {item.durationInMinutes} min
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveContent(item._id)}
                      className="p-1 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                    >
                      <X size={16} className="text-red-600" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="p-2 mt-2 bg-[#3090E933] rounded-lg font-semibold text-sm flex flex-row items-center justify-center gap-2 text-[#3090E9]"
                >
                  <Plus size={18} />
                  Add More Content
                </button>
              </div>
            )}
          </div>
          {errors.chapters && (
            <p className="text-red-500 text-xs">{errors.chapters.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="p-3 w-2/5 mt-4 bg-[#AE4455] rounded-lg text-white font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : "Save and Upload"}
        </button>
      </form>

      {showModal && (
        <Modal>
          <div className="w-[70vh] bg-white flex flex-col gap-3 rounded-lg p-3">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-between w-full">
                <p className="text-base font-semibold nuni text-userblack">
                  Add Content to playlist
                </p>
                <div className="flex flex-row items-center gap-3">
                  <div className="flex flex-row items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
                    <Search size={14} />
                    <input
                      value={searchQuery}
                      onChange={handleSearch}
                      type="text"
                      className="bg-gray-100 border-none outline-none text-sm"
                      placeholder="Search content"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setSelectedContent("");
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="p-1 bg-gray-200 rounded-full items-center gap-2 text-userblack"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
              {smallLoading ? (
                <p className="text-center py-4 text-gray-500">Loading...</p>
              ) : chapters.length === 0 ? (
                <p className="text-center py-4 text-gray-500">
                  {searchQuery ? "No results found" : "No content available"}
                </p>
              ) : (
                chapters.map((item) => (
                  <div
                    key={item._id}
                    className={`flex flex-row justify-between items-center gap-3 w-full bg-white rounded-lg p-3 border cursor-pointer transition-all ${
                      selectedContent === item._id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className="flex flex-row items-start gap-3 flex-1"
                      onClick={() => {
                        if (item.media?.url) {
                          window.open(item.media.url, "_blank");
                        }
                      }}
                    >
                      <img
                        className="w-14 h-16 object-cover rounded"
                        src={item.thumbnail?.url}
                        alt="content thumbnail"
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='64' viewBox='0 0 56 64'%3E%3Crect width='56' height='64' fill='%23f3f4f6'/%3E%3Ctext x='28' y='32' text-anchor='middle' fill='%236b7280' font-size='12'%3EImage%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <div className="flex flex-col gap-1">
                        <span className="text-[#3090E9] font-normal text-xs">
                          {item.type}
                        </span>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-md">
                          {item.title}
                        </p>
                        <span className="text-[#848BB3] font-normal text-xs">
                          {item.durationInMinutes} min
                        </span>
                      </div>
                    </div>
                    <div
                      onClick={() => handleContentSelect(item._id)}
                      className={`rounded-full w-5 h-5 border-2 flex items-center justify-center ${
                        selectedContent === item._id
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedContent === item._id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))
              )}
              {chapters && chapters.length > 0 && (
                <RobinPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>

            <div className="flex flex-row justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setSelectedContent("");
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddContent}
                disabled={!selectedContent}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedContent
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Add to Playlist
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Page;
