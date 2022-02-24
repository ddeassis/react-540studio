const axios = require("axios");

/**
 * recaptchaValidation - Retrieves a score from Google based on user's interaction
 * @param {string} recaptchaToken // This is the token received from the clientside ReCaptcha script
 * @returns {object} // Object contains 2 properties 'successful' and 'message'
 */
const recaptchaValidation = async ({ recaptchaToken }) => {
  const result = await (async () => {
    try {
      const response = await axios({
        url: "https://www.google.com/recaptcha/api/siteverify",
        method: "POST",
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      });
      return { successful: true, message: response.data.score };
    } catch (error) {
      let message;
      if (error.response) {
        message = `reCAPTCHA server responded with non 2xx code: ${error.response.data}`;
      } else if (error.request) {
        message = `No reCAPTCHA response received: ${error.request}`;
      } else {
        message = `Error setting up reCAPTCHA response: ${error.message}`;
      }
      return { successful: false, message };
    }
  })();
  return result;
};

const createCard = () => {
  return null;
};

exports.handler = async (event, context) => {
  console.log("event = ", event);
  console.log("context = ", context);
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  } else {
  }

  return {
    statusCode: 200,
    body: "Ok!",
  };
};
