import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import { GitHub as GitHubIcon, LocationOn as LocationIcon, People as PeopleIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      transform: 'translateY(-5px)',
      transition: 'box-shadow 0.3s, transform 0.3s',
    },
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginTop: theme.spacing(1), 
  },
  detailsButton: {
    width: '100%', 
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&:focus': {
      outline: 'none',
    },
  },
  githubIcon: {
    position: 'absolute',
    top: theme.spacing(1), 
    right: theme.spacing(1), 
    cursor: 'pointer',
  },
  followersInfo: {
    marginTop: theme.spacing(1), 
  },
  boldName: {
    fontWeight: 'bold',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
}));

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const classes = useStyles();

  useEffect(() => {
    
    fetch('https://api.github.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false); 
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
     
      {loading ? (
        <div className={classes.loader}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <Grid container spacing={2}>
          {users.map(user => (
            <Grid item key={user.id} xs={12} sm={6} md={4}>
              <Paper elevation={3} className={classes.card}>
                <Card component={Link} to={`/user/${user.login}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <CardHeader
                    avatar={<Avatar alt={user.login} src={user.avatar_url} className={classes.avatar} />}
                    title={
                      <Typography variant="h6" className={`${classes.linkText} ${classes.boldName}`}>
                        {user.login}
                      </Typography>
                    }
                    subheader={
                      <Typography variant="subtitle2" className={classes.linkText} color="textSecondary" >
                        {user.name || user.login}
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" className={classes.linkText}>
                      <LocationIcon /> {user.location || 'Location not available'}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className={`${classes.linkText} ${classes.followersInfo}`}
                    >
                      <PeopleIcon /> Followers: {user.followers} | Following: {user.following}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      className={classes.detailsButton}
                      component={Link}
                      to={`/user/${user.login}`}
                      variant="contained"
                    >
                      View Details
                    </Button>
                  </CardActions>
                  <IconButton
                    className={classes.githubIcon}
                    component={Link}
                    to={`/user/${user.login}`}
                    aria-label="GitHub"
                  >
                    <GitHubIcon color="primary" />
                  </IconButton>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default UsersListPage;
