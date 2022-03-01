const axios = require("axios");

/**
 * recaptchaValidation - Retrieves a score from Google based on user's interaction
 * @param {string} recaptchaToken // This is the token received from the clientside ReCaptcha script
 * @returns {object} // Object contains 2 properties 'successful' and 'message'
 */
const recaptchaValidation = async (recaptchaToken) => {
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

const createTrelloCard = async (
  name,
  description,
  listId,
  members,
  labelId
) => {
  const today = new Date();
  const result = await (async () => {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}&idList=${listId}`,
        {
          // Card Title
          name,
          // Card Description/Body
          desc: description,
          // Place the card at the bottom so older cards are near the top
          pos: "bottom",
          // Assign the card to the appropriate person(s)
          idMembers: members,
          // // Give the card a 24 hour due date
          due: `${today.setDate(today.getDate() + 1)}`,
          // // Apply a red "New" label
          idLabels: [labelId],
        },
        {
          method: "POST",
        }
      );
      return { successful: true, message: response };
    } catch (error) {}
  })();
  return result;
};

exports.handler = async (event, context) => {
  const formData = JSON.parse(event.body);

  // Check if Google thinks this interaction is suspicious
  const recaptchaValidationResult = await recaptchaValidation(
    formData.recaptchaToken
  );
  // Check if Recaptcha was able to process the interaction
  if (!recaptchaValidationResult.successful) {
    // this is sent if the recaptcha was not successful
    // res.status(400).send(recaptchaValidationResult.message);
    return {
      statusCode: 400,
      body: recaptchaValidationResult.message,
    };
  } else {
    // Make sure the value returned is numeric
    const googleCaptchaScore = Number(recaptchaValidationResult.message);
    // Arbitrarily setting the threshold of suspicion @ 0.5 adjust as needed
    if (googleCaptchaScore > 0.6) {
      // SET BOARD USER IDS
      const studio = process.env.TRELLO_STUDIO_ID;
      const diogo = process.env.TRELLO_DIOGO_ID;

      const trelloLists = [
        {
          id: "6216425e9e1a7378fd0e26ac",
          name: "New",
          closed: false,
          idBoard: "621641897bd62a0f15e02879",
          pos: 8192,
          subscribed: false,
          softLimit: null,
        },
        {
          id: "621641897bd62a0f15e0287a",
          name: "To Do",
          closed: false,
          idBoard: "621641897bd62a0f15e02879",
          pos: 16384,
          subscribed: false,
          softLimit: null,
        },
        {
          id: "621641897bd62a0f15e0287b",
          name: "Doing",
          closed: false,
          idBoard: "621641897bd62a0f15e02879",
          pos: 32768,
          subscribed: false,
          softLimit: null,
        },
        {
          id: "62164270e9a59a340bea5000",
          name: "On Hold",
          closed: false,
          idBoard: "621641897bd62a0f15e02879",
          pos: 40960,
          subscribed: false,
          softLimit: null,
        },
        {
          id: "621641897bd62a0f15e0287c",
          name: "Done",
          closed: false,
          idBoard: "621641897bd62a0f15e02879",
          pos: 49152,
          subscribed: false,
          softLimit: null,
        },
      ];
      const trelloLabels = [
        {
          id: "621641891cbc61053b50fa8b",
          idBoard: "621641897bd62a0f15e02879",
          name: "Photography",
          color: "orange",
        },
        {
          id: "621641891cbc61053b50fa8e",
          idBoard: "621641897bd62a0f15e02879",
          name: "On Hold",
          color: "red",
        },
        {
          id: "621641891cbc61053b50fa91",
          idBoard: "621641897bd62a0f15e02879",
          name: "Other",
          color: "yellow",
        },
        {
          id: "621641891cbc61053b50fa93",
          idBoard: "621641897bd62a0f15e02879",
          name: "Video",
          color: "purple",
        },
        {
          id: "621641891cbc61053b50fa94",
          idBoard: "621641897bd62a0f15e02879",
          name: "Flyer",
          color: "pink",
        },
        {
          id: "621641891cbc61053b50fa96",
          idBoard: "621641897bd62a0f15e02879",
          name: "Logo",
          color: "green",
        },
      ];
      // Use the user's request to filter the right label
      // Grab that label's id
      // Trigger the createTrelloCard function
      const selectedLabel = trelloLabels.filter(
        (label) => label.name.toLowerCase() === formData.request
      );
      const listId = trelloLists[0].id;
      let {
        name,
        email,
        building,
        department,
        request,
        videoEventName,
        videoEventDescription,
        videoLocation,
        videoEventDate,
        videoEventTime,
        photoEventName,
        photoEventDate,
        photoEventTime,
        photoEventDescription,
        flyerDescription,
        flyerDeadline,
        flyerDistribution,
        logoDescription,
        additionalInformation,
      } = formData;
      const userEmail = `${email}@longbranch.k12.nj.us`;
      const cardName = `Request for ${request} from ${email}`;
      let cardDescription = ``;
      switch (request) {
        case "video":
          cardDescription = `
#${request.toUpperCase()} Project | ${department} Department

from ${name} ${userEmail} @${building}

---

##Project Name

*${videoEventName}*

---

##Project Details

  - Date: ${videoEventDate}
  - Time: ${videoEventTime}
  - Location: ${videoLocation}

---

##Project Description

*${videoEventDescription}*

> ${additionalInformation}

          `;
          break;
        case "photography":
          cardDescription = `
#${request.toUpperCase()} Project | ${department} Department

from ${name} ${userEmail} @${building}

---

##Project Name

*${photoEventName}*

---

##Project Details

  - Date: ${photoEventDate}
  - Time: ${photoEventTime}

---

##Project Description

*${photoEventDescription}*

> ${additionalInformation}

          `;

          break;
        case "flyer":
          cardDescription = `
#${request.toUpperCase()} Project | ${department} Department

from ${name} ${userEmail} @${building}

##Project Details

  - Date: ${flyerDeadline}
  - Distribution Assistance Requested: ${flyerDistribution}

---

##Project Description

*${flyerDescription}*

> ${additionalInformation}

          `;

          break;
        case "logo":
          cardDescription = `
#${request.toUpperCase()} Project | ${department} Department

from ${name} ${userEmail} @${building}

##Project Description

*${logoDescription}*

> ${additionalInformation}

          `;

          break;
        default:
          cardDescription = `
#${request.toUpperCase()} Project | ${department} Department

from ${name} ${userEmail} @${building}

##Project Description


> ${additionalInformation}

          `;
      }
      const trelloResult = await createTrelloCard(
        cardName,
        cardDescription,
        listId,
        [diogo, studio],
        selectedLabel[0].id
      );
      if (trelloResult.message.status === 200) {
        console.log("success");
      } else {
        return {
          statusCode: 400,
          body: "Error with Trello integration. Message not saved. Please try again later.",
        };
      }
    } else {
      // The ReCaptcha score was too low and we are not accepting this submission
      return {
        statusCode: 400,
        body: "Action not taken, possible bot detected.",
      };
    }
  }

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
