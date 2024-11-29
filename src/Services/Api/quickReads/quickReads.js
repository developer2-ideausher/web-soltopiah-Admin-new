import {
  apiError,
  responseValidator,
  tokenValidator,
  url,
} from "@/Utilities/helper";

export const getAllQuickreadsDataApi = async (
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
        `/quick-reads?page=${page}&limit=10&sortBy=createdAt&sortOrder=${sortOrder}&${searchParam}`,
      requestOptions
    );

    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
export const getPendingQuickReadsCount = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/quick-reads?status=pending`, requestOptions);

    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
