import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, responseValidator, tokenValidator, url } from "@/Utilities/helper";

export const getTopGuides = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/guides/top-rated?limit=5",
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getTopCategories = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/categories/most-watched",
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};
export const getUserGrowth = async (type = "monthly") => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL +
        `/admin/dashboard/users-growth?type=${type}`,
      requestOptions
    );
    const result = await responseValidator(response);
    return result;
  } catch (error) {
    apiError(error);
  }
};

export const getStats = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/admin/dashboard/stats",
      requestOptions
    );
    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};

export const getRevenueChart = async (type) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      url + `/revenues/bookings-vs-subscriptions-revenue-growth?type=${type}`,
      requestOptions
    );
    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
