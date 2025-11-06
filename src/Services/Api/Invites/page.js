import {
  apiError,
  responseValidator,
  tokenValidator,
  url,
} from "@/Utilities/helper";

export const getAllInvites = async (
  type,
  page = 1,
  limit = 10,
  status = "",
  search = "",
  sortBy = "createdAt",
  sortOrder = "desc"
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const queryParams = new URLSearchParams({
    role: type,
    page,
    limit,
    sortBy,
    sortOrder,
  });

  if (status) queryParams.append("status", status);
  if (search) queryParams.append("search", search);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${url}/invite?${queryParams.toString()}`,
      requestOptions
    );
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

export const revokeInviteApi = async (id) => {
  const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    status: "revoked",
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/invite/${id}/status`, requestOptions);

    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
