import { setPageTitle } from 'utils/setPageTitle';
import { BoardList } from 'components/BoardList';
import { Container, TextField } from '@mui/material';

export const Main = () => {
  setPageTitle();
  return (
    <>
      <h2>Main page</h2>
      <Container>
        {/* move Search to separate component */}
        <TextField
          type="search"
          variant="outlined"
          label="Search"
          size="medium"
          // здесть стили не подтягиваются
          sx={{ color: 'inherit', borderColor: 'palette.primary.light', mb: 1 }}
        />
        <BoardList></BoardList>
      </Container>
    </>
  );
};
