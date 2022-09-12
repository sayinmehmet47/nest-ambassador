import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import { User } from '../models/user';

import Menu from './Menu';
import Nav from './Nav';

type Props = {
  children: ReactNode;
};

export default function Layout(props: Props) {
  // const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  // const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/auth/admin/user');
        setUser(data);
      } catch (error) {
        // setRedirect(true);
      }
    };
    fetchUser();
  }, []);

  // if (redirect) {
  //   navigate('/login');
  // }

  return (
    <div>
      <Nav user={user} />
      <div className="container-fluid">
        <div className="row">
          <Menu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="table-responsive">{props.children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
