import { AccountMenu } from './AccountMenu';
import './Header.scss';
export const UserHeader = () => {
  return (
    /*<div>
      <button className="headerBtn">+ create new board</button>
      <button className="headerBtn">Edit profile</button>
      <button className="headerBtn">Log Out</button>
    </div>
    */
    <div className="userHeaderCont">
      <button className="headerBtn">+ создать борд</button>
      {/*<button className="headerBtn">Редактировать профиль</button>
      <button className="headerBtn">Выйти</button>*/}
      <AccountMenu />
    </div>
  );
};
