import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import maryPic from '../../assets/images/svg/mary-logo.svg';
import { useTranslation } from 'react-i18next';

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

export const DevCardMary = () => {
  const [expanded, setExpanded] = React.useState(false);
  const { t } = useTranslation();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: 'transparent',
        border: 'none',
        backgroundImage: 'none',
        padding: '5px',
      }}
    >
      <CardMedia component="img" image={maryPic} alt="dev avatar" sx={{ zIndex: '100' }} />
      <CardActions
        disableSpacing
        onClick={handleExpandClick}
        sx={{
          width: '70%',
          marginTop: '-20px',
          backgroundColor: '#009688',
          marginLeft: '55px',
          marginRight: '5px',
          objectFit: 'none',
          cursor: 'pointer',
        }}
      >
        <Typography sx={{ color: 'white' }}>{t('mariia')}</Typography>
        <ExpandMore expand={+expanded} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon sx={{ color: 'white' }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            width: '70%',
            marginLeft: '55px',
            marginRight: '5px',
            boxShadow: '0px 5px 10px 2px rgb(34 60 80 / 20%)',
          }}
        >
          <Typography paragraph>{t('developed')}</Typography>
          <ul>
            <li>{t('welcomePage')}</li>
            <li>{t('authorization')}</li>
            <li>{t('localization')}</li>
            <li>{t('confirmModal')}</li>
          </ul>
        </CardContent>
      </Collapse>
    </Card>
  );
};
