import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Link } from '../../models/link';
import Layout from '../Layout';

export default function Links() {
  const [links, setLinks] = useState<Link[]>([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/admin/users/${id}/links`);
        setLinks(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Revenue</TableCell>
          </TableRow>
        </TableHead>
        {links.slice(page * perPage, (page + 1) * perPage).map((link) => (
          <TableBody key={link.id}>
            <TableRow>
              <TableCell>{link.code}</TableCell>
              <TableCell>{link.orders.length}</TableCell>
              <TableCell>
                {link.orders.reduce((s, o) => s + o.total, 0)}
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
        <TableFooter>
          <TablePagination
            component="div"
            count={links.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={perPage}
            rowsPerPageOptions={[]}
          />
        </TableFooter>
      </Table>
    </Layout>
  );
}
