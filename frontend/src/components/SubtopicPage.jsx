import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "./VideoCard";

function SubtopicPage() {
  const { subtopic } = useParams();
  const [data, setData] = useState([]);

  const getJson = async (params) => {
    const { engine, search_query, api_key } = params;
    const url = `https://serpapi.com/search.json?engine=${engine}&search_query=${encodeURIComponent(
      search_query
    )}&api_key=${api_key}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json.video_results); // Update the state with the fetched data
      console.log(json.video_results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMovieResults = async () => {
    const params = {
      engine: "youtube",
      search_query: subtopic,
      api_key:
        "eff1216c3202cbcb71dcd691ee13a8f2812c40bc92fd8a35d51a04d6627c58a9",
    };

    await getJson(params);
  };

  useEffect(() => {
    fetchMovieResults();
  }, [subtopic]); // Call the function to fetch movie results on component mount or when subtopic changes

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Videos for: {subtopic}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.length > 0 ? (
          data.map((video) => (
            <div
              className="transition-transform transform hover:scale-105"
              key={video.link}
            >
              <VideoCard video={video} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No videos found.</p>
        )}
      </div>
    </div>
  );
}

export default SubtopicPage;
