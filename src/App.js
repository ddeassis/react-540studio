import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import TwitterCard from "./components/TwitterCard";
function App() {
  const [loading, setLoading] = useState(true);
  const [twitterData, setTwitterData] = useState(null);

  const fetchData = async () => {
    const results = await axios.get("/api/getTweets");
    if (results.status === 200) {
      setLoading(false);
    }
    return results;
  };
  useEffect(() => {
    fetchData().then((res) => {
      setTwitterData(res);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-stone-100 bg-stone-900">
      <Header />
      <main className="max-w-2xl mx-auto p-2 md:p-3 lg:p-4 font-redhat">
        <p className="prose text-stone-100 md:prose-xl lg:prose-2xl mb-3 md:mb-4 lg:mb-6">
          This is where Diogo should craft a short explanation of 540Studio's
          mission.
        </p>
        {!loading && twitterData ? (
          <div id="twitter-posts">
            {console.log("ALL TWEET DATA", twitterData.data)}
            <ul className="not-prose grid gap-y-3 md:gap-y-4 lg:gap-y-6">
              {twitterData.data.data.map((tweet) => {
                console.log("JUST TWEET DATA", tweet);
                if (tweet.attachments) {
                  const media_keys = tweet.attachments.media_keys;
                  console.log("MEDIA KEYS", media_keys);
                }
                return (
                  <li key={tweet.id}>
                    <TwitterCard text={tweet.text} />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="text-center animate-pulse text-green-500">
            LOADING...
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
