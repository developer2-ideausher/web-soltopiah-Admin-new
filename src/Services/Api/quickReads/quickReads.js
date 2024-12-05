import {
  apiError,
  buildQueryParams,
  responseValidator,
  tokenValidator,
  url,
} from "@/Utilities/helper";

export const getAllQuickreadsDataApi = async (
  page,
  sortOrder = "desc",
  search = "",
  type = ""
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

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
    creatorRole: type || undefined, // Only include `type` if it's truthy
  });
  try {
    const response = await fetch(
      url + `/quick-reads?${queryParams}`,
      requestOptions
    );

    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
export const getPendingQuickReadsCount = async (page,sortOrder = "desc", search = "") => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

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
      url + `/quick-reads?status=pending&${queryParams}`,
      requestOptions
    );

    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
