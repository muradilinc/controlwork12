import React, { useState } from 'react';
import { Post } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
  post: Post;
}

const PostItem: React.FC<Props> = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        key={post._id}
        className="max-w-[350px] rounded overflow-hidden shadow-lg"
      >
        <img
          className="w-full"
          src={'http://localhost:3000' + post.image}
          alt="Sunset in the mountains"
          onClick={openDialog}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{post.title}</div>
          <p className="text-gray-700 text-base">
            <Link to={'/person-image/' + post.author._id}>
              author: {post.author.displayName}
            </Link>
          </p>
        </div>
      </div>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={closeDialog}
            >
              <div className="absolute inset-0 bg-black opacity-75"></div>
            </div>
            <div className="bg-white p-8 max-w-3xl mx-auto rounded-lg shadow-lg z-50">
              <div className="flex justify-end">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={closeDialog}
                >
                  Close
                </button>
              </div>
              <img
                src={'http://localhost:3000' + post.image}
                alt="Image"
                className="mt-4"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostItem;
