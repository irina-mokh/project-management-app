import Typography from '@mui/material/Typography/Typography';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { langSlice } from 'store/lang/reducer';
import i18n from 'utils/translation/i18n';

export const LangSwitcher = () => {
  const { lang } = useSelector((state: RootState) => state.lang);
  const dispatch = useDispatch<AppDispatch>();
  const { toggleLang } = langSlice.actions;
  const { t } = useTranslation();

  const checkLang = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
    dispatch(toggleLang());
  };

  return (
    <div className="switchContainer">
      <Typography className="setOption" variant="h5">
        {t('language')}
      </Typography>
      <div className="switch">
        <input
          id="language-toggle"
          className="check-toggle check-toggle-round-flat"
          type="checkbox"
          checked={lang === 'en'}
          onChange={(event) => {
            checkLang(event);
          }}
        />
        <label htmlFor="language-toggle"></label>
        <span className="on">{t('ruSwitcher')}</span>
        <span className="off">{t('enSwitcher')}</span>
      </div>
    </div>
  );
};
