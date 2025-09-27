export const delay = (milliseconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

export const trimString = (string: string, length: number) => {
  if (string && string.length > length) {
    const trimmed = string.substr(0, length);

    return `${trimmed} ...`;
  }
  return string;
};

export const paginate = (src: Task[], page: number, perPage: number) => {
  const lastIndex = page * perPage;
  const firstIndex = lastIndex - perPage;
  const paginated = src.slice(firstIndex, lastIndex);

  return paginated;
};

module.exports = {
  delay,
  trimString,
  paginate,
};
