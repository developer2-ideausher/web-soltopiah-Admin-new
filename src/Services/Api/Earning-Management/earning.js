import { getToken } from "@/Services/Cookie/userCookie";
import { apiError, responseValidator, url } from "@/Utilities/helper";

export const tableApi = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + getToken());

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url + `/revenues?revenueSource=DonationRevenue`,
      requestOptions
    );
    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
