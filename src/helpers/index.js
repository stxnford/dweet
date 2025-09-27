const delay = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

const trimString = (string, length) => {
  if (string && string.length > length) {
    let trimmed = string.substr(0, length);

    return `${trimmed} ...`;
  }
  return string;
};

const paginate = (src, page, perPage) => {
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
