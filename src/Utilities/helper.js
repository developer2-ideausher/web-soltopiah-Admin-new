import { getToken, setToken } from "@/Services/Cookie/userCookie";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export async function tokenValidator() {
  const token = getToken()
  if (!token) {
    return null;
  }

  function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  const user = parseJwt(token);
  if (user.exp * 1000 < Date.now()) {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      auth.onAuthStateChanged(async function (currentUser) {
        if (currentUser) {
          try {
            let newToken = await auth.currentUser.getIdToken(true);
            setToken(newToken);
            resolve(newToken);
          } catch (err) {
            console.log(err);
            reject(err);
          }
        } else {
          resolve(null);
        }
      });
    });
  } else {
    return token;
  }
}

export const responseValidator = async (
  response,
  isToaster = false,
  message = null
) => {
  if (response.ok) {
    if (response?.status == 204) {
      toast.success(
        !message || message.length == 0 ? response.message : message,
        {
          toastId: "API-error-session-expired",
        }
      );
      return { status: true, code: 204 };
    } else {
      const res = await response.json();
      if (Array.isArray(res.data)) {
        if (isToaster) {
          toast.success(
            !message || message.length == 0 ? res.message : message,
            {
              toastId: `API-Response-success-${Math.random()}`,
            }
          );
        }
        return { status: true, data: [...res.data] };
      } else if (typeof res.data === "object") {
        if (isToaster) {
          toast.success(
            !message || message.length == 0 ? res.message : message,
            {
              toastId: `API-Response-success-${Math.random()}`,
            }
          );
        }
        return { status: true, data: res.data };
      } else if (typeof res.data === "string") {
        if (isToaster) {
          toast.success(
            !message || message.length == 0 ? res.message : message,
            {
              toastId: `API-Response-success-${Math.random()}`,
            }
          );
        }
        return { status: true, data: res.data };
      } else {
        toast.error("response.data is neither an array nor an object", {
          toastId: `API-Response-error${Math.random()}`,
        });
      }
    }
  } else if (response?.status == 401) {
    toast.error("Session Expired, Login Again", {
      toastId: "API-error-session-expired",
    });

    return { status: false, code: 401, message: "Session Expired." };
  } else if (response?.status == 413) {
    toast.error("Media file is too large.", {
      toastId: "API-error-file-size-too-large",
    });
    return { status: false, code: 413, message: "file-size-too-large" };
  } else if (response?.status >= 400 && response?.status < 500) {
    const res = await response.json();
    toast.error(res.message, {
      toastId: `API-400-error${Math.random()}`,
    });
    return { status: false, code: 400, message: res };
  } else if (response?.status >= 500) {
    const res = await response.json();
    toast.error(res, {
      toastId: `API-500-error${Math.random()}`,
    });
    return {
      status: false,
      code: response?.status,
      message: "Encountering Server Side Error.",
    };
  } else {
    toast.error("Something went wrong", {
      toastId: `API-unknown-error${Math.random()}`,
    });
    return {
      status: false,
      code: response?.status,
      message: "Something went wrong.",
    };
  }
};
export const apiError = (e) => {
  if (e.name === "AbortError") {
  } else {
    toast.error("Taking more than the usual time. Please refresh the page.", {
      toastId: `API-Timeout-error`,
    });
  }
  return { status: false, message: e };
};

export const url = process.env.NEXT_PUBLIC_URL;

export const truncateDescription = (description) => {
  if (typeof description !== "string") {
    return "NA"; // Fallback if description is not a string
  }
  if (description && description.length > 80) {
    return description.substring(0, 80) + "...";
  }
  return description;
};
export const truncateName = (Name) => {
  if (typeof Name !== "string") {
    return "NA"; // Fallback if description is not a string
  }
  if (Name && Name.length > 40) {
    return Name.substring(0, 40) + "...";
  }
  return Name || ""; // Return empty string if Name is undefined or null
};
export function buildQueryParams(params) {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== "") // Include only present params
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`) // Encode key and value
    .join("&"); // Join with `&`
}
