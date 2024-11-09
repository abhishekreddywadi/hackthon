// frontend/src/components/VideoCard.jsx
// import React from "react";
import PropTypes from "prop-types";

const VideoCard = ({ video }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 m-2 max-w-sm md:max-w-lg lg:max-w-4xl xl:max-w-6xl mx-auto">
      <img
        src={video.thumbnail.static}
        alt={video.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-2">
        <h3 className="text-lg font-semibold">{video.title}</h3>
        <p className="text-gray-600">{video.description}</p>
        <p className="text-sm text-gray-500">Views: {video.views}</p>
        <p className="text-sm text-gray-500">Length: {video.length}</p>
        <p className="text-sm text-gray-500">
          Published: {video.published_date}
        </p>
        <a
          href={video.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Watch Video
        </a>
        <div className="mt-2">
          <a
            href={video.channel.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <img
              src={video.channel.thumbnail}
              alt={video.channel.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-700">{video.channel.name}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
    thumbnail: PropTypes.shape({
      static: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    length: PropTypes.string.isRequired,
    published_date: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    channel: PropTypes.shape({
      link: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default VideoCard;
