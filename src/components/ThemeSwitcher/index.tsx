import sunIcon from '../../assets/images/svg/sun-svg.svg';
import moonIcon from '../../assets/images/svg/moon-svg.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from 'store/theme/selectors';
import { AppDispatch } from 'store';
import { toggleMode } from 'store/theme/reducer';
import Typography from '@mui/material/Typography/Typography';
import { useTranslation } from 'react-i18next';

export const ThemeSwitcher1 = () => {
  const themeMode = useSelector(selectTheme);
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className="switchContainer">
      <Typography className="setOption" variant="h5">
        {t('theme')}
      </Typography>
      <div className="switchMode">
        <input
          id="mode-toggle"
          className="check-toggle check-toggle-round-flat"
          type="checkbox"
          checked={themeMode === 'dark'}
          onChange={() => {
            dispatch(toggleMode());
          }}
        />
        <label htmlFor="mode-toggle"></label>
        <span className="light">
          <img src={sunIcon} />
        </span>
        <span className="dark">
          <img src={moonIcon} />
        </span>
      </div>
    </div>
  );
};
