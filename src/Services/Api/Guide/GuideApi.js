import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, responseValidator } from "@/Utilities/helper";

export const getLiveCreated = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/guides/${id}/live-events/owned`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getQuickReads = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/guides/${id}/quick-reads/owned`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getContent = async (id,page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/guides/${id}/chapters/owned?page=${page}&limit=10`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const guideSessionBooked = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/guides/${id}/guide-session-bookings`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
