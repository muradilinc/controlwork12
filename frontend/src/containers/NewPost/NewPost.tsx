import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../store/posts/postsThunk';
import { PostMutation } from '../../types';

const NewPost = () => {
  const [state, setState] = useState<PostMutation>({
    title: '',
    image: null,
  });
  const imageSelect = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const [imageData, setImageData] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectImage = () => {
    if (imageSelect.current) {
      imageSelect.current.click();
    }
  };

  const changeImageFiled = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files[0]) {
      setFilename(files[0].name);
      const imageUrl = URL.createObjectURL(files[0]);
      setImageData(imageUrl);
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const clearImageField = () => {
    setFilename('');
    setImageData('');
    setState((prevState) => ({
      ...prevState,
      avatar: null,
    }));
    if (imageSelect.current) {
      imageSelect.current.value = '';
    }
  };

  const createPostHandle = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(createPost(state)).unwrap();
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={createPostHandle}
        className="grid grid-cols-1 bg-[#E7E7E7] w-[50%] p-5 rounded-[5px] gap-y-3"
      >
        <div className="grid grid-cols-2">
          <h4 className="capitalize text-[18px]">title</h4>
          <input
            type="text"
            value={state.title}
            name="title"
            onChange={changeField}
            className="text-[20px] outline-0 px-[10px] py-[5px] border-b border-black placeholder:capitalize"
            required
          />
        </div>
        <div className="grid grid-cols-2">
          <p className="capitalize text-[18px]">image</p>
          <input
            type="file"
            className="hidden"
            name="image"
            ref={imageSelect}
            onChange={changeImageFiled}
          />
          {filename.length === 0 ? (
            <button
              className="capitalize border-[#ef233c] border text-[#ef233c] font-bold p-[5px] px-[10px] rounded-[35px]"
              onClick={selectImage}
              type="button"
            >
              browse
            </button>
          ) : (
            <div className="flex relative">
              <img
                className="w-full object-contain max-h-[350px]"
                src={imageData}
                alt="preview"
              />
              <button
                onClick={clearImageField}
                type="button"
                className="absolute bg-[#ff6314] text-white px-[10px] py-[2px] text-center right-[15px] top-[10px] rounded-[50%]"
              >
                x
              </button>
            </div>
          )}
        </div>
        <button className="bg-[#ef233c] text-white py-[5px] px-[10px] rounded-[5px]">
          create photo
        </button>
      </form>
    </div>
  );
};

export default NewPost;
