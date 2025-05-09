import { v4 } from "uuid";
import "js-sha256";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import isToday from "dayjs/plugin/isToday.js";
import isYesterday from "dayjs/plugin/isYesterday.js";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import { g as WEBUI_BASE_URL } from "./index3.js";
dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(localizedFormat);
const replaceTokens = (content, sourceIds, char, user) => {
  const charToken = /{{char}}/gi;
  const userToken = /{{user}}/gi;
  const videoIdToken = /{{VIDEO_FILE_ID_([a-f0-9-]+)}}/gi;
  const htmlIdToken = /{{HTML_FILE_ID_([a-f0-9-]+)}}/gi;
  if (char !== void 0 && char !== null) {
    content = content.replace(charToken, char);
  }
  if (user !== void 0 && user !== null) {
    content = content.replace(userToken, user);
  }
  content = content.replace(videoIdToken, (match, fileId) => {
    const videoUrl = `${WEBUI_BASE_URL}/api/v1/files/${fileId}/content`;
    return `<video src="${videoUrl}" controls></video>`;
  });
  content = content.replace(htmlIdToken, (match, fileId) => {
    const htmlUrl = `${WEBUI_BASE_URL}/api/v1/files/${fileId}/content/html`;
    return `<iframe src="${htmlUrl}" width="100%" frameborder="0" onload="this.style.height=(this.contentWindow.document.body.scrollHeight+20)+'px';"></iframe>`;
  });
  if (Array.isArray(sourceIds)) {
    sourceIds.forEach((sourceId, idx) => {
      const sourceToken = `\\[${idx}\\]`;
      const sourceRegex = new RegExp(sourceToken, "g");
      content = content.replace(sourceRegex, `<source_id data="${idx}" title="${sourceId}" />`);
    });
  }
  return content;
};
const sanitizeResponseContent = (content) => {
  return content.replace(/<\|[a-z]*$/, "").replace(/<\|[a-z]+\|$/, "").replace(/<$/, "").replaceAll(/<\|[a-z]+\|>/g, " ").replaceAll("<", "&lt;").replaceAll(">", "&gt;").trim();
};
const processResponseContent = (content) => {
  return content.trim();
};
function unescapeHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent;
}
const convertMessagesToHistory = (messages) => {
  const history = {
    messages: {},
    currentId: null
  };
  let parentMessageId = null;
  let messageId = null;
  for (const message of messages) {
    messageId = v4();
    if (parentMessageId !== null) {
      history.messages[parentMessageId].childrenIds = [
        ...history.messages[parentMessageId].childrenIds,
        messageId
      ];
    }
    history.messages[messageId] = {
      ...message,
      id: messageId,
      parentId: parentMessageId,
      childrenIds: []
    };
    parentMessageId = messageId;
  }
  history.currentId = messageId;
  return history;
};
const compressImage = async (imageUrl, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      if (maxWidth && maxHeight) {
        if (width <= maxWidth && height <= maxHeight) {
          resolve(imageUrl);
          return;
        }
        if (width / height > maxWidth / maxHeight) {
          height = Math.round(maxWidth * height / width);
          width = maxWidth;
        } else {
          width = Math.round(maxHeight * width / height);
          height = maxHeight;
        }
      } else if (maxWidth) {
        if (width <= maxWidth) {
          resolve(imageUrl);
          return;
        }
        height = Math.round(maxWidth * height / width);
        width = maxWidth;
      } else if (maxHeight) {
        if (height <= maxHeight) {
          resolve(imageUrl);
          return;
        }
        width = Math.round(maxHeight * width / height);
        height = maxHeight;
      }
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, width, height);
      const compressedUrl = canvas.toDataURL();
      resolve(compressedUrl);
    };
    img.onerror = (error) => reject(error);
    img.src = imageUrl;
  });
};
const formatDate = (inputDate) => {
  const date = dayjs(inputDate);
  dayjs();
  if (date.isToday()) {
    return `Today at ${date.format("LT")}`;
  } else if (date.isYesterday()) {
    return `Yesterday at ${date.format("LT")}`;
  } else {
    return `${date.format("L")} at ${date.format("LT")}`;
  }
};
const getUserPosition = async (raw = false) => {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }).catch((error) => {
    console.error("Error getting user location:", error);
    throw error;
  });
  if (!position) {
    return "Location not available";
  }
  const { latitude, longitude } = position.coords;
  if (raw) {
    return { latitude, longitude };
  } else {
    return `${latitude.toFixed(3)}, ${longitude.toFixed(3)} (lat, long)`;
  }
};
const removeDetails = (content, types) => {
  for (const type of types) {
    content = content.replace(
      new RegExp(`<details\\s+type="${type}"[^>]*>.*?<\\/details>`, "gis"),
      ""
    );
  }
  return content;
};
const blobToFile = (blob, fileName) => {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
};
const getPromptVariables = (user_name, user_location, user_api_key) => {
  return {
    "{{USER_NAME}}": user_name,
    "{{USER_LOCATION}}": user_location || "Unknown",
    "{{USER_API_KEY}}": user_api_key || "",
    "{{CURRENT_DATETIME}}": getCurrentDateTime(),
    "{{CURRENT_DATE}}": getFormattedDate(),
    "{{CURRENT_TIME}}": getFormattedTime(),
    "{{CURRENT_WEEKDAY}}": getWeekday(),
    "{{CURRENT_TIMEZONE}}": getUserTimezone(),
    "{{USER_LANGUAGE}}": localStorage.getItem("locale") || "en-US"
  };
};
const promptTemplate = (template, user_name, user_location, user_api_key) => {
  const currentDate = /* @__PURE__ */ new Date();
  const formattedDate = currentDate.getFullYear() + "-" + String(currentDate.getMonth() + 1).padStart(2, "0") + "-" + String(currentDate.getDate()).padStart(2, "0");
  const currentTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  });
  const currentWeekday = getWeekday();
  const currentTimezone = getUserTimezone();
  const userLanguage = localStorage.getItem("locale") || "en-US";
  template = template.replace("{{CURRENT_DATETIME}}", `${formattedDate} ${currentTime}`);
  template = template.replace("{{CURRENT_DATE}}", formattedDate);
  template = template.replace("{{CURRENT_TIME}}", currentTime);
  template = template.replace("{{CURRENT_WEEKDAY}}", currentWeekday);
  template = template.replace("{{CURRENT_TIMEZONE}}", currentTimezone);
  template = template.replace("{{USER_LANGUAGE}}", userLanguage);
  if (user_name) {
    template = template.replace("{{USER_NAME}}", user_name);
  }
  if (user_location) {
    template = template.replace("{{USER_LOCATION}}", user_location);
  } else {
    template = template.replace("{{USER_LOCATION}}", "LOCATION_UNKNOWN");
  }
  if (user_api_key) {
    template = template.replace("{{USER_API_KEY}}", user_api_key);
  } else {
    template = template.replace("{{USER_API_KEY}}", "");
  }
  return template;
};
const getTimeRange = (timestamp) => {
  const now = /* @__PURE__ */ new Date();
  const date = new Date(timestamp * 1e3);
  const diffTime = now.getTime() - date.getTime();
  const diffDays = diffTime / (1e3 * 3600 * 24);
  const nowDate = now.getDate();
  const nowMonth = now.getMonth();
  const nowYear = now.getFullYear();
  const dateDate = date.getDate();
  const dateMonth = date.getMonth();
  const dateYear = date.getFullYear();
  if (nowYear === dateYear && nowMonth === dateMonth && nowDate === dateDate) {
    return "Today";
  } else if (nowYear === dateYear && nowMonth === dateMonth && nowDate - dateDate === 1) {
    return "Yesterday";
  } else if (diffDays <= 7) {
    return "Previous 7 days";
  } else if (diffDays <= 30) {
    return "Previous 30 days";
  } else if (nowYear === dateYear) {
    return date.toLocaleString("default", { month: "long" });
  } else {
    return date.getFullYear().toString();
  }
};
const getFormattedDate = () => {
  const date = /* @__PURE__ */ new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const getFormattedTime = () => {
  const date = /* @__PURE__ */ new Date();
  return date.toTimeString().split(" ")[0];
};
const getCurrentDateTime = () => {
  return `${getFormattedDate()} ${getFormattedTime()}`;
};
const getUserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
const getWeekday = () => {
  const date = /* @__PURE__ */ new Date();
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekdays[date.getDay()];
};
const createMessagesList = (history, messageId) => {
  if (messageId === null) {
    return [];
  }
  const message = history.messages[messageId];
  if (message?.parentId) {
    return [...createMessagesList(history, message.parentId), message];
  } else {
    return [message];
  }
};
const formatFileSize = (size) => {
  if (size == null) return "Unknown size";
  if (typeof size !== "number" || size < 0) return "Invalid size";
  if (size === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
};
const getLineCount = (text) => {
  console.log(typeof text);
  return text ? text.split("\n").length : 0;
};
export {
  createMessagesList as a,
  blobToFile as b,
  compressImage as c,
  convertMessagesToHistory as d,
  getUserPosition as e,
  formatDate as f,
  getPromptVariables as g,
  getTimeRange as h,
  formatFileSize as i,
  getLineCount as j,
  replaceTokens as k,
  processResponseContent as l,
  promptTemplate as p,
  removeDetails as r,
  sanitizeResponseContent as s,
  unescapeHtml as u
};
//# sourceMappingURL=index5.js.map
