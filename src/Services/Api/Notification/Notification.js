import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, responseValidator, url } from "@/Utilities/helper";

export const getAllNotificationApi = async (page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url + `/notifications/sent-by-admin?sortBy=createdAt&sortOrder=desc&page=${page}&limit=10`,
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
