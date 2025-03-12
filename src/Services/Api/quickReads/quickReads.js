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
  let creatorRole;
  let status;

  if (type === "Admin" || type === "Guide") {
    creatorRole = type;
    status = undefined;
  } else if (type === "approved" || type === "declined") {
    creatorRole = undefined;
    status = type;
  } else {
    // If type is "" or "All" or something else not in the above conditions
    creatorRole = undefined;
    status = undefined;
  }
  // const searchParam = search.trim() !== "" ? `&search=${search}` : "";
  const queryParams = buildQueryParams({
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder,
    search: search.trim(),
    creatorRole,
    status
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
export const getPendingQuickReadsCount = async (
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
export const createQuickReads = async (title, images) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const formdata = new FormData();
  formdata.append("title", title);

  // Append each image file
  images.forEach(({ file }) => {
    formdata.append("pictures", file);
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + "/quick-reads", requestOptions);
    return responseValidator(response);
    // This should parse or handle the response object and return a uniform result
  } catch (error) {
    apiError(error);
  }
};
