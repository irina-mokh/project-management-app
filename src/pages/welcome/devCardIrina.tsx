import * as React from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import iraPic from '../../assets/images/svg/ira-logo.svg';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { getDesignTokens } from 'theme';
import { useSelector } from 'react-redux';
import { selectTheme } from 'store/theme/selectors';

interface ExpandMoreProps extends IconButtonProps {
  expand: number | undefined;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const DevCardIrina = () => {
  const [expanded, setExpanded] = React.useState(false);
  const { t } = useTranslation();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const mode = useSelector(selectTheme);
  const theme = createTheme(getDesignTokens(mode));

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          maxWidth: 345,
          backgroundColor: 'transparent',
          border: 'none',
          backgroundImage: 'none',
        }}
      >
        <CardMedia component="img" image={iraPic} alt="Dev avatar" sx={{ zIndex: '100' }} />
        <CardActions
          disableSpacing
          sx={{
            width: '70%',
            marginTop: '-20px',
            backgroundColor: '#009688',
            marginRight: '5px',
            objectFit: 'none',
            marginLeft: '45px',
          }}
        >
          <Typography sx={{ color: 'white' }}>{t('irina')}</Typography>
          <ExpandMore
            expand={+expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon sx={{ color: 'white' }} />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent
            sx={{
              width: '70%',
              marginLeft: '45px',
              boxShadow: '0px 5px 10px 2px rgb(34 60 80 / 20%)',
            }}
          >
            <Typography paragraph>{t('developed')}</Typography>
            <ul>
              <li>{t('boardsPage')}</li>
              <li>{t('tasks')}</li>
              <li>Drag&apos;n&apos;drop</li>
              <li>{t('tests')}</li>
            </ul>
          </CardContent>
        </Collapse>
      </Card>
    </ThemeProvider>
  );
};
