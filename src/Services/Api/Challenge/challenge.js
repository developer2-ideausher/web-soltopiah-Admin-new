import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, responseValidator, tokenValidator, url } from "@/Utilities/helper";

export const getAddContentChapters = async (page) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/chapters?page=${page}&limit=10`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};
export const getChallengeForumPosts = async (id, day) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url + `/challenges/${id}/posts?day=${day}`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};
export const getReplies = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url + `/comments/${id}/replies`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};
export const createPost = async (id, day, content) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const formdata = new FormData();
  formdata.append("content", content);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url + `/challenges/${id}/posts?day=${day}`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};
export const deleteForumPost = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/posts/${id}`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};
export const commentApi = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    // body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/posts/${id}/comments`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};
export const postReply = async (id, content) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const raw = JSON.stringify({
    content: content,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url + `/comments/${id}/replies`,
      requestOptions
    );

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};

export const commentPost = async (id, content) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const raw = JSON.stringify({
    content: content,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/posts/${id}/comments`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};

export const deleteComment = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const raw = JSON.stringify({
    content: "I have now edited this comment",
  });

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/comments/${id}`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};

export const patchForumPost = async (id, data) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const raw = JSON.stringify({
    likesEnabled: true,
    commentsEnabled: false,
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/posts/${id}`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    return apiError(error);
  }
};
