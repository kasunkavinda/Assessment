import { MongoClient } from "mongodb";
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

export default function Home({ cardDetailList }) {
  return (
    <div className={classes.outline}>
      <Drawer />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image="/static/images/cards/paella.jpg"
              title="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Housing{cardDetailList.category}
              </Typography>
            </CardContent>
            <CardHeader title="Shrimp and Chorizo Paella" />
            {cardDetailList.category}
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
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
    /*props: {
      cardDetailList: cardDetails.map((cardDetail) => ({
        category: cardDetail.category,
        title: cardDetail.title,
        description: cardDetail.description,
        id: cardDetail._id.toString(),
      })),
    }, */
    props: { cardDetailList: DUMMY_MEETUP },
    revalidate: 1000,
  };
}
