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
import { ToggleButtonGroup } from '@material-ui/lab';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Product } from '../../../models/product';

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [perPage] = useState(8);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('admin/products');
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    const { status } = await axios.delete(`admin/products/${id}`);
    console.log(status);
    if (status === 200) {
      const filteredProducts = products.filter((p) => p.id !== id);
      setProducts(filteredProducts);
    }
  };

  return (
    <Fragment>
      <NavLink to="/product/create">
        <div className="mt-2">
          <Button variant="contained" color="primary">
            ADD
          </Button>
        </div>
      </NavLink>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>title</TableCell>
            <TableCell>description</TableCell>
            <TableCell>price</TableCell>
            <TableCell>image</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.slice(page * perPage, (page + 1) * perPage).map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>

              <TableCell>
                <img src={product.image} width={80} height={80} alt="Paella dish" />
              </TableCell>
              <TableCell>
                <ToggleButtonGroup>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                  <NavLink to={`/product/${product.id}/update`}>
                    <Button variant="contained" color="primary">
                      Update
                    </Button>
                  </NavLink>
                </ToggleButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TablePagination
            page={page}
            onPageChange={(e, page) => setPage(page)}
            rowsPerPage={perPage}
            count={products.length}
            rowsPerPageOptions={[]}
          />
        </TableFooter>
      </Table>
    </Fragment>
  );
}
