import { API, handleApiError } from "./utils";

export const getUser = async (id) => {
  try {
    const { data } = await API.get(`/users/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getPublicUsers = async () => {
    try {
      const { data } = await API.get("/users/public-users");
      return { error: null, data };
    } catch (error) {
      return handleApiError(error);
    }
  };