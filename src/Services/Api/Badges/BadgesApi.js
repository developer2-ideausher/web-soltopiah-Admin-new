import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, responseValidator } from "@/Utilities/helper";

export const getAllBadgesApi = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Cache-Control", "no-cache");
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/badges",
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};

export const switchBadgeApi = async (id, isEnabled) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + getToken());

  const raw = JSON.stringify({
    isEnabled: isEnabled,
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/badges/${id}/status`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};

export const patchApi = async (badgeId, file, description) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const formdata = new FormData();
  if (file) {
    formdata.append("photo", file);
  }
  if (description) {
    formdata.append("description", description);
  }
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/badges/${badgeId}`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};

export const getOneBadgeApi = async (badgeId) => {
  const myHeaders = new Headers();
  myHeaders.append("Cache-Control", "no-cache");

  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/badges/${badgeId}`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};

export const getImageCacheRemover = (url, fallback) => {
  if (!url) {
    return fallback;
  }
  else{
    return url.startsWith("blob")?url: `${url}?x=${Date.now()}`
  }
};
