import React from 'react';
import EventItem from './event-item';
import classes from './event-list.module.css';

function EventList(props) {
  const { item } = props;
  return (
    <ul className={classes.list}>
      {item.map((event) => (
        <EventItem key={event.id} {...event} />
      ))}
    </ul>
  );
}

export default EventList;
