import { AccountMenu } from './AccountMenu';
import { Link, useSearchParams } from 'react-router-dom';
import './Header.scss';
import { useTranslation } from 'react-i18next';
import { routes } from 'routes';

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
      <button className="headerBtn">
        <Link to={routes.main.path}>{t('boardsPage')}</Link>
      </button>
      <button className="headerBtn" onClick={addBoardHandler}>
        {t('createBoard')}
      </button>
      <AccountMenu />
    </div>
  );
};
