import React, { useEffect, useState } from "react";
import BlackCross from "../../icons/BlackCross";
import Search from "../../icons/Search";
import ModalImage from "../../public/ModalImage.png";
import { getToken } from "@/Services/Cookie/userCookie";

function AddContentModal({ onclose, onSave }) {
  const [content, setContent] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const token = getToken();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(process.env.NEXT_PUBLIC_URL + "/chapters", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        setContent(result.data.results);
        console.log(result.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleFileClick = (file) => {
    setSelectedFile(file); // Set the selected file
  };

  const handleSave = () => {
    if (selectedFile) {
      onSave(selectedFile);
    }
    onclose();
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
            />
          </div>
          <button onClick={onclose}>
            <BlackCross />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 overflow-y-scroll">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          content.map((item) => (
            <div
              key={item._id}
              className={`flex flex-row gap-2 items-start  ${
                selectedFile === item ? "border-green-500 border-2 rounded-lg" : ""
              }`}
              onClick={() => handleFileClick(item)}
            >
              <img
                className="w-20 h-20 object-cover rounded-lg"
                src={item.thumbnail.url}
                alt="content"
              />
              <div className="flex flex-col gap-2">
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
          ))
        )}
      </div>
      <div className="flex flex-row justify-between items-center gap-3">
        <button
          onClick={onclose}
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
