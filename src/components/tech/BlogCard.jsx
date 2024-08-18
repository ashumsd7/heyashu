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
    <div className="border rounded-lg p-4 shadow-md bg-white flex items-center">
      <div className="flex-1">
        <div className="flex items-center mb-4">
          <img src={profilePic} alt={`${name}'s profile`} className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <div className="font-semibold text-gray-900">{name}</div>
            <div className="text-gray-500 text-sm">{writtenOn}</div>
          </div>
        </div>
        <h2 className="font-bold text-xl text-gray-900 mb-2">
          {title}
        </h2>
        <div className="flex flex-wrap space-x-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center space-x-3">
            <span role="img" aria-label="reactions">
              ❤️ 2 Reactions
            </span>
            <span>
              💬 1 Comment
            </span>
            <span className='flex gap-1 items-center '>
            <FaBookOpen/> {minRead} min read
          </span>
          </div>
         
        </div>
      </div>
      <div className="ml-4">
        <img src={thumbnail} alt="thumbnail" className="w-24 h-24 object-cover rounded-lg" />
      </div>
    </div>
  );
};

export default BlogCard;
