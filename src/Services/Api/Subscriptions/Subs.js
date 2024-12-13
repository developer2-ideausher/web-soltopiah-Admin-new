import { getToken } from "@/Services/Cookie/userCookie";
import {
  apiError,
  responseValidator,
  tokenValidator,
  url,
} from "@/Utilities/helper";

export const getSubscriptionData = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/subscriptions`, requestOptions);
    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
export const createSubs = async (
  displayName,
  description,
  amount,
  recurringInterval,
  thumbnail
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const formdata = new FormData();
  formdata.append("displayName", displayName);
  formdata.append("description", description);

  formdata.append("amount", amount);
  formdata.append("recurringInterval", recurringInterval);
  formdata.append("features", '["feat 1", "feat 2", "feat 3"]');
  formdata.append("thumbnail", thumbnail);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + "/subscriptions", requestOptions);

    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};

export const patchSwitch = async (id, isActive) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const raw = JSON.stringify({
    isActive: isActive,
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url + `/subscriptions/${id}/status`,
      requestOptions
    );

    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};

export const getOneSubs = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/subscriptions/${id}`, requestOptions);
    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};

export const updateSubs = async (id, formData) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  // const formdata = new FormData();
  // formdata.append("thumbnail", fileInput.files[0], "[PROXY]");
  // formdata.append("description", "updated desc");
  // formdata.append("displayName", "free plan");
  // formdata.append("features", '["feat 1", "feat 2"]');

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/subscriptions/${id}`, requestOptions);

    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
export const subsChartApi = async (type) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url +
        `/revenues/monthly-vs-yearly-subscription-revenue-chart?type=${type}`,
      requestOptions
    );

    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
