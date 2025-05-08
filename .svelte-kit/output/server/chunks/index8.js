import { p as WEBUI_API_BASE_URL } from "./index3.js";
import { h as getTimeRange } from "./index5.js";
const createNewChat = async (token, chat) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/chats/new`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      chat
    })
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).catch((err) => {
    error = err;
    console.log(err);
    return null;
  });
  if (error) {
    throw error;
  }
  return res;
};
const getChatList = async (token = "", page = null) => {
  let error = null;
  const searchParams = new URLSearchParams();
  if (page !== null) {
    searchParams.append("page", `${page}`);
  }
  const res = await fetch(`${WEBUI_API_BASE_URL}/chats/?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...token && { authorization: `Bearer ${token}` }
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
  }).catch((err) => {
    error = err;
    console.log(err);
    return null;
  });
  if (error) {
    throw error;
  }
  return res.map((chat) => ({
    ...chat,
    time_range: getTimeRange(chat.updated_at)
  }));
};
const getChatListByUserId = async (token = "", userId) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/chats/list/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...token && { authorization: `Bearer ${token}` }
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
  }).catch((err) => {
    error = err;
    console.log(err);
    return null;
  });
  if (error) {
    throw error;
  }
  return res.map((chat) => ({
    ...chat,
    time_range: getTimeRange(chat.updated_at)
  }));
};
const getAllTags = async (token) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/chats/all/tags`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...token && { authorization: `Bearer ${token}` }
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
  }).catch((err) => {
    error = err;
    console.log(err);
    return null;
  });
  if (error) {
    throw error;
  }
  return res;
};
const getChatById = async (token, id) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...token && { authorization: `Bearer ${token}` }
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
  }).catch((err) => {
    error = err.detail;
    console.log(err);
    return null;
  });
  if (error) {
    throw error;
  }
  return res;
};
const getChatByShareId = async (token, share_id) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/chats/share/${share_id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...token && { authorization: `Bearer ${token}` }
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
  }).catch((err) => {
    error = err;
    console.log(err);
    return null;
  });
  if (error) {
    throw error;
  }
  return res;
};
const updateChatById = async (token, id, chat) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...token && { authorization: `Bearer ${token}` }
    },
    body: JSON.stringify({
      chat
    })
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
  }).catch((err) => {
    error = err;
    console.log(err);
    return null;
  });
  if (error) {
    throw error;
  }
  return res;
};
const getTagsById = async (token, id) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/chats/${id}/tags`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...token && { authorization: `Bearer ${token}` }
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
  }).catch((err) => {
    error = err;
    console.log(err);
    return null;
  });
  if (error) {
    throw error;
  }
  return res;
};
export {
  getChatById as a,
  getTagsById as b,
  getChatList as c,
  createNewChat as d,
  getAllTags as e,
  getChatByShareId as f,
  getChatListByUserId as g,
  updateChatById as u
};
//# sourceMappingURL=index8.js.map
