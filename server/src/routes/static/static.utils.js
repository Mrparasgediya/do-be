const getBrandVideoImageDataFromResponse = (response) => {
  const [small, med, large, xs] = response.eager;
  return {
    publicId: response.public_id,
    src: {
      org: {
        url: response.secure_url,
      },
      xs: {
        url: xs.secure_url,
      },
      small: {
        url: small.secure_url,
      },
      med: {
        url: med.secure_url,
      },
      large: {
        url: large.secure_url,
      },
    },
  };
};
const getNewsletterImageDataFromResponse = (response) => {
  const [xs, small, med, large] = response.eager;
  return {
    src: {
      org: { url: response.secure_url },
      xs: { url: xs.secure_url },
      small: { url: small.secure_url },
      med: { url: med.secure_url },
      large: { url: large.secure_url },
    },
    publicId: response.public_id,
  };
};
module.exports = {
  getBrandVideoImageDataFromResponse,
  getNewsletterImageDataFromResponse,
};
