import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{`Welcome to ${props.meetups.title}`}</title>
        <meta name="A single meetup" description={props.meetups.description} />
      </Head>
      <MeetupDetail
        title={props.meetups.title}
        image={props.meetups.image}
        address={props.meetups.address}
        description={props.meetups.description}
        id={props.meetups.id}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  // connect mongodb via MongoClient to store data on DB
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const meetupCollection = db.collection("meetups");

  // find array of all the objects from DB
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data from API
  console.log(process.env.MONGODB_URI);

  const meetupId = context.params.meetupId;

  // connect mongodb via MongoClient to store data on DB
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const meetupCollection = db.collection("meetups");

  // find object from DB
  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  return {
    props: {
      meetups: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
