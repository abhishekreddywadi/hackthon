import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

function Documents() {
  const { subtopic } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiKey =
      "6700939c5f01b59f217b907b0ad519ab96796e5cca998e789c5d3332342506da";
    const query = `Give the website of ${subtopic} official website documentation`;
    const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(
      query
    )}&api_key=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setData(response.data.organic_results);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }, [subtopic]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Documents for: {subtopic}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.length > 0 ? (
          data.map((document) => (
            <div
              key={document.link}
              className="transition-transform transform hover:scale-105"
            >
              <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                <h2 className="text-lg font-semibold mb-2">{document.title}</h2>
                <p className="text-gray-600">{document.description}</p>
                <a
                  href={document.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Document
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No documents found.</p>
        )}
      </div>
    </div>
  );
}

export default Documents;
