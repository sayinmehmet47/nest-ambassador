import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableHead,
  Typography,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Order } from '../../models/orders';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/admin/orders');
      setOrders(data);
    })();
  }, []);

  return (
    <div>
      {orders.map((order) => {
        return (
          <Accordion key={order.id}>
            <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
              <Typography>
                {order.name}-{order.total}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>product_title</TableCell>
                    <TableCell>price</TableCell>
                    <TableCell>quantity</TableCell>
                    <TableCell>admin_revenue</TableCell>
                    <TableCell>ambassador_revenue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.order_items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.product_title}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.admin_revenue}</TableCell>
                      <TableCell>{item.ambassador_revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
