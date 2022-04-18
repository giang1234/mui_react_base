import { memo, FC } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select } from '@mui/material';
interface PaginateProps {
  pageSize: number;
  total: number;
  onChange?: any;
  onChangePerpage?: any;
  perPage?: number[];
  pageIndex?: any;
}

const PaginateContainer: FC<PaginateProps> = memo(props => {
  const { pageSize, onChangePerpage, total, perPage, pageIndex, ...propsData } = props;
  const totalPage = Math.ceil(total / pageSize);
  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center'
      }}>
        {perPage && <Box>
          <FormControl sx={{ mr: 1, minWidth: 100 }}>
            <InputLabel id="demo-simple-select-label">Items per page</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              size="small"
              id="demo-simple-select"
              value={pageSize}
              label="Items per page"
              onChange={onChangePerpage}
            >
              { perPage.map((v: number): JSX.Element => <MenuItem key={v} value={v}>{v}</MenuItem>) }
            </Select>
          </FormControl>
        </Box>}

        <Box>
          <Pagination
            page={pageIndex}
            color="primary"
            count={totalPage || 0}
            variant="outlined"
            siblingCount={0}
            shape="rounded"
            {...propsData}
          />
        </Box>
      </Box>
    </>
  )
})

export default PaginateContainer;
