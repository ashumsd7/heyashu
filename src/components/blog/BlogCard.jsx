import React from 'react';
import { FaBookOpen } from 'react-icons/fa';

const BlogCard = ({
  name = "Ociel Gonzalez",
  writtenOn = "Aug 18 (12 hours ago)",
  title = "6 Simple (But Effective) Pieces Of Advice I’d Give Anyone Starting In 3D Web Development",
  minRead = "3",
  tags = ['webdev', 'javascript', 'beginners', 'programming'],
  profilePic = "https://path-to-profile-pic.jpg",
  thumbnail = "https://via.placeholder.com/150", // Default thumbnail image
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md cursor-pointer bg-white flex flex-col md:flex-row max-w-6xl items-center">
      <div className="flex-1 w-full md:w-auto">
        <div className="flex items-center mb-4">
          <img src={profilePic} alt={`${name}'s profile`} className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <div className="font-semibold text-gray-900">{name}</div>
            <div className="text-gray-500 text-sm">{writtenOn}</div>
          </div>
        </div>
        <h2 className="font-bold text-lg md:text-xl text-gray-900 mb-2">
          {title}
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center space-x-3">
            {/* <span role="img" aria-label="reactions">
              ❤️ 2 Reactions
            </span>
            <span>
              💬 1 Comment
            </span> */}
            <span>
              ⏲️ {minRead} min read
            </span>
           
          </div>
        </div>
      </div>
      <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-auto">
        <img src={thumbnail} alt="thumbnail" className="w-full md:w-24 h-24 object-cover rounded-lg" />
      </div>
    </div>
  );
};

export default BlogCard;
