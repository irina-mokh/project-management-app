import { AccountMenu } from './AccountMenu';
import { CreateBoardModal } from 'components/Modals';
import { Link, useSearchParams } from 'react-router-dom';
import './Header.scss';
import { useTranslation } from 'react-i18next';
import { routes } from 'routes';
import { useEffect, useState } from 'react';

export const UserHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const addBoardHandler = () => {
    // добавляем в url search параметр create-modal
    searchParams.set('create-board', 'true');
    setSearchParams(searchParams);
  };
  const { t } = useTranslation();

  const [windowDimenion, detectHW] = useState(window.innerWidth);
  const detectSize = () => {
    detectHW(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDimenion]);

  return (
    <div className="changeHeaderCont">
      <button className="headerBtn">
        <Link to={routes.main.path}>{t('boardsPage')}</Link>
      </button>
      <button className="headerBtn" onClick={addBoardHandler}>
        {windowDimenion > 768 ? t('createBoard') : '+'}
      </button>
      <AccountMenu />
      <CreateBoardModal />
    </div>
  );
};
