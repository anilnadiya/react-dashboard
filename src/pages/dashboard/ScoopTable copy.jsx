import PropTypes from 'prop-types';
// material-ui
import Stack from '@mui/material/Stack';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination,
  Link,
} from '@mui/material';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';


// Fetch data function
const fetchData = async ({ page, limit }) => {
  //const response = await fetch('http://localhost:5000/scoopitem');
  const response = await fetch(`http://localhost:5000/scoopitem?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

function createData(itemId, item_name, item_email_subject, total_amount) {
  return { itemId, item_name, item_email_subject, total_amount };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'itemId',
    align: 'left',
    disablePadding: false,
    label: 'Id'
  },
  {
    id: 'item_name',
    align: 'left',
    disablePadding: true,
    label: 'Product Name'
  },
  {
    id: 'item_email_subject',
    align: 'right',
    disablePadding: false,
    label: 'Sub'
  },
  // {
  //   id: 'carbs',
  //   align: 'left',
  //   disablePadding: false,

  //   label: 'Status'
  // },
  {
    id: 'total_amount',
    align: 'right',
    disablePadding: false,
    label: 'Total Amount'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function ScoopTableHead({ order, orderBy }) {

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function ScoopTable() {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchterm] = useState('')

  const handleSearchChange = () =>{
    
  }

  const { data, isLoading, error } = useQuery(
    {
      queryKey:['scoopItem', page, limit],
      queryFn: () => fetchData({ page, limit }), 
      keepPreviousData: true
    }
  );

console.log('data=========>', data)

if (isLoading) return <div > Loading... {isLoading} </div>
if (error) return <div>Error: {error.message}</div>;

const rows = data.data.map((item) => createData(item.itemId, item.item_name, item.item_email_subject, item.total_amount))


const order = 'asc';
const orderBy = 'itemId';

return (
  <Box>
    {/* Search Input */}
    <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />

    <TableContainer
      sx={{
        width: '100%',
        overflowX: 'auto',
        position: 'relative',
        display: 'block',
        maxWidth: '100%',
        '& td, & th': { whiteSpace: 'nowrap' }
      }}
    >
      <Table aria-labelledby="tableTitle">
        <ScoopTableHead order={order} orderBy={orderBy} />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                role="checkbox"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                tabIndex={-1}
                key={row.itemId}
              >
                <TableCell component="th" id={labelId} scope="row">
                  <Link color="secondary"> {row.itemId}</Link>
                </TableCell>
                <TableCell>{row.item_name}</TableCell>
                <TableCell align="right">{row.item_email_subject}</TableCell>
                {/* <TableCell>
                    <OrderStatus status={row.carbs} />
                  </TableCell> */}
                <TableCell align="right">
                  <NumericFormat value={row.total_amount} displayType="text" thousandSeparator prefix="$" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>

      </Table>
    </TableContainer>
    <Pagination
      count={Math.ceil(data.totalItem / limit)}
      page={page + 1}
      onChange={(_, newPage) => setPage(newPage - 1)} color='primary' 
      sx={{ marginTop: 2 }}

      />
  </Box>
);
}

ScoopTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

//OrderStatus.propTypes = { status: PropTypes.number };
