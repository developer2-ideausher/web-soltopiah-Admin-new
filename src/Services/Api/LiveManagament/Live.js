import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, responseValidator, url } from "@/Utilities/helper";

export const getlive = async (page, sortOrder = "desc", search = "") => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const searchParam = search.trim() !== "" ? `&search=${search}` : "";

  try {
    const response = await fetch(
      url +
        `/live-events?page=${page}&limit=10&sortBy=createdAt&sortOrder=${sortOrder}&${searchParam}`,
      requestOptions
    );
    // const alok ={data:response}
    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
export const getPendingCount = async (page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url + `/live-events?status=pending&page=${page}&limit=10`,
      requestOptions
    );

    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
export const getOnelive = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + "/live-events/" + id, requestOptions);

    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
