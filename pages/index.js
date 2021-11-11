import { MongoClient } from "mongodb";
import React from "react";
import Link from "next/link";
import classes from "../styles/homePage.module.css";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Drawer from "../components/drawer/Drawer";
import Favorites from "../components/favorites/Favorites";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
// import FavoriteIcon from "@material-ui/icons/Favorite";

const database_url = process.env.DATABASE_URL;

// dropdown values
const categories = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "Community",
    label: "Community",
  },
  {
    value: "Professional",
    label: "Professional",
  },
  {
    value: "Housing",
    label: "Housing",
  },
  {
    value: "Buying",
    label: "Buying",
  },
  {
    value: "Selling",
    label: "Selling",
  },
  {
    value: "Jobs",
    label: "Jobs",
  },
  {
    value: "Education",
    label: "Education",
  },
  {
    value: "Commercial",
    label: "Commercial",
  },
];

export default function Home({ cardDetailLists }) {
  const [fav, setFav] = React.useState(cardDetailLists.favorite);
  const [category, setCategory] = React.useState(categories[0].value);
  const [filteredList, setFilterList] = React.useState(cardDetailLists);

  function handleCategory(event) {
    setCategory(event.target.value);
    if (event.target.value === "All") {
      setFilterList(cardDetailLists);
    } else {
      setFilterList((oldState) => {
        return oldState.filter((card) => card.category === event.target.value);
      });
    }
  }

  return (
    <div className={classes.outline}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={2}>
          <form>
            <div className={classes.DrawerTextField}>
              <TextField
                id="category"
                select
                label="Category"
                value={category}
                onChange={handleCategory}
                variant="filled"
                // inputRef={categotyInputref}
                className={classes.DropTextField}
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </form>
        </Grid>
        <Grid item xs={12} sm={10} className={classes.drawerWrapper}>
          <Drawer />
        </Grid>
      </Grid>
      {/* {fav && <Favorites />} */}

      <Grid container spacing={3}>
        {filteredList.map((cardDetailList) => {
          return (
            <Grid item xs={12} sm={4} key={cardDetailList.id}>
              <Card className={classes.root}>
                <div
                  onClick={() => {
                    setFav(!fav);
                  }}
                >
                  {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </div>

                <CardMedia
                  className={classes.media}
                  image="/card.jpg"
                  title="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {cardDetailList.category}
                  </Typography>
                </CardContent>
                <CardHeader title={cardDetailList.title} />

                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {cardDetailList.description}
                  </Typography>
                </CardContent>
                <Link href={`/single-card/${cardDetailList.id}`}>
                  <a className={classes.readMore}>Read More</a>
                </Link>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export async function getStaticProps() {
  //connecting
  const client = await MongoClient.connect(database_url);

  const db = client.db();
  const cardCollection = db.collection("CardCollection");
  const cardDetails = await cardCollection.find().toArray();

  //closing connection
  client.close();
  return {
    props: {
      cardDetailLists: cardDetails.map((cardDetail) => ({
        title: cardDetail.title,
        category: cardDetail.category,
        description: cardDetail.description,
        favorite: cardDetail.favorite,
        id: cardDetail._id.toString(),
      })),
    },

    revalidate: 10,
  };
}
