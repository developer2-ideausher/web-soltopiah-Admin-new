import { apiError, tokenValidator, url } from "@/Utilities/helper";
import { responseValidator } from "../Login";

export const getPolicies = async (userType) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/policies/${userType}`, requestOptions);

    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
export const updatePolicy = async (userType,type,content) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));

  const raw = JSON.stringify({
    type: type,
    content: content,
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/policies/${userType}`, requestOptions);

    return responseValidator(response);
  } catch (error) {
    apiError(error);
  }
};
