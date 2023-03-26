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
