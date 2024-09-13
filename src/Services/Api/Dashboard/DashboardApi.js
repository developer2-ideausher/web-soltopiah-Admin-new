import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, responseValidator } from "@/Utilities/helper";

export const getTopGuides = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/guides/top-rated?limit=5",
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getTopCategories = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/course-categories/most-watched",
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
