import { MongoClient } from "mongodb";
const singleCard = ({ cardDetailList }) => {
  return <div>{cardDetailList.category}</div>;
};

export default singleCard;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://kasunkavinda:kasunkavinda456123@cluster0.oxj4i.mongodb.net/myPortfolio?retryWrites=true&w=majority"
  );

  const db = client.db();
  const cardCollection = db.collection("CardCollection");
  const cardDetails = await cardCollection.find({}, { _id: 1 }).toArray();
  console.log(cardDetails.name);
  client.close();
  return {
    fallback: true,
    paths: cardDetails.map((cardDetail) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const client = await MongoClient.connect(
    "mongodb+srv://kasunkavinda:kasunkavinda456123@cluster0.oxj4i.mongodb.net/myPortfolio?retryWrites=true&w=majority"
  );

  const db = client.db();
  const cardCollection = db.collection("CardCollection");
  const selectedMeetup = await cardCollection.findOne({ _id: id });
  console.log(cardDetails.name);
  client.close();
  return {
    props: {
      cardDetailList: {
        category: "kasun",
        title: "title2",
        description: "description2",
        id: 5,
      },
    },
    revalidate: 1,
  };
}
