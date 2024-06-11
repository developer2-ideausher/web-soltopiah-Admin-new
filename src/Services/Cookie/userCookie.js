import cookies from "js-cookie";


export const getToken = () => {
  const cookie = cookies.get("auth");
  if (!cookie) {
    return null;
  }
  return (cookie);
};

export const setToken = (user) => {
  cookies.set("auth", user, {
    expires: 1 / 24,
  });
};

export const removeToken = () => cookies.remove("auth");
