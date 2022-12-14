import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { Fragment, SyntheticEvent, useEffect, useState } from 'react';

import { useUpdateUserMutation } from '../../services/user';

export default function Profile() {
  const [first_name, setFirstName] = useState('s');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  // const { data, error, isLoading } = useGetUserQuery('');
  const [updateUser] = useUpdateUserMutation();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/auth/admin/user');
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
    })();
  }, []);

  const handleSubmitAccount = async (e: SyntheticEvent) => {
    e.preventDefault();
    const form = { first_name, last_name, email };
    updateUser(form)
      .unwrap()
      .then((result) => console.log(result));
  };

  return (
    <Fragment>
      <form action="submit" onSubmit={handleSubmitAccount}>
        <h3>Account Information</h3>
        <div className="mt-2">
          <TextField
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            multiline
            value={first_name}
          />
        </div>
        <div className="mt-2">
          <TextField
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
            multiline
            value={last_name}
          />
        </div>
        <div className="mt-2">
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            multiline
            value={email}
          />
        </div>

        <div className="mt-2">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
      <form action="submit" className="mt-5">
        <h3>Change Password</h3>
        <div className="mt-2">
          <TextField label="Password" multiline />
        </div>
        <div className="mt-2">
          <TextField label="Password Confirm" multiline />
        </div>

        <div className="mt-2">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Fragment>
  );
}
