const axios = require("axios");
const twitter = require("twitter-text");

const getTweets = async () => {
  let result = await (async () => {
    try {
      const response = axios.get(
        `https://api.twitter.com/2/users/${process.env.TWITTER_USERID}/tweets?max_results=5&expansions=attachments.media_keys&tweet.fields=attachments,public_metrics&media.fields=type,url,width,height,duration_ms,public_metrics`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  })();
  console.log(result.data.data);
  result.data.data.forEach((tweet) => {
    tweet.text = twitter.autoLink(tweet.text);
    console.log(tweet.text);
  });
  return result;
};

exports.handler = async (event, context) => {
  const myConst = await getTweets();
  return {
    statusCode: myConst.status,
    body: JSON.stringify(myConst.data),
  };
};
