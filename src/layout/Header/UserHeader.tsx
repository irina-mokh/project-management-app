import { AccountMenu } from './AccountMenu';
import { useSearchParams } from 'react-router-dom';

import './Header.scss';
import { useTranslation } from 'react-i18next';
export const UserHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const addBoardHandler = () => {
    // добавляем в url search параметр create-modal
    searchParams.set('create-board', 'true');
    setSearchParams(searchParams);
  };
  const { t } = useTranslation();

  return (
    <div className="userHeaderCont">
      <button className="headerBtn" onClick={addBoardHandler}>
        {t('createBoard')}
      </button>
      <AccountMenu />
    </div>
  );
};
