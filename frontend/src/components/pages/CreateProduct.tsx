import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { FormEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';

type Props = {};

export default function CreateProduct({}: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const inputs = {
      title,
      description,
      image,
      price,
    };
    const response = await axios.post('/admin/products', inputs);
    console.log(response.status);
    if (response.status === 201 || response.status === 200) {
      navigate('/products');
    }
  };

  return (
    <Layout>
      <form action="submit" onSubmit={handleSubmit}>
        <div className="mt-2">
          <TextField label="Title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mt-2">
          <TextField
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <TextField label="Image" onChange={(e) => setImage(e.target.value)} />
        </div>
        <div className="mt-2">
          <TextField
            label="Price"
            type="number"
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
