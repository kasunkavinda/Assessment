import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import classes from "./Navigation.module.css";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Navigation = () => {
  return (
    <div className={classes.navwrapper}>
      <AppBar position="static">
        <Toolbar className={classes.backgroundColor}>
          <Grid item xs={10}>
            <Typography variant="h6" className={classes.title}>
              Classfied Ads
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Link href="/">
              <a>
                <Typography variant="h6" className={classes.home}>
                  HOME
                </Typography>
              </a>
            </Link>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6" className={classes.favorites}>
              FAVORITES
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
