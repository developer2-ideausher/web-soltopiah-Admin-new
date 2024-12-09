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
      process.env.NEXT_PUBLIC_URL + `/guides/${id}/live-events/owned?${queryParams}`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getQuickReads = async (id,
  page,
  sortOrder = "desc",
  search = "") => {
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
      process.env.NEXT_PUBLIC_URL + `/guides/${id}/quick-reads/owned?${queryParams}`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getContent = async (id,
  page,
  sortOrder = "desc",
  search = "") => {
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

export const guideSessionBooked = async (id,
  page,
  sortOrder = "desc",
  search = "") => {
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
      process.env.NEXT_PUBLIC_URL + `/guides/${id}/guide-session-bookings?${queryParams}`,
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
