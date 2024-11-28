import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, responseValidator, tokenValidator, url } from "@/Utilities/helper";

export const tableApi = async (tableData, page,) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url + `/revenues?revenueSource=${tableData}&page=${page}&limit=10`,
      requestOptions
    );
    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
export const revenueChart = async (type = "monthly") => {
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
export const revenueStats = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + await tokenValidator());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/revenues/stats`, requestOptions);
    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
