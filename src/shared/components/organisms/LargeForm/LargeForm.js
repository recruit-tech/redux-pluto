import React from "react";
import { propTypes as formPropTypes, Field, FieldArray } from "redux-form";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";
import { AutoSizer, List } from "react-virtualized";
import { createLocal } from "shared/components/utils/localnames";
import styles from "./styles.scss";

const { localNames: local } = createLocal(styles);

const Item = ({ input, index, meta: { dirty, error } }) => (
  <div className={local("row")}>
    <label htmlFor={input.name} className={local("label")}>
      メッセージ {index}
    </label>
    <input {...input} type="text" className={local("input")} />
    <span className={local("error")}>{dirty && error}</span>
  </div>
);

const Items = ({ fields }) => (
  <div className={local("list")}>
    <AutoSizer>
      {({ width, height }) => (
        <List
          width={width}
          height={height}
          rowHeight={40}
          style={{ overflowX: "auto", overflowY: "auto" }} // for Isomorphic
          rowCount={fields.length}
          rowRenderer={({ key, index, isScrolling, isVisible, style }) => (
            <div key={key} style={style}>
              <Field
                name={`${fields.name}[${index}].message`}
                index={index}
                component={Item}
              />
            </div>
          )}
        />
      )}
    </AutoSizer>
  </div>
);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    ...formPropTypes
  })
)(function LargeForm(props) {
  return (
    <div className={local("main")}>
      <form>
        <FieldArray name="items" component={Items} />
      </form>
    </div>
  );
});
