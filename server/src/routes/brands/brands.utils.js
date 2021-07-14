const getDataFromResponse = (response) => {
  const { eager, public_id, secure_url } = response;
  const [xs, small, med, large] = eager;
  return {
    publicId: public_id,
    src: {
      org: { url: secure_url },
      xs: { url: xs.secure_url },
      small: { url: small.secure_url },
      med: { url: med.secure_url },
      large: { url: large.secure_url },
    },
  };
};

module.exports = { getDataFromResponse };
