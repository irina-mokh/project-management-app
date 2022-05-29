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

import ivanPic from '../../assets/images/svg/ivan-logo.svg';
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

export const DevCardIvan = () => {
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
        padding: '5px',
        backgroundImage: 'none',
      }}
    >
      <CardMedia
        component="img"
        image={ivanPic}
        alt="Dev avatar"
        sx={{ zIndex: '100', objectFit: 'contain' }}
      />
      <CardActions
        disableSpacing
        sx={{
          width: '100%',
          marginTop: '0px',
          backgroundColor: '#009688',
        }}
      >
        <Typography sx={{ color: 'white' }}>{t('ivan')}</Typography>
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
            width: '100%',
            boxShadow: '0px 5px 10px 2px rgb(34 60 80 / 20%)',
          }}
        >
          <Typography paragraph>{t('developed')}</Typography>
          <ul>
            <li>{t('backendTask')}</li>
            <li>{t('modals')}</li>
            <li>{t('codeReview')}</li>
          </ul>
        </CardContent>
      </Collapse>
    </Card>
  );
};
