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
  commentPost,
  createPost,
  deleteComment,
  deleteForumPost,
  deleteReply,
  getChallengeForumPosts,
  getReplies,
  patchForumPost,
  postReply,
} from "@/Services/Api/Challenge/challenge";
import dayjs from "dayjs";
import LoaderSmall from "@/components/LoaderSmall";
import { toast } from "react-toastify";
import LoaderLarge from "@/components/LoaderLarge";
import { truncateDescription } from "@/Utilities/helper";

function Page({ params }) {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [repliesMap, setRepliesMap] = useState({});
  const [repliesLoadingMap, setRepliesLoadingMap] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsId, setCommentsId] = useState("");
  const [currentReplyPage, setCurrentReplyPage] = useState(1);
  const [totalReplyPages, setTotalReplyPages] = useState(1);
  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  const [totalCommentPages, setTotalCommentPages] = useState(1);
  const [repliesContent, setRepliesContent] = useState("");
  const [showSection, setShowSection] = useState(false);
  const [showEditSection, setShowEditSection] = useState(null);
  const [showReply, setShowReply] = useState(false);
  const [postComment, setPostComment] = useState("");
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(null);
  const [smallReplyLoading, SetSmallReplyLoading] = useState(false);
  const [smallCommentLoading, setSmallCommentLoading] = useState(false);
  const [smallLoading, setSmallLoading] = useState(false);
  const [repliesLoading, setRepliesLoading] = useState(false);
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

  const fetchReplyData = async (id, page) => {
    setRepliesLoadingMap((prev) => ({ ...prev, [id]: true }));
    const result = await getReplies(id, page);

    if (result.status) {
      console.log(result.data.results);
      setRepliesMap((prev) => ({
        ...prev,
        [id]:
          page === 1
            ? result.data.results
            : [...(prev[id] || []), ...result.data.results],
      }));
      setCurrentReplyPage(result.data.page);
      setTotalReplyPages(result.data.totalPages);
    } else {
      console.error(result.message);
      toast.error(result.message || "Failed to fetch replies.");
    }

    setRepliesLoadingMap((prev) => ({ ...prev, [id]: false }));
  };
  const fetchCommentData = async (chdetailsId, page) => {
    setCommentLoading(chdetailsId);
    const result = await commentApi(chdetailsId, page);

    if (result.status) {
      console.log(result.data.results);
      if (page === 1) {
        setComments(result.data.results); // If it's the first page, reset comments
      } else {
        setComments((prevComments) => [
          ...prevComments,
          ...result.data.results,
        ]); // If it's not the first page, append the new comments
      }
      setCurrentCommentPage(result.data.page);
      setTotalCommentPages(result.data.totalPages);
    } else {
      console.error(result.message);
      toast.error(result.message || "Failed to fetch comments.");
    }

    setCommentLoading(null);
  };
  const handleCommentReply = async (id) => {
    SetSmallReplyLoading(true);
    const result = await postReply(id, repliesContent);
    if (result.status) {
      toast.success("Replied successfully");
      setRepliesContent("");
      fetchReplyData(id, 1);
      fetchCommentData(showSection);
    } else {
      console.error(result.message);
      toast.error(result.message || "Failed to reply.");
    }

    SetSmallReplyLoading(false);
  };
  const handleCommentPost = async (id) => {
    setSmallCommentLoading(true);
    const result = await commentPost(id, postComment);
    if (result.status) {
      toast.success("Comment created successfully");
      setPostComment("");
      setCurrentCommentPage(1)
      fetchData(chdetails, day);
      fetchCommentData(id,1);
    } else {
      console.error(result.message);
    }

    setSmallCommentLoading(false);
  };

  const handleCreatePost = async (chdetails, numberDay) => {
    setSmallLoading(true);
    // setPosts([]);
    const result = await createPost(chdetails, numberDay, postContent);
    if (result.status) {
      fetchData(chdetails, day);
      toast.success("Post created successfully");
      setPostContent("");
    } else {
      console.error(result.message);
      toast.error(result.message);
    }

    setSmallLoading(false);
  };
  // const handleEditPost = async (postId, updatedContent) => {
  //   setSmallLoading(true);
  //   try {
  //     const data = { content: updatedContent }; // Pass the updated content
  //     const result = await patchForumPost(postId, data);

  //     // Update the UI with the edited post
  //     setPosts((prevPosts) =>
  //       prevPosts.map((post) =>
  //         post._id === postId ? { ...post, content: result.content } : post
  //       )
  //     );
  //     toast.success("Post updated successfully");
  //     setShowEditSection(false); // Close the edit section
  //   } catch (error) {
  //     toast.error("Error updating post");
  //   } finally {
  //     setSmallLoading(false); // Hide the loader
  //   }
  // };
  const handleDeleteForumPost = async (postId) => {
    toast.error("Deleting");
    // setLoading(true);

    const result = await deleteForumPost(postId);

    if (result.status) {
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      toast.success("Post deleted successfully");
    } else {
      console.error(result.message);
      toast.error(result.message);
    }
    // setLoading(false);

    // catch (error) {
    //   console.error("Error deleting post:", error);
    //   toast.error("An error occurred");
    // } finally {
    //   setLoading(false);
    // }
  };
  const handleDeleteComment = async (id) => {
    toast.error("Deleting");

    // setLoading(true);

    const result = await deleteComment(id);

    if (result.status) {
      fetchData(chdetails, day);
      setComments((prevPosts) =>
        prevPosts.filter((comment) => comment._id !== id)
      );
      toast.success("Comment deleted successfully");
    } else {
      console.error(result.message);
    }
    // setLoading(false);
  };

  useEffect(() => {
    fetchData(chdetails, day);
  }, [chdetails, day]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <div className="cursor-pointer" onClick={() => router.back()}>
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
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    if (showEditSection === item._id) {
                      setShowEditSection("");
                    } else {
                      setShowEditSection(item._id);
                    }
                  }}
                >
                  <RedEdit />
                </button>

                <button
                  className="cursor-pointer"
                  onClick={() => handleDeleteForumPost(item._id)}
                >
                  <RedRecycle />
                </button>
              </div>
            </div>
            {/* {showEditSection !== item._id && (
              
            )} */}
            {showEditSection === item._id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditPost(item._id, item.content);
                }}
                className="flex gap-10"
              >
                <input
                  value={item.content}
                  // onChange={(e) =>
                  //   setPosts((prevPosts) =>
                  //     prevPosts.map((post) =>
                  //       post._id === item._id
                  //         ? { ...post, content: e.target.value }
                  //         : post
                  //     )
                  //   )
                  // }
                  className="border font-sans text-sm font-medium shadow-md border-[#E7E5E4] py-3 px-4 rounded-xl w-full flex justify-start"
                  placeholder="Edit Post"
                />
                <button
                  type="submit"
                  disabled
                  className="py-4 px-8 bg-[#AE445A] font-sans border-[#B7B7B7] rounded-lg  text-white font-bold text-base flex justify-center items-center"
                >
                  {smallCommentLoading ? <LoaderSmall /> : "Save"}
                </button>
              </form>
            ) : (
              <p className="text-base font-sans font-semibold text-userblack w-[94%]">
                {item.content}
              </p>
            )}

            <div className="flex flex-row items-center gap-3">
              <button
                onClick={() => {
                  if (showSection === item._id) {
                    setShowSection("");
                  } else {
                    setShowSection(item._id);
                    fetchCommentData(item._id);
                  }
                }}
                className="text-[#3090E9] text-sm font-sans font-semibold uppercase"
              >
                Comment
              </button>

              <button
                onClick={() => {
                  if (showSection === item._id) {
                    setShowSection("");
                  } else {
                    setShowSection(item._id);
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
            {item._id === showSection && (
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent default form submission
                  handleCommentPost(item._id); // Call the API with the specific comment ID
                }}
                className="flex items-center justify-center gap-10 mb-5"
              >
                <textarea
                  value={postComment} // Bind the state to this textarea
                  onChange={(e) => setPostComment(e.target.value)} // Update state on input
                  required
                  placeholder="Enter your comment!"
                  className="border font-sans text-sm font-medium shadow-md border-[#E7E5E4] py-3 px-4 rounded-xl w-full flex justify-start"
                ></textarea>
                <button
                  type="submit"
                  className="py-4 px-8 bg-[#AE445A] font-sans border-[#B7B7B7] rounded-lg  text-white font-bold text-base flex justify-center items-center"
                >
                  {smallCommentLoading ? <LoaderSmall /> : "Save"}
                </button>
              </form>
            )}
            {/* Loader for specific post */}
            {item._id === commentLoading && (
              <div className="flex justify-center items-center p-10 w-full">
                <LoaderLarge />
              </div>
            )}
            {item._id === showSection && (
              <div className="flex flex-col border-t ml-20 mt-4 max-h-96 overflow-y-scroll mr-4">
                {comments.length > 0 ? (
                  comments.map((item) => (
                    <div key={item._id} className="flex flex-col gap-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-end gap-3">
                          <p className="text-2xl font-sans font-semibold text-[#414554]">
                            {item.author?.__t === "Admin"
                              ? "Soltopiah"
                              : item.author?.firstName +
                                  " " +
                                  item.author?.lastName || "--"}
                          </p>
                          <p className="text-[#888A94] font-sans font-xs font-semibold">
                            {dayjs(item.createdAt).format("DD/MM/YYYY, HH:mm")}
                          </p>
                        </div>

                        <button onClick={() => handleDeleteComment(item._id)}>
                          <MaroonDustbin />{" "}
                        </button>
                      </div>
                      <p className="text-base font-semibold text-[#414554] font-sans">
                        {item.content}
                      </p>
                      <button
                        onClick={() => {
                          if (commentsId) {
                            setCommentsId("");
                          } else {
                            setCommentsId(item._id);
                            console.log(item._id);
                            fetchReplyData(item._id);
                          }
                        }}
                        className="flex justify-start text-[#3090E9] font-sans font-semibold text-base"
                      >
                        {item.repliesCount} Replies
                      </button>
                      {commentsId === item._id && (
                        <>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault(); // Prevent default form submission
                              handleCommentReply(commentsId); // Call the API with the specific comment ID
                            }}
                            className="flex items-center justify-center gap-10 mb-5"
                          >
                            <textarea
                              value={repliesContent}
                              onChange={(e) =>
                                setRepliesContent(e.target.value)
                              }
                              required
                              placeholder="Enter your reply!"
                              className="border font-sans text-sm font-medium shadow-md border-[#E7E5E4] py-3 px-4 rounded-xl w-4/5 flex justify-start"
                            ></textarea>
                            <button
                              type="submit"
                              className="py-4 px-8 bg-[#AE445A] font-sans border-[#B7B7B7] rounded-lg  text-white font-bold text-base flex justify-center items-center"
                            >
                              {smallReplyLoading ? <LoaderSmall /> : "Save"}
                            </button>
                          </form>
                          {repliesLoadingMap[item._id] && (
                            <div className="flex justify-center items-center p-10 w-full">
                              <LoaderLarge />
                            </div>
                          )}
                          <div className="max-h-64 overflow-y-scroll">
                            {repliesMap[item._id]?.length === 0 ? (
                              <p className="text-sm text-[#888A94]">
                                No replies yet.
                              </p>
                            ) : (
                              repliesMap[item._id]?.map((replyItem) => (
                                <div
                                  key={replyItem._id}
                                  className="flex mb-3 gap-3"
                                >
                                  <p className="ml-8 font-sans font-semibold text-userblack text-base">
                                    {replyItem.author?.__t === "Admin"
                                      ? "Soltopiah"
                                      : replyItem.author?.firstName ||
                                        "--"}{" "}
                                    Replied :
                                  </p>
                                  <div className="flex items-center gap-4">
                                    <p
                                      title={replyItem.content}
                                      className=" font-sans font-normal text-userblack text-base break-all"
                                    >
                                      {truncateDescription(replyItem.content)}
                                    </p>
                                    <p className="font-sans font-semibold text-gray-500 text-xs">
                                      {dayjs(replyItem.createdAt).format(
                                        "DD/MM/YYYY , HH:mm"
                                      )}
                                    </p>
                                  </div>
                                </div>
                              ))
                            )}
                            {currentReplyPage < totalReplyPages && (
                              <button
                                onClick={() =>
                                  fetchReplyData(item._id, currentReplyPage + 1)
                                }
                                className="mt-4 p-2 bg-gray-200 text-center w-1/12 rounded-md"
                                disabled={repliesLoadingMap[item._id]}
                              >
                                {repliesLoadingMap[item._id]
                                  ? "Loading..."
                                  : "Load More"}
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#888A94]">No comments yet.</p>
                )}
                {currentCommentPage < totalCommentPages && (
                  <button
                    onClick={() =>
                      fetchCommentData(item._id, currentCommentPage + 1)
                    }
                    className="mt-4 p-2 bg-gray-200 text-center w-1/12 rounded-md"
                    disabled={commentLoading}
                  >
                    {commentLoading ? "Loading..." : "Load More"}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default Page;
