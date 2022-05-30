import { useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from '@mui/material/Typography/Typography';
// import { ReactComponent as GithubIcon } from '../../assets/images/svg/github-icon.svg';
import { ReactComponent as RSIcon } from '../../assets/images/svg/rs-icon.svg';

export const Footer = () => {
  const { palette } = useTheme();
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: palette.background.paper,
      }}
    >
      <nav className="footer_nav">
        <Typography component="h5">2022</Typography>
        <ul className="team">
          <li className="member">
            <a
              href="https://github.com/irina-mokh"
              target="_blank"
              rel="noreferrer"
              className="nav_link"
            >
              <Typography variant="body2">Irina</Typography>
              <GitHubIcon style={{ height: '3vh' }} />
            </a>
          </li>
          <li className="member">
            <a
              href="https://github.com/karlsonru"
              target="_blank"
              rel="noreferrer"
              className="nav_link"
            >
              <Typography variant="body2">Ivan</Typography>
              <GitHubIcon style={{ height: '3vh' }} />
            </a>
          </li>
          <li className="member">
            <a
              href="https://github.com/bachicada"
              target="_blank"
              rel="noreferrer"
              className="nav_link"
            >
              <Typography variant="body2">Mariia</Typography>
              <GitHubIcon style={{ height: '3vh' }} />
            </a>
          </li>
        </ul>
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer" className="nav_link">
          <RSIcon style={{ height: '3vh' }} />
        </a>
      </nav>
    </footer>
  );
};
