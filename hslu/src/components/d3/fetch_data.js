export const getS3Data = (url) => {
  return fetch(url).then(function (response) {
    return response.json();
  });
};
