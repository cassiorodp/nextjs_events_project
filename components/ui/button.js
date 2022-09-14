import Link from 'next/link';
import React from 'react';
import classes from './button.module.css';

function Button(props) {
  return (
    <Link href={props.link}>
      <a className={classes.btn}>{props.children}</a>
    </Link>
  );
}

export default Button;
