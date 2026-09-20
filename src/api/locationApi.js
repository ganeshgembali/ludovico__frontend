import client from "./client";

export const updateUserLocation = async (location) => {
  return client.post("/users/location", location);
};
