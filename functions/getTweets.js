const axios = require("axios");
exports.handler = async (event, context) => {
  try {
    const myConst = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log(myConst);
  } catch (error) {
    console.log(error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World!" }),
  };
};
