import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

export async function getStaticProps() {
  // fetch data from API (preferrably, we just execute the mongodb query here )

  // connect to the mongodb via MongoClient

  const client = await MongoClient.connect(
    "mongodb+srv://joe:YmvB1ytGykhuFmM2@cluster0.lsur2ve.mongodb.net/meetup?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const resultMeetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: resultMeetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
