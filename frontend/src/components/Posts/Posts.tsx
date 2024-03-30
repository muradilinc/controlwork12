import PostItem from './PostItem';
import { useAppSelector } from '../../app/hooks';
import { selectPosts } from '../../store/posts/postsSlice';

const Posts = () => {
  const posts = useAppSelector(selectPosts);
  return (
    <div className="flex gap-x-3 flex-wrap gap-y-3">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
