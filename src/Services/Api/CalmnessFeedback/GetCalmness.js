import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, responseValidator } from "@/Utilities/helper";

export const getChapters = async (page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/chapters?page=${page}&limit=10`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};
