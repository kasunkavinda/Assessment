import React from "react";
import Link from "next/link";
import Drawer from "../drawer/Drawer";
import classes from "../../styles/homePage.module.css";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Favorites = () => {
  const [fav, setFav] = React.useState(false);
  return (
    <div className={classes.outline}>
      <Drawer />
      {fav && <Favorites />}

      <Grid container spacing={3}>
        {cardDetailLists.map((cardDetailList) => (
          <Grid item xs={12} sm={4} key={cardDetailList.id}>
            <Card className={classes.root}>
              {fav && (
                <IconButton
                  onClick={() => {
                    setFav(!fav);
                  }}
                  aria-label="delete"
                  color="primary"
                >
                  <FavoriteIcon></FavoriteIcon>
                </IconButton>
              )}
              {!fav && (
                <IconButton
                  onClick={() => {
                    setFav(!fav);
                  }}
                  aria-label="delete"
                  color="secondary"
                >
                  <FavoriteIcon></FavoriteIcon>
                </IconButton>
              )}
              <CardMedia
                className={classes.media}
                image="/card.jpg"
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {cardDetailList.category}
                </Typography>
              </CardContent>
              <CardHeader title={cardDetailList.title} />

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {cardDetailList.description}
                </Typography>
              </CardContent>
              <Link href={`/single-card/${cardDetailList.id}`}>
                <a className={classes.readMore}>Read More</a>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Favorites;
