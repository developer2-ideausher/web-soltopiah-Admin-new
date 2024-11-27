import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, responseValidator, tokenValidator } from "@/Utilities/helper";

export const getOnegroupApi = async (details) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/groups/${details}`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};

export const getGroupMembersApi = async (page,details) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/groups/${details}/members?page=${page}&limit=10`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};
