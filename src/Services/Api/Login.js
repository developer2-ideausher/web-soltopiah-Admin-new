import Cookies from "js-cookie";
import { getToken } from "../Cookie/userCookie";
import { toast } from "react-toastify";
import { apiError } from "@/Utilities/helper";

export const responseValidator = async (response) => {
  if (response.ok) {
    const res = await response.json();
    if (Array.isArray(res.data)) {
      return { status: true, data: [...res.data] };
    } else if (typeof res.data === "object") {
      return { status: true, data: res.data };
    } else {
      toast.error("response.data is neither an array nor an object", {
        toastId: `API-Response-error${Math.random()}`,
      });
    }
  } else if (response.status == 401) {
    toast.error("Session Expired.", {
      toastId: "API-error-session-expired",
    });
    return { status: false, code: 401, message: "Session Expired." };
  } else if (response.status >= 400 && response.status < 500) {
    const res = await response.json();
    toast.error(res.message, {
      toastId: `API-400-error${Math.random()}`,
    });
    return { status: false, code: 400, message: res };
  } else if (response.status >= 500) {
    const res = await response.json();
    toast.error(res, {
      toastId: `API-500-error${Math.random()}`,
    });
    return {
      status: false,
      code: response.status,
      message: "Encounter Server Side Error.",
    };
  } else {
    toast.error("Something went wrong", {
      toastId: `API-unknown-error${Math.random()}`,
    });
    return {
      status: false,
      code: response.status,
      message: "Something went wrong.",
    };
  }
};

export const LoginApi = async (formdata,token) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    // body: formdata,
    // redirect: "follow",
  };
 
  try {
    console.log( process.env.NEXT_PUBLIC_URL
    )
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + "/users/me",
      // GET /users/me
      requestOptions
    );
    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};
