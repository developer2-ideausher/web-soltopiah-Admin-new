import { getToken } from "@/Services/Cookie/userCookie";
import {
  apiError,
  responseValidator,
  tokenValidator,
  url,
} from "@/Utilities/helper";

export const getAllGoals = async (page, search = "") => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const searchParam = search.trim() !== "" ? `&search=${search}` : "";
  try {
    const response = await fetch(
      url + `/goals?page=${page}&limit=10&${searchParam}`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const updateGoal = async (id, data) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const formdata = new FormData();
  if (data.title) formdata.append("title", data.title);
  if (data.image) formdata.append("image", data.image);
  if (data.isActive !== undefined) formdata.append("isActive", data.isActive);

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/goals/${id}`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getOneGoal = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/goals/${id}`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
