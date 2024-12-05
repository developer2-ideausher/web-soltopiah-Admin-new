import { getToken } from "@/Services/Cookie/userCookie";
import {
  apiError,
  buildQueryParams,
  responseValidator,
  tokenValidator,
  url,
} from "@/Utilities/helper";

export const getAllUsersApi = async (
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
  const checkFilter = (guideFilter = "") => {
    if (guideFilter === "premium") {
      return true;
    } else if (guideFilter === "free") {
      return false;
    }
    return undefined;
  };
  const queryParams = buildQueryParams({
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder,
    search: search.trim(),
    hasPremiumPlan: checkFilter(type),
    isBlocked: type === "yes" ? true : undefined, // Only include `type` if it's truthy
  });
  try {
    const response = await fetch(url + `/users?${queryParams}`, requestOptions);
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};

export const getUserInfo = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/users/${id}`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getFriends = async (id, page, sortOrder = "desc", search = "") => {
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
      url + `/users/${id}/friendships?${queryParams}`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const userParticipated = async (
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
      url + `/users/${id}/challenges/participated?${queryParams}`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getParticipatedCommunities = async (
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
      url + `/users/${id}/groups/participated?${queryParams}`,
      requestOptions
    );
    const result = responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getCommunitiesCreated = async (
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
      url + `/users/${id}/groups/owned?${queryParams}`,
      requestOptions
    );

    const result = responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getCreatedChallenges = async (
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
      url + `/users/${id}/challenges/replicated?${queryParams}`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getGuideBookings = async (
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
      process.env.NEXT_PUBLIC_URL +
        `/users/${id}/guide-session-bookings?${queryParams}`,

      // `/guide-session-bookings/users/${id}?page=${page}&limit=10`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const switchUser = async (id, isBlocked) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const raw = JSON.stringify({
    isBlocked: isBlocked,
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/users/${id}/status`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getSubsData = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      url + `/users/${id}/subscriptions/current-subscription`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const userCourses = async (
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
      url + `/users/${id}/courses/standard/completed?${queryParams}`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getWatchedVideo = async (
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
      url + `/users/${id}/chapters/watched?chapterType=video&${queryParams}`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getListenedAudio = async (
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
      url + `/users/${id}/chapters/watched?chapterType=audio&${queryParams}`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
