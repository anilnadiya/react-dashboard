import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import { useQuery } from '@tanstack/react-query';

// Fetch data function
const fetchData = async () => {
  const response = await fetch('http://localhost:5000/users');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

function createData(iUserId, vFirstName, vEmailAddress, dtCreationDate) {
  return { iUserId, vFirstName, vEmailAddress, dtCreationDate };
}

const headCells = [
  {
    id: 'iUserId',
    align: 'left',
    disablePadding: false,
    label: '#',
  },
  {
    id: 'vFirstName',
    align: 'left',
    disablePadding: true,
    label: 'Full Name',
  },
  {
    id: 'vEmailAddress',
    align: 'right',
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'dtCreationDate',
    align: 'right',
    disablePadding: false,
    label: 'Created Date',
  }
];

function OrderTableHead({ order, orderBy }) {
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

export default function OrderTable() {
  const order = 'asc';
  const orderBy = 'iUserId';

  // Fetch data using react-query
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const rows = data.map((user) =>
    createData(user.iUserId, user.vFirstName, user.vEmailAddress, user.dtCreationDate)
  );

  return (
    <Box>
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
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {rows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.iUserId}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    <Link color="secondary"> {row.iUserId}</Link>
                  </TableCell>
                  <TableCell>{row.vFirstName}</TableCell>
                  <TableCell align="center">{row.vEmailAddress}</TableCell>
                  <TableCell >{row.dtCreationDate}</TableCell>
                  
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.any,
  orderBy: PropTypes.string,
};

OrderStatus.propTypes = {
  status: PropTypes.number,
};
