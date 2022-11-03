import Todo from "containers/Todo";

import React from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Todo />
    </div>
  );
}
