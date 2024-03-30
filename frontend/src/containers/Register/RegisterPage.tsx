import { ChangeEvent, FormEvent, useState } from 'react';
import { RegisterMutation } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { register } from '../../store/users/usersThunk';

const RegisterPage = () => {
  const [state, setState] = useState<RegisterMutation>({
    email: '',
    username: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeFields = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const registerHandle = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(register(state)).unwrap();
    setState({
      email: '',
      username: '',
      password: '',
    });
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <div className="bg-[#E7E7E7] w-[40%] p-5 rounded-[5px]">
        <h2 className="text-center font-semibold text-[32px] text-[#ef233c]">
          Register form
        </h2>
        <form
          onSubmit={registerHandle}
          className="flex flex-col gap-y-3 my-[15px]"
        >
          <input
            className="bg-inherit text-[20px] outline-0 px-[10px] py-[5px] border-b border-black placeholder:capitalize"
            type="email"
            placeholder="email"
            name="email"
            value={state.email}
            onChange={changeFields}
            required
          />
          <input
            className="bg-inherit text-[20px]  outline-0 px-[10px] py-[5px] border-b border-black placeholder:capitalize"
            type="text"
            placeholder="nickname"
            name="username"
            value={state.username}
            onChange={changeFields}
            required
          />
          <input
            className="bg-inherit text-[20px]  outline-0 px-[10px] py-[5px] border-b border-black placeholder:capitalize"
            placeholder="password"
            type="password"
            name="password"
            value={state.password}
            onChange={changeFields}
            required
          />
          <button
            type="submit"
            className="capitalize bg-[#ef233c] py-[10px] rounded-[5px] text-white my-[20px]"
          >
            sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
