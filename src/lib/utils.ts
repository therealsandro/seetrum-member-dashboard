export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const extractInitials = (name: string) => {
  const words = name.trim().split(" ");
  let initials = "";

  for (let i = 0; i < words.length && initials.length < 2; i++) {
    initials += words[i].charAt(0);
  }

  return initials.toUpperCase();
};

export const pretyDate = (date: Date) => {
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatSize = (bytes: number) => {
  if (bytes < 1024) {
    return bytes + " B";
  } else if (bytes < 1048576) {
    const kilobytes = (bytes / 1024).toFixed(2);
    return kilobytes + " KB";
  } else {
    const megabytes = (bytes / 1048576).toFixed(2);
    return megabytes + " MB";
  }
};

export const getFileName = (filename: string) => {
  return filename.split("-").slice(1).join("-");
};
