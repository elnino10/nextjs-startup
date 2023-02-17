import { useRouter } from "next/router";
import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";

function MeetupItem(props) {
  const router = useRouter();
  const { id, image, title, address } = props;

  function meetupDetailsHandler() {
    router.push(`/${id}`);
    console.log(image);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={meetupDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
