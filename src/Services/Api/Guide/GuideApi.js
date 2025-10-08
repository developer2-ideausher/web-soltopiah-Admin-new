import { getToken } from "@/Services/Cookie/userCookie";
import {
  apiError,
  buildQueryParams,
  responseValidator,
  tokenValidator,
  url,
} from "@/Utilities/helper";

export const getAllGuideApi = async (
  page,
  sortOrder = "desc",
  search = "",
  type = ""
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const checkFilter = (guideFilter = "") => {
    if (guideFilter === "premium") {
      return true;
    } else if (guideFilter === "free") {
      return false;
    }
    return undefined;
  };

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
    hasPremiumPlan: checkFilter(type), // Only include `type` if it's truthy
  });

  try {
    const response = await fetch(
      url + `/guides?${queryParams}`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getLiveCreated = async (
  id,
  page,
  sortOrder = "desc",
  search = ""
) => {
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
      process.env.NEXT_PUBLIC_URL +
        `/guides/${id}/live-events/owned?${queryParams}`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getQuickReads = async (
  id,
  page,
  sortOrder = "desc",
  search = ""
) => {
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
      process.env.NEXT_PUBLIC_URL +
        `/guides/${id}/quick-reads/owned?${queryParams}`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getContent = async (id, page, sortOrder = "desc", search = "") => {
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
      process.env.NEXT_PUBLIC_URL +
        `/guides/${id}/chapters/owned?${queryParams}`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const guideSessionBooked = async (
  id,
  page,
  sortOrder = "desc",
  search = ""
) => {
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
      process.env.NEXT_PUBLIC_URL +
        `/guides/${id}/guide-session-bookings?${queryParams}`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const guideCourses = async (
  id,
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
      url + `/guides/${id}/courses/standard/owned?${queryParams}`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const guideVideos = async (
  id,
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
      url + `/guides/${id}/chapters/owned?type=video&${queryParams}`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const guideAudios = async (
  id,
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
      url + `/guides/${id}/chapters/owned?type=audio&${queryParams}`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getGuideBookingsData = async (
  id,
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
      url +
        `/guides/${id}/guide-session-bookings?type=completed&${queryParams}`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getGuideByID = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/guides/${id}`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const guideEducation = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/qualifications/${id}`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getGuideRequests = async (
  page = 1,
  status = "",
  limit = 10,
  searchQuery = "",
  sortOrder = "desc"
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page);
    queryParams.append("limit", limit);
    queryParams.append("sortBy", "createdAt");
    queryParams.append("sortOrder", sortOrder);

    if (status) {
      queryParams.append("status", status);
    }

    if (searchQuery && searchQuery.trim() !== "") {
      queryParams.append("search", searchQuery.trim());
    }

    const response = await fetch(
      url + `/guides/onboarding?${queryParams.toString()}`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getApprovalGuideById = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      url + `/guides/${id}/onboarding/profile`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const guideApprovalStatus = async (id, status, msg) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));
  const raw = JSON.stringify({
    accept: status ,
    rejectionReason: msg || "",
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url + `/guides/${id}/onboarding`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getAllPlaylists = async (
  page = 1,
  limit = 10,
  searchQuery = "",
  sortOrder = "desc",
  type = ""
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    let apiUrl = `${url}/playlists?page=${page}&limit=${limit}&sortBy=createdAt&sortOrder=${sortOrder}`;

    if (searchQuery && searchQuery.trim() !== "") {
      apiUrl += `&search=${encodeURIComponent(searchQuery.trim())}`;
    }
    if (type && type.trim() !== "") {
      apiUrl += `&type=${encodeURIComponent(type.trim())}`;
    }

    const response = await fetch(apiUrl, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const createPlaylist = async (formData) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/playlists/soltopiah`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getAllChaptersForPlaylists = async (
  type = "video",
  searchQuery,
  page = 1
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    let apiUrl = `${url}/chapters?type=${type}&page=${page}&limit=10`;
    if (searchQuery && searchQuery.trim() !== "") {
      apiUrl += `&search=${encodeURIComponent(searchQuery.trim())}`;
    }
    const response = await fetch(apiUrl, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getOnePlaylist = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/playlists/${id}`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const deletePlaylist = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/playlists/${id}`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const updateAdminPlaylist = async (id, formdata) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  // const formdata = new FormData();
  // formdata.append("title ", "Soltopiah - Updated");
  // formdata.append("description", "");
  // formdata.append("thumbnail", fileInput.files[0], "[PROXY]");
  // formdata.append("addChapters", '["68e0f3d2d805523d12a3b70d"]');
  // formdata.append("removeItems", '["67f66666116a601b112d70b2"]');

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      url + `/playlists/${id}/soltopiah`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
