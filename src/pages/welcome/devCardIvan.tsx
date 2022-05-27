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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
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
        alt="Paella dish"
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
        <Typography sx={{ color: 'white' }}>Ivan</Typography>
        <ExpandMore
          expand={expanded}
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
          <Typography paragraph>Developed:</Typography>
          <ul>
            <li>BackEnd: deploy and update </li>
            <li>Modals</li>
            <li>Code review, catching errors</li>
          </ul>
        </CardContent>
      </Collapse>
    </Card>
  );
};
