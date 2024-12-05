import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, buildQueryParams, responseValidator, url } from "@/Utilities/helper";

export const getlive = async (page, sortOrder = "desc", search = "",type="") => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  // const searchParam = search.trim() !== "" ? `&search=${search}` : "";
  const queryParams = buildQueryParams({
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder,
    search: search.trim(),
    status: type || undefined, // Only include `type` if it's truthy
  });
  try {
    const response = await fetch(
      url +
        `/live-events?${queryParams}`,
      requestOptions
    );
    // const alok ={data:response}
    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
export const getPendingCount = async (page,sortOrder = "desc", search = "") => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const queryParams = buildQueryParams({
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder,
    search: search.trim(),
  });
  try {
    const response = await fetch(
      url + `/live-events?status=pending&${queryParams}`,
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
