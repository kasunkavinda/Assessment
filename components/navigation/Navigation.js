import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import classes from "./Navigation.module.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuIcon,
  Typography,
  Button,
} from "@material-ui/core";

const Navigation = () => {
  return (
    <div className={classes.navwrapper}>
      <Grid container spacing={3}>
        <AppBar position="static">
          <Toolbar className={classes.backgroundColor}>
            <Grid item xs={10}>
              <Typography variant="h6" className={classes.title}>
                Classfied Ads
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h6" className={classes.home}>
                HOME
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h6" className={classes.favorites}>
                FAVORITES
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
};

export default Navigation;
