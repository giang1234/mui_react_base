import {
  TableCell,
  TableContainer,
  styled,
  tableCellClasses,
} from '@mui/material';
const CustomizedTableContainer = styled(TableContainer)`
::-webkit-scrollbar {
  height: 8px;
};
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #c7c4c4;
};
::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,.4);
  border-radius: 10px;
}`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#e1e4e9',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export {
  CustomizedTableContainer,
  StyledTableCell
}