import {
  apiError,
  responseValidator,
  tokenValidator,
  url,
} from "@/Utilities/helper";

export const getCategoryData = async (
  page,
  sortOrder = "desc",
  search = ""
) => {
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
      url +
        `/categories?page=${page}&limit=10&sortBy=createdAt&sortOrder=${sortOrder}&${searchParam}`,
      requestOptions
    );

    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
