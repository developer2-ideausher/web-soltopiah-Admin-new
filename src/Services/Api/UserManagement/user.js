import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, responseValidator, url } from "@/Utilities/helper";

export const getAllUsersApi = async (page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/users?page=${page}&limit=10`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};

export const getUserInfo = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

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

export const getFriends = async (id, page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL +
        `/users/${id}/friendships?page=${page}&limit=10`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const userParticipated = async (id, page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL +
        `/users/${id}/challenges/participated?page=${page}&limit=10`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getParticipatedCommunities = async (id, page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL +
        `/users/${id}/groups/participated?page=${page}&limit=10`,
      requestOptions
    );
    const result = responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getCommunitiesCreated = async (id, page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL +
        `/users/${id}/groups/owned?page=${page}&limit=10`,
      requestOptions
    );

    const result = responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getCreatedChallenges = async (id, page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL +
        `/users/${id}/challenges/replicated?page=${page}&limit=10`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getGuideBookings = async (id, page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  ``;
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL +
        `/users/${id}/guide-session-bookings?page=${page}&limit=10`,

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
  myHeaders.append("Authorization", "Bearer " + getToken());

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
  myHeaders.append("Authorization", "Bearer " + getToken());

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

export const userCourses = async (id, page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      url + `/users/${id}/courses/standard/completed?page=${page}&limit=10`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getWatchedVideo = async (id, page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url +
        `/users/${id}/chapters/watched?chapterType=video&page=${page}&limit=10`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getListenedAudio = async (id, page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url +
        `/users/${id}/chapters/watched?chapterType=audio&page=${page}&limit=10`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
