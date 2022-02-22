const axios = require("axios");
const twitter = require("twitter-text");

const getContent = async () => {
  let twitterResult = await (async () => {
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
  let youtubeResult = await (async () => {
    try {
      const response = axios.get(
        `https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2C%20contentDetails&channelId=UCto2jFEiI05nyTx9L3CqTOQ&maxResults=5&key=${process.env.YOUTUBE_API_KEY}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  })();
  twitterResult.data.data.forEach((tweet) => {
    tweet.text = twitter.autoLink(tweet.text);
  });
  twitterResult.data.includes.tweets.forEach((tweet) => {
    tweet.text = twitter.autoLink(tweet.text);
  });
  let unsortedContent = [];
  twitterResult.data.data.forEach((result) => {
    unsortedContent.push(result);
  });

  youtubeResult.data.items.forEach((result) => unsortedContent.push(result));
  unsortedContent.forEach((item) => {
    if (item.kind === "youtube#activity") {
      item.created_at = item.snippet.publishedAt;
    }
  });
  let sortedContent = unsortedContent.sort((a, b) => {
    let aDate = new Date(a.created_at);
    let bDate = new Date(b.created_at);
    if (aDate > bDate) {
      return -1;
    } else {
      return 1;
    }
  });
  // console.log(sortedContent);
  const returnContent = {
    content: sortedContent,
    includes: twitterResult.data.includes,
  };
  return returnContent;
};

exports.handler = async (event, context) => {
  const myConst = await getContent();

  return {
    statusCode: 200,
    body: JSON.stringify(myConst),
  };
};
