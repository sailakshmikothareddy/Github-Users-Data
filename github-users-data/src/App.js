
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

import UsersListPage from './components/UsersListPage';
import UserDetailsPage from './components/UserDetailsPage';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4), 
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">GitHub Users Data</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Routes>
        <Route path="/" element={<UsersListPage />} />
          <Route path="/user/:username" element={<UserDetailsPage />} />

        </Routes>
      </Container>
    </Router>
  );
};

export default App;
