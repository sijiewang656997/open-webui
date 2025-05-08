import { p as WEBUI_API_BASE_URL } from "./index3.js";
import { e as getUserPosition } from "./index5.js";
const getUsers = async (token) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/users/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).catch((err) => {
    console.log(err);
    error = err.detail;
    return null;
  });
  if (error) {
    throw error;
  }
  return res ? res : [];
};
const getUserSettings = async (token) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/users/user/settings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).catch((err) => {
    console.log(err);
    error = err.detail;
    return null;
  });
  if (error) {
    throw error;
  }
  return res;
};
const updateUserSettings = async (token, settings) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/users/user/settings/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      ...settings
    })
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).catch((err) => {
    console.log(err);
    error = err.detail;
    return null;
  });
  if (error) {
    throw error;
  }
  return res;
};
const getUserById = async (token, userId) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).catch((err) => {
    console.log(err);
    error = err.detail;
    return null;
  });
  if (error) {
    throw error;
  }
  return res;
};
const updateUserInfo = async (token, info) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/users/user/info/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      ...info
    })
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).catch((err) => {
    console.log(err);
    error = err.detail;
    return null;
  });
  if (error) {
    throw error;
  }
  return res;
};
const getAndUpdateUserLocation = async (token) => {
  const location = await getUserPosition().catch((err) => {
    console.log(err);
    return null;
  });
  if (location) {
    await updateUserInfo(token, { location });
    return location;
  } else {
    console.log("Failed to get user location");
    return null;
  }
};
export {
  getUserSettings as a,
  getAndUpdateUserLocation as b,
  getUserById as c,
  getUsers as g,
  updateUserSettings as u
};
//# sourceMappingURL=index6.js.map
