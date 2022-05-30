import sunIcon from '../../assets/images/svg/sun-svg.svg';
import moonIcon from '../../assets/images/svg/moon-svg.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from 'store/theme/selectors';
import { AppDispatch } from 'store';
import { toggleMode } from 'store/theme/reducer';

export const ThemeSwitcher1 = () => {
  const themeMode = useSelector(selectTheme);
  const dispatch: AppDispatch = useDispatch();
  return (
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
  );
};
