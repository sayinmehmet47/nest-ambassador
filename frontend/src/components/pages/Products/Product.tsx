import {
  Button,
  CardMedia,
  ImageListItem,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Product } from '../../../models/product';
import Layout from '../../Layout';

type Props = {};

export default function ProductPage({}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(8);

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
    <Layout>
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
          {products
            .slice(page * perPage, (page + 1) * perPage)
            .map((product: Product) => (
              <TableRow>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>

                <TableCell>
                  <img
                    src={product.image}
                    width={80}
                    height={80}
                    alt="Paella dish"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
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
    </Layout>
  );
}
