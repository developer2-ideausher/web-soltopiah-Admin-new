import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, responseValidator, tokenValidator } from "@/Utilities/helper";

export const getAllCommunitiesApi = async (page,sortOrder = "desc", search = "") => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const searchParam = search.trim() !== "" ? `&search=${search}` : "";

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/groups?page=${page}&limit=10&sortBy=createdAt&sortOrder=${sortOrder}&${searchParam}`,
      requestOptions
    );

   
    const result = await responseValidator(response);

    
    return result;
  } catch (error) {
   
    return apiError(error);
  }
};
