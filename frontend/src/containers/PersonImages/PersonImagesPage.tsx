import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getOneUser, getPosts } from '../../store/posts/postsThunk';
import Posts from '../../components/Posts/Posts';
import {
  selectGuest,
  selectPosts,
  selectPostsLoading,
} from '../../store/posts/postsSlice';
import Spinner from '../../components/Spinner/Spinner';
import { selectUser } from '../../store/users/usersSlice';

const PersonImagesPage = () => {
  const { id } = useParams() as { id: string };
  const posts = useAppSelector(selectPosts);
  const guest = useAppSelector(selectGuest);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user?._id !== id) {
      dispatch(getOneUser(id));
    }
  }, [dispatch, id, user?._id]);

  useEffect(() => {
    if (guest) {
      dispatch(getPosts(guest._id));
    } else if (user?._id === id) {
      dispatch(getPosts(user._id));
    }
  }, [dispatch, guest, id, user?._id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex justify-between">
        <h4 className="text-[20] font-bold">
          {user?._id !== id ? guest?.displayName + "'" : 'My'} images
        </h4>
        {user?._id === id ? (
          <Link
            to="/submit"
            className="bg-[#ef233c] py-[5px] px-[10px] text-white text-[18px] capitalize rounded-[8px]"
          >
            add image
          </Link>
        ) : null}
      </div>
      <>{posts.length !== 0 ? <Posts /> : <h4>No items!(</h4>}</>
    </div>
  );
};

export default PersonImagesPage;
