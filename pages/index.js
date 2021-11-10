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

const DUMMY_MEETUP = [
  {
    category: "cat1",
    title: "title1",
    description: "description1",
    id: 5,
  },
];

export default function Home({ cardDetailLists }) {
  return (
    <div className={classes.outline}>
      <Drawer />
      <Grid item xs={12}>
        {cardDetailLists.map((cardDetailList) => (
          <Grid container spacing={3} key={cardDetailList.id}>
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/paella.jpg"
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
                  <a className="bg-green-400 p-2 text-white rounded">
                    Read More
                  </a>
                </Link>
              </Card>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://kasunkavinda:kasunkavinda456123@cluster0.oxj4i.mongodb.net/myPortfolio?retryWrites=true&w=majority"
  );

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
