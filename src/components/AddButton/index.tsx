import { Card, Button } from '@mui/material';
import { AddCircleOutlineRounded } from '@mui/icons-material';

type IAddButton = {
  text: string;
  addHandler?: () => void;
  order?: number;
};

export const AddButton = (props: IAddButton) => {
  const order = props.order ? props.order : 'auto';

  return (
    <Card variant="outlined" sx={{ height: '50px', order: { order } }} onClick={props.addHandler}>
      <Button
        startIcon={<AddCircleOutlineRounded />}
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        {props.text}
      </Button>
    </Card>
  );
};
