import { AccountMenu } from './AccountMenu';
import { useSearchParams } from 'react-router-dom';

import './Header.scss';
export const UserHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const addBoardHandler = () => {
    // добавляем в url search параметр create-modal
    searchParams.set('create-board', 'true');
    setSearchParams(searchParams);
  };

  return (
    /*<div>
      <button className="headerBtn">+ create new board</button>
      <button className="headerBtn">Edit profile</button>
      <button className="headerBtn">Log Out</button>
    </div>
    */
    <div className="userHeaderCont">
      <button className="headerBtn" onClick={addBoardHandler}>
        + create board
      </button>
      {/*<button className="headerBtn">Редактировать профиль</button>
      <button className="headerBtn">Выйти</button>*/}
      <AccountMenu />
    </div>
  );
};
