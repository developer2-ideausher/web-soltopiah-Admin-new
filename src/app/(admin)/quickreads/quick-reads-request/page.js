// "use client";
// import BackButton from "@/components/BackButton";
// import Link from "next/link";
// import React, { useEffect, useState, Suspense  } from "react";
// import Profile2 from "../../../../../public/Profile2.png";
// import Frame1 from "../../../../../public/Frame1.png";
// import LoginImage from "../../../../../public/LoginImage.png";

// import image01 from "../../../../../public/image01.png";
// import { useRouter, useSearchParams } from "next/navigation";
// import { getToken } from "@/Services/Cookie/userCookie";

// function Page() {
//   const [requestData, setRequestData] = useState(null);
//   const searchParams = useSearchParams();
//   const reqId = searchParams.get("requestID");
//   const router = useRouter();
//   console.log(reqId);
//   useEffect(() => {
//     getAllReqDataApi();
//   }, []);
//   const token = getToken();

//   const getAllReqDataApi = () => {
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", "Bearer " + token);
//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,

//       redirect: "follow",
//     };

//     fetch(process.env.NEXT_PUBLIC_URL + "/quick-reads/" + reqId, requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result.data);
//         setRequestData(result.data);
//       })
//       .catch((error) => console.error(error));
//   };
//   const handleDecline = (e) => {
//     e.preventDefault();
//     const raw = { status: "declined" };
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", "Bearer " + token);
//     myHeaders.append("Content-Type", "application/json");

//     const requestOptions = {
//       method: "PATCH",
//       headers: myHeaders,
//       body: JSON.stringify(raw),
//       redirect: "follow",
//     };

//     fetch(
//       process.env.NEXT_PUBLIC_URL + `/quick-reads/${reqId}/status`,
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//         router.push("/quickreads/quick-reads-requests");
//       })
//       .catch((error) => console.error(error));
//   };
//   const handleApprove = (e) => {
//     e.preventDefault();
//     const raw = { status: "approved" };
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", "Bearer " + token);
//     myHeaders.append("Content-Type", "application/json");
//     const requestOptions = {
//       method: "PATCH",
//       headers: myHeaders,
//       body: JSON.stringify(raw),
//       redirect: "follow",
//     };

//     fetch(
//       process.env.NEXT_PUBLIC_URL + `/quick-reads/${reqId}/status`,
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//         router.push("/quickreads/quick-reads-requests");
//       })
//       .catch((error) => console.error(error));
//   };
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//    <div className="flex flex-col gap-7">
//       <div className="flex flex-row gap-5 items-center">
//         <Link href="/quickreads/quick-reads-requests">
//           <BackButton />
//         </Link>
//         <p className="text-userblack font-semibold text-xl2 font-sans">
//           Quick Reads Requests
//         </p>
//       </div>
//       <div className="border border-[#CDCDCD]"></div>
//       {requestData && (
//         <form className="flex flex-col gap-5 lg:w-4/5 xl:w-3/5 2xl:w-2/5">
//           <div className="flex flex-col gap-2 ">
//             <p className="text-sm font-sans font-semibold text-black">Title</p>
//             <input
//               type="text"
//               value={requestData.title}
//               className="py-3 px-4 rounded-xl border border-[#E7E5E4] bg-white text-sm font-sans font-normal text-userblack"
//               placeholder="An emotional trigger is"
//             />
//           </div>
//           <div className="flex flex-col gap-2 ">
//             <p className="text-sm font-sans font-semibold text-black">
//               Published by
//             </p>
//             <div className="flex flex-row items-center gap-2">
//               <img
//                 className="w-8 h-8 object-cover rounded-full"
//                 src={
//                   requestData.creatorRole === "Guide"
//                     ? requestData.creator.profilePic
//                       ? requestData.creator.profilePic.url
//                       : Frame1.src
//                     : LoginImage.src
//                 }
//                 alt=""
//               />
//               <p className="text-sm font-sans font-normal text-userblack">
//                 {requestData.creatorRole == "Guide"
//                   ? requestData?.creator.firstName
//                   : "Soltopiah"}
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-col gap-3">
//             <p className="text-sm font-sans font-semibold text-userblack">
//               Slides ({requestData.pictures.length})
//             </p>
//             <div className="grid grid-cols-3 gap-4">
//               {requestData.pictures?.map((picture) => (
//                 <div
//                   key={picture._id}
//                   className="flex justify-center items-center p-6 bg-[#E5E7F5] border border-[#D3D6EE] rounded-lg"
//                 >
//                   <img src={picture.url || image01.src} alt="" />
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="flex flex-row items-center gap-5 mt-3">
//             <button
//               onClick={(e) => handleDecline(e)}
//               className="w-full bg-[#EE3E3E] border border-[#EE3E3E] p-3 rounded-lg text-white text-sm font-sans font-normal"
//             >
//               Decline
//             </button>
//             <button
//               onClick={(e) => handleApprove(e)}
//               className="w-full bg-[#08A03C] border border-[#08A03C] p-3 rounded-lg text-white text-sm font-sans font-normal"
//             >
//               Approve
//             </button>
//           </div>
//         </form>
//       )}
//     </div></Suspense>

//   );
// }

// export default Page;
import { redirect } from "next/navigation";
import React from "react";

function Page() {
  redirect("/quickreads");
  return <div></div>;
}

export default Page;
