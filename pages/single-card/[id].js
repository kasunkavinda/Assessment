import Link from "next/link";
import { MongoClient, ObjectId } from "mongodb";
import classes from "../../styles/singleCard.module.css";
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

const singleCard = ({ cardDetailLists }) => {
  return (
    <div>
      <Grid item xs={12} className={classes.singleCardWrapper}>
        <Link href="/">
          <a className={classes.goBack}>Go Back</a>
        </Link>
        <Grid
          container
          className={classes.singleInsiCardWrap}
          key={cardDetailLists.id}
        >
          <Grid item xs={12}>
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image="/card.jpg"
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {cardDetailLists.category}
                </Typography>
              </CardContent>
              <CardHeader title={cardDetailLists.title} />

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {cardDetailLists.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default singleCard;

export async function getStaticPaths() {
  const client = await MongoClient.connect(database_url);

  const db = client.db();
  const cardCollection = db.collection("CardCollection");
  const cardDetails = await cardCollection.find({}, { _id: 1 }).toArray();
  console.log(cardDetails.name);
  client.close();
  return {
    fallback: true,
    paths: cardDetails.map((cardDetail) => ({
      params: { id: cardDetail._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const client = await MongoClient.connect(database_url);

  const db = client.db();
  const cardCollection = db.collection("CardCollection");
  const selectedCard = await cardCollection.findOne({ _id: ObjectId(id) });

  client.close();
  return {
    props: {
      cardDetailLists: {
        id: selectedCard._id.toString(),
        category: selectedCard.category,
        title: selectedCard.title,
        description: selectedCard.description,
      },
    },
    revalidate: 1,
  };
}
