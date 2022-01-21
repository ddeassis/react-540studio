const axios = require("axios");
const twitter = require("twitter-text");

const getTweets = async () => {
  let result = await (async () => {
    try {
      const response = axios.get(
        `https://api.twitter.com/2/users/${process.env.TWITTER_USERID}/tweets?max_results=5&expansions=attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id&tweet.fields=attachments,created_at,public_metrics&media.fields=type,url,width,height,duration_ms,public_metrics`,
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
  result.data.data.forEach((tweet) => {
    tweet.text = twitter.autoLink(tweet.text);
  });
  result.data.includes.tweets.forEach((tweet) => {
    tweet.text = twitter.autoLink(tweet.text);
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
