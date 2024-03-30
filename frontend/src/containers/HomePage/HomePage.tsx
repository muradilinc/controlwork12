import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPosts } from '../../store/posts/postsThunk';
import Posts from '../../components/Posts/Posts';
import { selectPosts } from '../../store/posts/postsSlice';

const HomePage = () => {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return <>{posts ? <Posts /> : <h4>No items!(</h4>}</>;
};

export default HomePage;
