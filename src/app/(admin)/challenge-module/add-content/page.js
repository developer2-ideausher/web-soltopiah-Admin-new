"use client"
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useState } from "react";
import BlueAdd from "../../../../../icons/BlueAdd";
import Modal from "@/components/Modal";
import AddContentModal from "@/components/AddContentModal";
import { useRouter } from "next/navigation";

import RedRecycle from "../../../../../icons/RedRecycle";

function Page() {
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(Array(7).fill(null));
  const [currentDay, setCurrentDay] = useState(null);
  const router = useRouter();

  const handleModal = (day) => {
    setCurrentDay(day);
    setShowModal(!showModal);
  };

  const handleSaveContent = (content) => {
    const updatedContent = [...selectedContent];
    updatedContent[currentDay - 1] = content;
    setSelectedContent(updatedContent);
    setShowModal(false);
  };

  const handleRemoveContent = (day) => {
    const updatedContent = [...selectedContent];
    updatedContent[day - 1] = null;
    setSelectedContent(updatedContent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/challenge-module");
  };

  return (
    <div>
      {showModal && (
        <Modal>
          <AddContentModal onclose={() => setShowModal(false)} onSave={handleSaveContent} />
        </Modal>
      )}

      <div className="flex flex-col gap-7">
        <div className="flex flex-row gap-5 items-center">
          <Link href="/challenge-module/create-challenge">
            <BackButton />
          </Link>
          <p className="text-xl2 font-sans font-semibold text-userblack">
            Create challenge
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-1/3">
          <p className="text-userblack text-3xl font-semibold font-sans">
            2. Add Content
          </p>
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <p className="text-sm font-sans font-semibold text-userblack">
                Day {i + 1}
              </p>
              <div
                className="bg-white p-4 rounded-xl flex flex-col justify-center items-center gap-5 relative"
              >
                {selectedContent[i] ? (
                  <>
                  
                    <img
                      src={selectedContent[i].thumbnail.url}
                      alt="selected content"
                      className=" object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleRemoveContent(i + 1)}
                      className="flex flex-row justify-center items-center text-[#000000] gap-2 bg-[#EE3E3E1A] py-2 px-3 w-full  rounded-full "
                    >
                      <RedRecycle />
                      <p className="text-sm font-sans font-semibold">
                        Remove content
                      </p>
                    </button>
                  </>
                ) : (
                  <div
                    onClick={() => handleModal(i + 1)}
                    className="flex flex-col gap-2 items-center text-center"
                  >
                    <p className="text-2xl font-sans font-semibold text-userblack">
                      No content
                    </p>
                    <p className="text-[#25232270] text-sm font-sans font-normal">
                      Please add audio or video content to your challenge
                    </p>
                    <p className="flex flex-row items-center gap-2 bg-[#3090E933] py-2 px-3 rounded-full">
                      <BlueAdd />
                      <p className="text-[#3090E9] text-sm font-sans font-semibold">
                        Add content
                      </p>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="p-4 w-2/5 mt-5 bg-[#AE445A] text-white rounded-lg font-sans text-base font-black"
          >
            Save & Finish
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
