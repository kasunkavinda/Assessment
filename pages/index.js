import { MongoClient } from "mongodb";
import Link from "next/link";
import classes from "./FrontCard.module.css";
import Drawer from "../components/drawer/Drawer";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  FavoriteIcon,
  ExpandMoreIcon,
  Grid,
} from "@material-ui/core";

const database_url = process.env.DATABASE_URL;

export default function Home({ cardDetailLists }) {
  return (
    <div className={classes.outline}>
      <Drawer />
      <Grid container spacing={3}>
        {cardDetailLists.map((cardDetailList) => (
          <Grid item xs={12} sm={4} key={cardDetailList.id}>
            <Card className={classes.root}>
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
}

export async function getStaticProps() {
  const client = await MongoClient.connect(database_url);

  const db = client.db();
  const cardCollection = db.collection("CardCollection");
  const cardDetails = await cardCollection.find().toArray();
  console.log(cardDetails.name);
  client.close();
  return {
    props: {
      cardDetailLists: cardDetails.map((cardDetail) => ({
        category: cardDetail.category,
        title: cardDetail.title,
        description: cardDetail.description,
        id: cardDetail._id.toString(),
      })),
    },
    // props: { cardDetailLists: DUMMY_MEETUP },
    revalidate: 1000,
  };
}
