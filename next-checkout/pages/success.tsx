import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../components/Layout';

const Success = () => {
  const router = useRouter();
  const { source } = router.query;

  useEffect(() => {
    if (source !== undefined) {
      (async () => {
        await axios.post(`http://localhost:8000/api/checkout/orders/confirm`, {
          source: source,
        });
      })();
    }
  }, [source]);

  return (
    <Layout>
      <div className="py-5 text-center">
        <h2>Success</h2>
        <p className="lead">Your purchase has been completed!</p>
      </div>
    </Layout>
  );
};

export default Success;
