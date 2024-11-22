import cookies from "js-cookie";


export const getToken = () => {
  const cookie = cookies.get("auth");
  if (!cookie) {
    return null;
  }
  return (cookie);
};

export const setToken = (user) => {
  cookies.set("auth", user);
};

export const removeToken = () => cookies.remove("auth");
