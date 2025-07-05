export const getAuthToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  };
  
  export const setAuthToken = (token: string) => {
    localStorage.setItem("token", token);
  };
  
  export const removeAuthToken = () => {
    localStorage.removeItem("token");
  };
  