import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { CustomizedTableContainer, StyledTableCell } from './style';

type Order = 'asc' | 'desc';

interface HeaderTable {
  field: string;
  sort?: boolean;
  type: 'custom' | 'date' | 'image' | 'badge';
  renderCell?: any;
  headerName: string;
  width?: string;
  height?: string;
  numeric?: string;
  disablePadding?: boolean;
  backgroundColor?: string;
  color?: string;
  alt?: string;
}

interface propsTableCustom {
  dataTable: any[];
  header: HeaderTable[];
  idKey: string;
  selected?: any[];
  setSelected?: any;
  disableSelect?: boolean;
  styleRow?: any;
  t?: any;
  sx?: any;
}

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  header: any;
  order: Order;
  orderBy: string;
  rowCount: number;
  disableSelect?: boolean;
  selected?: any;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el: any, index: any): any => [el, index] as [T, number]);
  stabilizedThis.sort((a: any, b: any): any => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any[]): any => el[0]);
}

function TableHeadRender(props: EnhancedTableProps): JSX.Element {
  const { onSelectAllClick, order, orderBy, rowCount, onRequestSort, header, disableSelect, selected = [] } = props;
  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {!disableSelect && <StyledTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={selected > 0 && selected < rowCount}
            checked={rowCount > 0 && selected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </StyledTableCell>}
        {header.map((headCell: any, index: number): JSX.Element => (
          <StyledTableCell
            sx={{
              width: headCell.width || 'auto',
              height: headCell.height || 'auto'
            }}
            key={index}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.field ? order : false}
          >
            {headCell.sort ? <TableSortLabel // If is sort
              active={orderBy === headCell.field}
              direction={orderBy === headCell.field ? order : 'asc'}
              onClick={createSortHandler(headCell.field)}
            >
              {headCell.headerName}
              {orderBy === headCell.field ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
              : headCell.headerName
            }
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const TableBodyRender = (header: any, row: any): any => {
  const type = header.type;
  const data = row[header.field];
  switch (type) {
    case "date":
      return format(new Date(data), header.format)
    case "image":
      return <img src={data} width="70" alt={header.alt || "Image table"}/>
    case "custom":
      return header.renderCell(row)
    default:
      return data
  }
}

function TableCustom(props: propsTableCustom) {
  const { dataTable, header, idKey, selected = [], setSelected, disableSelect, styleRow, ...propsData } = props;
  const { t } = useTranslation();
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<any>(idKey);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>): any => {
    if (event.target.checked) {
      const newSelecteds = dataTable.map((n) => n[idKey]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string): any => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (name: string): any => selected.indexOf(name) !== -1;
  const dataSort = stableSort( // Sort by
    dataTable,
    getComparator(order, orderBy)
  );

  return (
    <Box sx={{ borderRadius: "6px" }}>
      <Paper>
        <CustomizedTableContainer id="tableContent">
          <Table
            stickyHeader
            aria-labelledby="tableTitle"
            size='small'
            {...propsData}
          >
            <TableHeadRender
              selected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              header={header}
              rowCount={dataTable.length}
              disableSelect={disableSelect}
            />
            <TableBody>
              {
                dataSort.map((row: any, index: number): JSX.Element => {
                  const isItemSelected = isSelected(row[idKey]);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`rowTable${index}`}
                      selected={isItemSelected}
                      sx={styleRow ? (): any => styleRow(row) : null}
                    >
                      {
                        !disableSelect && <StyledTableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onChange={(event: any) => handleClick(event, row[idKey])}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </StyledTableCell>
                      }

                      {
                        header.map((value: any, index: number): JSX.Element => {
                          const styled: any = {color: value.color, backgroundColor: value.backgroundColor};
                          return <StyledTableCell key={index} sx={styled}>
                            {TableBodyRender(value, row)}
                          </StyledTableCell>
                        })
                      }
                    </TableRow>
                  );
                })
              }

              {
                dataSort?.length === 0 && <TableRow key={"noData"}>
                  <StyledTableCell colSpan={5}>
                    <Box>{t('common.noData')}</Box>
                  </StyledTableCell>
                </TableRow>
              }

              {
                selected.length ?
                  <TableRow key={"selectedRow"}>
                    <StyledTableCell colSpan={5}>
                      <Box>Selected rows: {selected.length}</Box>
                    </StyledTableCell>
                  </TableRow>
                : undefined
              }
            </TableBody>
          </Table>
        </CustomizedTableContainer>
      </Paper>
    </Box>
  );
}

export default TableCustom;
