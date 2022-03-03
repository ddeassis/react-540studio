import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import TwitterCard from "./components/TwitterCard";
import { FiTwitter, FiInstagram } from "react-icons/fi";
import Card from "./components/Card";
import YouTubeCard from "./components/YouTubeCard";
import { HiPlus } from "react-icons/hi";
import Form from "./components/Form";
function App() {
  const [loading, setLoading] = useState(true);
  const [contentData, setContentData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const requestHandler = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  const fetchData = async () => {
    const results = await axios.get("/api/getContent");
    if (results.status === 200) {
      setLoading(false);
    }
    return results;
  };
  useEffect(() => {
    fetchData().then((res) => {
      setContentData(res);
    });
  }, []);
  // useEffect(() => {
  //   contentData !== null && console.log("contentData = ", contentData);
  // }, [contentData]);

  return (
    <div className="flex flex-col min-h-screen text-stone-100 bg-stone-800">
      <Header />
      <main className="max-w-2xl mx-auto font-redhat py-3 md:py-4 lg:py-6">
        <p className="prose text-stone-100 md:prose-xl lg:prose-2xl mb-3 md:mb-4 lg:mb-6 px-3 md:px-4 lg:px-6">
          This is where Diogo should craft a short explanation of 540Studio's
          mission.
        </p> 
        {showForm && <Form onChildClick={requestHandler} />}
        {!loading && contentData && !showForm ? (
          <>
            <button
              onClick={requestHandler}
              className="fixed flex items-center justify-center bottom-6 right-6 mx-auto w-16 h-16 z-20 rounded-full bg-green-500  border border-white "
            >
              <HiPlus className="w-12 h-12" />
            </button>
            <div id="social-content" className="px-3 md:px-4 lg:px-6">
              <ul className="not-prose grid  divide-y divide-green-500 divide-dotted">
                {contentData.data.content.map((item) => {
                  // check if item is youtube
                  if (item.kind) {
                    // item is youtube
                    return (
                      <li key={item.id} className="py-8">
                        <Card>
                          <YouTubeCard
                            videoId={item.contentDetails.upload.videoId}
                            thumbnails={item.snippet.thumbnails}
                            title={item.snippet.title}
                          />
                        </Card>
                      </li>
                    );
                  } else {
                    // item is twitter
                    // This is where we get the urls to the media objects
                    let media;
                    if (item.attachments) {
                      const media_keys = item.attachments.media_keys;
                      media = contentData.data.includes.media.filter((item) => {
                        return media_keys.includes(item.media_key);
                      });
                    }
                    // end media object retrieval
                    // Get the retweet full text
                    let rt_data;
                    if (item.referenced_tweets) {
                      // this code is executed if the tweet is a retweet
                      // console.log(tweet.referenced_tweets[0]);
                      const users = contentData.data.includes.users;
                      const tweets = contentData.data.includes.tweets;
                      const referenced_tweet_id = item.referenced_tweets[0].id;
                      const referenced_tweet = tweets.filter((tweet) => {
                        return tweet.id === referenced_tweet_id;
                      });
                      const referenced_tweet_author_id =
                        referenced_tweet[0].author_id;

                      const referenced_tweet_user = users.filter((user) => {
                        return user.id === referenced_tweet_author_id;
                      });
                      const referenced_tweet_username =
                        referenced_tweet_user[0].username;

                      rt_data = tweets.filter((rt_item) => {
                        return rt_item.id === referenced_tweet_id;
                      });
                      rt_data.username = referenced_tweet_username;
                    } else {
                      rt_data = false;
                    }
                    // end getting retweet full text
                    return (
                      <li key={item.id} className="py-8">
                        <Card>
                          <TwitterCard
                            text={item.text}
                            media={media}
                            date={item.created_at}
                            metrics={item.public_metrics}
                            retweet={rt_data ? rt_data : false}
                          />
                        </Card>
                      </li>
                    );
                  }
                })}
              </ul>
              <div className="my-3 md:my-4 lg:my-6">
                <p className="text-3xl md:text-4xl lg:text-5xl">
                  Looking for more? Visit us at your preferred platform
                </p>
                <div className="flex justify-around my-3 md:my-4 lg:my-6">
                  <div className="text-center">
                    <a href="https://twitter.com/lb540studio">
                      <FiTwitter className="h-12 w-12 text-green-400 mx-auto" />
                      <p>Check us Out on Twitter</p>
                    </a>
                  </div>
                  <div className="text-center">
                    <a href="https://instagram.com/lb540studio">
                      <FiInstagram className="h-12 w-12 text-green-400 mx-auto" />
                      <p>Check us Out on Instagram</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center animate-pulse text-green-500">
            {!showForm && `LOADING...`}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
