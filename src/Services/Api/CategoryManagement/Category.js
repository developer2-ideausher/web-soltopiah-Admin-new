import {
  apiError,
  buildQueryParams,
  responseValidator,
  tokenValidator,
  url,
} from "@/Utilities/helper";

export const getCategoryData = async (
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
    pageType: type || undefined, // Only include `type` if it's truthy
  });

  try {
    const response = await fetch(
      url + `/categories?${queryParams}`,
      requestOptions
    );

    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
