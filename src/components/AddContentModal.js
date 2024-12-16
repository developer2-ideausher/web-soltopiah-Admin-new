import React, { useEffect, useState } from "react";
import BlackCross from "../../icons/BlackCross";
import Search from "../../icons/Search";
import ModalImage from "../../public/ModalImage.png";
import { getToken } from "@/Services/Cookie/userCookie";
import RobinPagination from "./Pagination";
import { getAddContentChapters } from "@/Services/Api/Challenge/challenge";
import LoaderLarge from "./LoaderLarge";

function AddContentModal({ onclose, onSave }) {
  const [content, setContent] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  // Debounce the search term by 2 seconds
  useEffect(() => {
    if (searchTerm.trim() === "") {
      // If search term is empty, update debouncedSearchTerm immediately
      setDebouncedSearchTerm("");
      setCurrentPage(1); // Reset to first page
    } else {
      // Otherwise, debounce the search term
      const handler = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
        setCurrentPage(1); // Reset to first page on new search
      }, 2000);

      // Cleanup the timeout if searchTerm changes before 2 seconds
      return () => {
        clearTimeout(handler);
      };
    }
  }, [searchTerm]);
  const fetchData = async (page, search) => {
    setLoading(true);
    setContent([]);

    const result = await getAddContentChapters(page, search);

    if (result.status) {
      console.log(result.data.results);
      setContent(result.data.results);
      setTotalPages(result.data.totalPages);
    } else {
      console.error(result.message);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchData(currentPage, debouncedSearchTerm);
  }, [currentPage, debouncedSearchTerm]);
  const handleFileClick = (file) => {
    setSelectedFile(file); // Set the selected file
  };

  const handleSave = () => {
    if (selectedFile) {
      onSave(selectedFile);
    }
    onclose();
  };
  const handleReset = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setCurrentPage(1);
    setSelectedFile(null);
  };

  return (
    <div className="bg-white flex flex-col gap-8 w-[614px] p-4 max-h-[80vh] rounded-xl ">
      <div className="flex flex-row items-center justify-between ">
        <p className="text-base font-sans font-semibold text-userblack">
          Add content to course
        </p>
        <div className="flex flex-row items-center gap-2">
          <div className="rounded-full bg-[#E9EBF7] border border-[#D6DAF0] flex flex-row items-center gap-1 p-1">
            <Search />
            <input
              type="text"
              className="w-full bg-[#E9EBF7] rounded-xl text-xs font-sans font-normal "
              placeholder="Search for audio and video content"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={onclose}>
            <BlackCross />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 overflow-y-scroll">
        {loading && (
          <div className="flex justify-center bg-white items-center p-10 w-full ">
            <LoaderLarge />
          </div>
        )}
        {!loading && content && content.length === 0 && (
          <div className="flex justify-center items-center bg-white p-10 w-full">
            {searchTerm ? (
              <p className="text-gray-500 text-sm">
                No data found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            ) : (
              <p className="text-gray-500 text-sm">No data found.</p>
            )}
          </div>
        )}
        {content.map((item) => (
          <div
            key={item._id}
            className={`flex flex-row gap-2 items-start p-2 cursor-pointer  ${
              selectedFile === item
                ? "border-green-500 border-2 rounded-lg"
                : ""
            }`}
            onClick={() => handleFileClick(item)}
          >
            <img
              className="w-20 h-20 object-cover rounded-lg"
              src={item.thumbnail.url}
              alt="content"
            />
            <div className="flex flex-col gap-2 ">
              <p className="text-xs font-sans font-normal text-[#3090E9]">
                {item.type}
              </p>
              <p className="text-sm font-sans font-semibold text-userblack">
                {item.title}
              </p>
              <p className="text-xs font-sans font-normal text-[#848BB3]">
                {item.durationInMinutes} minutes
              </p>
            </div>
          </div>
        ))}
      </div>
      {content && content.length > 0 && (
        <RobinPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      <div className="flex flex-row justify-between items-center gap-3">
        <button
          onClick={handleReset}
          className="bg-[#C8C8C8] text-black p-3 rounded-lg w-full text-base font-sans font-normal"
        >
          Reset
        </button>
        <button
          onClick={handleSave}
          className="bg-[#AE445A] text-white p-3 rounded-lg w-full text-base font-sans font-normal"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddContentModal;
