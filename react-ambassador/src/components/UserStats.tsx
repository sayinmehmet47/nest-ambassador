import React from 'react';
import { useGetStatsQuery } from '../services/products';

type Props = {};

const UserStats = (props: Props) => {
  const { data: stats, error, isLoading } = useGetStatsQuery({});

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Link</th>
          <th scope="col">Code</th>
          <th scope="col">Revenue</th>
        </tr>
      </thead>
      <tbody>
        {stats?.map((stat: any, index: any) => {
          return (
            <tr key={index}>
              <td>{index}</td>
              <td>{`http://localhost:8000${stat.code}`}</td>
              <td>{stat.code}</td>
              <td>{stat.revenue}</td>
            </tr>
          );
        })}
        {/* <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
      </tbody>
    </table>
  );
};

export default UserStats;
