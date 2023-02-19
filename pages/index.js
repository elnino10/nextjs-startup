import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

export async function getStaticProps() {
  // fetch data from API (preferrably, we just execute the mongodb query here )

  // connect mongodb via MongoClient to store data on DB
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  
  // find the array of all the data in collection
  const resultMeetups = await meetupCollection.find().toArray();
 
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
