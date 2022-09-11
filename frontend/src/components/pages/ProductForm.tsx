import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Layout from '../Layout';

export default function ProductForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await axios.get('/admin/products/' + id);
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setImage(data.image);
      })();
    }
  }, [id]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const inputs = {
      title,
      description,
      image,
      price,
    };
    if (!id) {
      const response = await axios.post('/admin/products', inputs);
      console.log(response.status);
      if (response.status === 201 || response.status === 200) {
        navigate('/products');
      }
    } else {
      const response = await axios.put(`/admin/products/${id}`, inputs);
      if (response.status === 201 || response.status === 200) {
        navigate('/products');
      }
    }
  };

  return (
    <Layout>
      <form action="submit" onSubmit={handleSubmit}>
        <div className="mt-2">
          <TextField
            value={title}
            label="Title"
            multiline
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <TextField
            label="Description"
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <TextField
            value={image}
            multiline
            label="Image"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <TextField
            label="Price"
            type="number"
            multiline
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Layout>
  );
}
