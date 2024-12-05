import { getToken } from "@/Services/Cookie/userCookie";
import {
  apiError,
  responseValidator,
  tokenValidator,
  url,
} from "@/Utilities/helper";

// export const getAllNotificationApi = async (page, sortOrder = "desc", search = "") => {
//   const myHeaders = new Headers();
//   myHeaders.append("Authorization", "Bearer " + await tokenValidator());

//   const queryParams = new URLSearchParams({
//     sortBy: "createdAt",
//     sortOrder,
//     page,
//     limit: 10,
//   });

//   if (search.trim() !== "") {
//     queryParams.append("search", search); // Add search query only if not empty
//   }

//   try {
//     const response = await fetch(
//       `${url}/notifications/sent-by-admin?${queryParams.toString()}`,
//       {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow",
//       }
//     );
//     return responseValidator(response);
//   } catch (error) {
//     apiError(error);
//   }
// };

export const getAllNotificationApi = async (
  page,
  sortOrder = "desc",
  search = "",
  targetRole = ""
) => {
  console.log(targetRole, "hi");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const searchParam = search.trim() !== "" ? `&search=${search}` : "";
  const typeParam = targetRole === "" ? "" : `&targetRole=${targetRole}`; //  if present
  console.log("Amin", targetRole);

  try {
    const response = await fetch(
      url +
        `/notifications/sent-by-admin?sortBy=createdAt&sortOrder=${sortOrder}&page=${page}&limit=10${searchParam}${typeParam}`,
      requestOptions
    );
    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};

// export const deleteNotification = async (id) => {
//   const myHeaders = new Headers();
//   myHeaders.append("Authorization", "Bearer " + getToken());

//   const requestOptions = {
//     method: "DELETE",
//     headers: myHeaders,
//     redirect: "follow",
//   };
//   try {
//     const response = await fetch(url + `/notifications/${id}`, requestOptions);

//     return responseValidator(response);
//   } catch (error) {
//     apiError(error);
//   }
// };
