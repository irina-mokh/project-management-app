import { useTitle } from 'hooks';
import { useTranslation } from 'react-i18next';
import { routes } from 'routes';
import './Page404.scss';
export const NotFound = () => {
  useTitle(routes.notFound.title);
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1 className="title404">{t('pageNotFound')}</h1>
      <div className="col-md-12">
        <div className="a-one animate"></div>
        <div className="a-two animate"></div>
        <div className="a-three animate"></div>
        <div className="a-four animate"></div>
        <div className="a-five animate"></div>
        <div className="a-six animate"></div>
        <div className="a-seven animate"></div>
        <div className="a-eight animate"></div>
        <div className="a-nine animate"></div>
        <div className="a-ten animate"></div>
      </div>
    </div>
  );
};
