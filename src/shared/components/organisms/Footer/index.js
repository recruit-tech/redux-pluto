import React from "react";
import { format } from "date-fns";
import { createLocal } from "shared/components/utils/localnames";
import Counter from "shared/components/organisms/Counter";
import styles from "./styles.scss";

const { localNames: local } = createLocal(styles);

export default function Footer(props) {
  const today = format(new Date(), "YYYY/MM/DD");

  return (
    <footer className={local("root")}>
      <div>
        <Counter />
        <div className={local("today")}>{today}</div>
      </div>
    </footer>
  );
}
