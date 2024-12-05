import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, buildQueryParams, responseValidator, tokenValidator, url } from "@/Utilities/helper";

export const getAllCommunitiesApi = async (page,sortOrder = "desc", search = "",type="") => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  // const searchParam = search.trim() !== "" ? `&search=${search}` : "";
  // const typeParam = type ? `&type=${type}` : ""; //  if present
  const queryParams = buildQueryParams({
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder,
    search: search.trim(),
    type: type || undefined, // Only include `type` if it's truthy
  });

  try {
    // const response = await fetch(
    //   process.env.NEXT_PUBLIC_URL + `/groups?page=${page}&limit=10&sortBy=createdAt&sortOrder=${sortOrder}&${searchParam}${typeParam}`,
    //   requestOptions
    // );
    const response = await fetch(
      url+`/groups?${queryParams}`,
      requestOptions
    );

   
    const result = await responseValidator(response);

    
    return result;
  } catch (error) {
   
    return apiError(error);
  }
};
