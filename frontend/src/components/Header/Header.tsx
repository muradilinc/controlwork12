import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';
import { Link } from 'react-router-dom';
import { logout } from '../../store/users/usersThunk';

const Header = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-[#ef233c] py-5">
      <div className="container mx-auto flex justify-between">
        <Link to="/">
          <h1 className="text-[23px] text-white font-bold">Rinterest</h1>
        </Link>
        <div className="text-white flex gap-x-3 items-center">
          {user ? (
            <>
              <div className="flex gap-x-3 items-center">
                <Link className="capitalize" to={'/person-image/' + user._id}>
                  my images
                </Link>
                <h4 className="font-bold">{user.displayName}</h4>
              </div>
              <button
                onClick={() => dispatch(logout())}
                className="bg-blue-300 text-[16px] capitalize py-[5px] rounded-[5px] px-[10px]"
              >
                logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="bg-blue-300 text-[16px] capitalize py-[5px] rounded-[5px] px-[10px]"
                to="/register"
              >
                sign up
              </Link>
              <Link
                className="bg-blue-300 text-[16px] capitalize py-[5px] rounded-[5px] px-[10px]"
                to="/login"
              >
                sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
