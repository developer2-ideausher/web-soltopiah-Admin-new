"use client";
import BackButton from "@/components/BackButton";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import GreenThumbsUp from "../../../../../../icons/GreenThumbsUp";
import RedDown from "../../../../../../icons/RedDown";
import RedRecycle from "../../../../../../icons/RedRecycle";
import RedEdit from "../../../../../../icons/RedEdit";
import RedDustbin from "../../../../../../icons/RedDustbin";
import MaroonDustbin from "../../../../../../icons/MaroonDustbin";
import {
  commentApi,
  createPost,
  deleteForumPost,
  getChallengeForumPosts,
  getReplies,
} from "@/Services/Api/Challenge/challenge";
import dayjs from "dayjs";
import LoaderSmall from "@/components/LoaderSmall";
import { toast } from "react-toastify";
import LoaderLarge from "@/components/LoaderLarge";

function Page({ params }) {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentsId, setCommentsId] = useState("");
  const [repliesId, setRepliesId] = useState("");
  const [showSection, setShowSection] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [smallLoading, setSmallLoading] = useState(false);
  const searchParams = useSearchParams();
  const { chdetails } = params;
  const day = searchParams.get("day");
  const numberDay = Number(day);

  const fetchData = async (chdetails, day) => {
    setLoading(true);
    const result = await getChallengeForumPosts(chdetails, day);

    if (result.status) {
      console.log(result.data.results);
      setPosts(result.data.results);
    } else {
      console.error(result.message);
    }

    setLoading(false);
  };

  const fetchReplyData = async (chdetailsId) => {
    setLoading(true);
    const result = await getReplies(chdetailsId);

    if (result.status) {
      console.log(result.data.results);
      setReplies(result.data.results);
    } else {
      console.error(result.message);
    }

    setLoading(false);
  };
  const fetchCommentData = async (chdetailsId) => {
    // setLoading(true);
    const result = await commentApi(chdetailsId);

    if (result.status) {
      console.log(result.data.results);
      setComments(result.data.results);
    } else {
      console.error(result.message);
    }

    setLoading(false);
  };

  const handleCreatePost = async (chdetails, numberDay) => {
    setSmallLoading(true);
    const result = await createPost(chdetails, numberDay, postContent);
    if (result.status) {
      fetchData(chdetails, day);
      toast.success("Post created successfully");
      setPostContent("");
    } else {
      console.error(result.message);
    }

    setSmallLoading(false);
  };
  const handleDeleteForumPost = async (postId) => {
    toast.error("Deleting");
    setLoading(true);
    const result = await deleteForumPost(postId);

    if (result.status) {
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      toast.success("Post deleted successfully");
    } else {
      console.error(result.message);
    }

    // catch (error) {
    //   console.error("Error deleting post:", error);
    //   toast.error("An error occurred");
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fetchData(chdetails, day);
  }, [chdetails, day]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <div onClick={() => router.back()}>
          <BackButton />
        </div>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Forum Day -{" " + day}
        </p>
      </div>
      <form className="flex flex-col gap-5 bg-white p-4 rounded-md">
        <p className="text-sm font-sans font-semibold text-[#71737F]">
          Add Day - {" " + day} Thread
        </p>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="py-3 px-4 border border-[#E7E5E4] rounded-xl text-sm font-sans font-normal text-black"
          placeholder="Ex. 12 sessions completed"
        ></textarea>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleCreatePost(chdetails, numberDay);
          }}
          className="p-4 rounded-lg bg-[#AE445A] w-2/12 text-base font-sans font-black text-white flex items-center justify-center"
        >
          {smallLoading ? <LoaderSmall /> : "Save"}
        </button>
      </form>
      {loading && (
              <div className="flex justify-center  items-center p-10 w-full ">
                <LoaderLarge />
              </div>
            )}
      {posts &&
        posts.map((item, index) => (
          <div
            key={item._id || index}
            className="flex flex-col gap-3 bg-white p-4 rounded-md"
          >
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <p className="text-2xl font-sans font-semibold text-userblack">
                  Soltopiah
                </p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <RedEdit />
                <button
                  className="cursor-pointer"
                  onClick={() => handleDeleteForumPost(item._id)}
                >
                  <RedRecycle />
                </button>
              </div>
            </div>
            <p className="text-base font-sans font-semibold text-userblack w-[94%]">
              {item.content}
            </p>
            <div className="flex flex-row items-center gap-3">
              <p className="text-[#3090E9] text-sm font-sans font-semibold uppercase">
                Comment
              </p>
              <button
                onClick={() => {
                  if(showSection===item._id){
                    setShowSection("")
                  }
                  else{
                    setShowSection(item._id)
                    fetchCommentData(item._id);

                  }
                }}
                className="flex flex-row items-center gap-1"
              >
                <p className="text-sm font-sans font-semibold text-[#AE445A]">
                  {item.commentsCount} comments
                </p>

                <RedDown />
              </button>
              <div className="flex flex-row items-center gap-1">
                <p className="text-xs font-sans font-normal text-[#08A03C]">
                  {item.likesCount + " "}likes
                </p>
                <GreenThumbsUp />
              </div>
            </div>
           
            {(item._id===showSection) && (
              <div className="flex flex-col border-t ml-20 mt-4">
                {comments.length > 0 ? (
                  comments.map((item) => (
                    <div key={item._id} className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-end gap-3">
                          <p className="text-2xl font-sans font-semibold text-[#414554]">
                            {item.author.firstName} {item.author.lastName}
                          </p>
                          <p className="text-[#888A94] font-sans font-xs font-semibold">
                            {dayjs(item.createdAt).format("DD/MM/YYYY, HH:mm")}
                          </p>
                        </div>
                        <MaroonDustbin />
                      </div>
                      <p className="text-base font-semibold text-[#414554] font-sans">
                        {item.content}
                      </p>
                      <button
                        onClick={() => {
                          if(commentsId){
                            setCommentsId("")
                          }
                          else{
                            setCommentsId(item._id)
                          }
                        }}
                        className="flex justify-start text-[#3090E9] font-sans font-semibold text-base"
                      >
                        Reply 
                      </button>
                      {commentsId === item._id && (
                        <>
                        <div className="flex items-center gap-3">
                          <p className="ml-8 font-sans font-semibold text-userblack text-base ">Soltopiah Replied :</p>
                          <p className=" font-sans font-semibold text-userblack text-base ">Amamzing! Looking forward to it</p>
                          <p className="font-sans font-semibold text-gray-500 text-xs ">. 1 min ago</p>
                        </div>
                        <div className="flex items-center justify-center gap-10 mb-5">
                          <textarea
                            placeholder="Enter your reply!"
                            className="border font-sans text-sm font-medium shadow-md border-[#E7E5E4] py-3 px-4 rounded-xl w-4/5 flex justify-start"
                          ></textarea>
                          <button className="py-4 px-8 bg-[#AE445A] font-sans border-[#B7B7B7] rounded-lg  text-white font-bold text-base ">
                            Save
                          </button>
                        </div>
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#888A94]">No comments yet.</p>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default Page;
