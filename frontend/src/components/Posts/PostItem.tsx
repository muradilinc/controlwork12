import React, { useState } from 'react';
import { Post } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';
import { deletePost, getPosts } from '../../store/posts/postsThunk';

interface Props {
  post: Post;
}

const PostItem: React.FC<Props> = ({ post }) => {
  const user = useAppSelector(selectUser);
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const deletePostHandle = async (id: string) => {
    await dispatch(deletePost(id)).unwrap();
    if (user?.role !== 'admin') {
      await dispatch(getPosts(user?._id));
    } else {
      await dispatch(getPosts());
    }
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
        {(pathname !== '/' && user?._id === post.author._id) ||
        user?.role === 'admin' ? (
          <div className="px-6 pt-4 pb-2">
            <button
              className="bg-[#ef233c] py-[5px] px-[10px] text-white text-[18px] capitalize rounded-[8px]"
              onClick={() => deletePostHandle(post._id)}
            >
              delete
            </button>
          </div>
        ) : null}
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
