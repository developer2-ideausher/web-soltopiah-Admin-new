import {
  apiError,
  responseValidator,
  tokenValidator,
  url,
} from "@/Utilities/helper";

export const getAllInvites = async (type, page = 1, limit = 10) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/invite?role=${type}&page=${page}&limit=${limit}`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getInviteStats = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/invite/stats`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const createInvite = async (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));
    myHeaders.append("Content-Type", "application/json");


  const raw = JSON.stringify({
    name: data.name,
    email: data.email,
    expiry: data.expiry,
    role: "Guide",
    expiryDurationHours: data.expiryDurationHours,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/invite`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
