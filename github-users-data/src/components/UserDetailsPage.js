import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  Typography,
  makeStyles,
  Grid,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import {
  Twitter as TwitterIcon,
  MailOutline as MailIcon,
  Business as BusinessIcon,
  Link as LinkIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  ArrowBack as ArrowBackIcon,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4), 
  },
  container: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    textAlign: 'center',
    borderRadius: theme.spacing(1),
    background: '#f5f5f5',
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  info: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    margin: theme.spacing(2),
    color: theme.palette.primary.main,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: theme.spacing(1), 
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
}));

const UserDetailsPage = () => {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => {
        setUserDetails(data);
        setLoading(false); 
      })
      .catch(error => console.error('Error fetching user details:', error));
  }, [username]);

  if (loading) {
    return (
      <div className={classes.loader}>
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <div className={classes.root}>
    <Paper className={classes.container} elevation={3}>
      <Link to="/">
        <ArrowBackIcon className={classes.backButton} />
      </Link>
      <Avatar alt={userDetails.login} src={userDetails.avatar_url} className={classes.avatar} />
      <Typography variant="h4">{userDetails.name || 'Not Specified'}</Typography>
      <Typography variant="body1" className={classes.info}>
        {userDetails.bio }
      </Typography>
      <Typography variant="body1" className={classes.info}>
        <React.Fragment>
          <TwitterIcon className={classes.icon} /> Twitter: {userDetails.twitter_username || 'Not Specified'}
        </React.Fragment>
      </Typography>
      <Typography variant="body1" className={classes.info}>
        <React.Fragment>
          <MailIcon className={classes.icon} /> Email: {userDetails.email || 'Not Specified'}
        </React.Fragment>
      </Typography>
      <Typography variant="body1" className={classes.info}>
        <React.Fragment>
          <BusinessIcon className={classes.icon} /> Company: {userDetails.company || 'Not Specified'}
        </React.Fragment>
      </Typography>
      <Typography variant="body1" className={classes.info}>
        <React.Fragment>
          <LinkIcon className={classes.icon} /> Blog: <a href={userDetails.blog}>{userDetails.blog || 'Not Specified'}</a>
        </React.Fragment>
      </Typography>
      <Typography variant="body1" className={classes.info}>
        <PeopleIcon className={classes.icon} /> Followers: {userDetails.followers} | Following: {userDetails.following}
      </Typography>
      <Typography variant="body1" className={classes.info}>
        <AssignmentIcon className={classes.icon} /> Public Repositories: {userDetails.public_repos}
      </Typography>
      <Typography variant="body1" className={classes.info}>
        <EventIcon className={classes.icon} /> Joined Github: {new Date(userDetails.created_at).toLocaleDateString()}
      </Typography>
      <Typography variant="body1" className={classes.info}>
        <LocationIcon className={classes.icon} /> Location: {userDetails.location || 'Not specified'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component="a"
        href={userDetails.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.info}
      >
        Visit GitHub Profile
      </Button>
    </Paper>
    </div>
  );
};

export default UserDetailsPage;
