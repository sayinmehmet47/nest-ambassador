import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { User } from '../../models/user';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [perPage] = useState(10);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/user/admin/ambassadors');
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHead>
      {users.slice(page * perPage, (page + 1) * perPage).map((user) => (
        <TableBody key={user.id}>
          <TableRow>
            <TableCell>{user.first_name}</TableCell>
            <TableCell>{user.last_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <NavLink to={`/admin/users/${user.id}/links`}>
                <Button variant="contained" color="primary">
                  View
                </Button>
              </NavLink>
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
      <TableFooter>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={perPage}
          rowsPerPageOptions={[]}
        />
      </TableFooter>
    </Table>
  );
}
