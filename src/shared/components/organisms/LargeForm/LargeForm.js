/* @flow */
import React from "react";
import styled from "styled-components";
import { propTypes as formPropTypes, Field, FieldArray } from "redux-form";
import { compose, onlyUpdateForPropTypes, setPropTypes } from "recompose";
import { AutoSizer, List } from "react-virtualized";

const Item = ({ input, index, meta: { dirty, error } }) => (
  <Row>
    <Label htmlFor={input.name}>
      メッセージ {index}
      <Input {...input} id={input.name} type="text" />
    </Label>
    <Error>{dirty && error}</Error>
  </Row>
);

const Items = ({ fields }) => (
  <ListContainer>
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
                component={(Item: $FIXME)}
              />
            </div>
          )}
        />
      )}
    </AutoSizer>
  </ListContainer>
);

export default compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    ...formPropTypes,
  }),
)(function LargeForm(props) {
  return (
    <Main>
      <form>
        <FieldArray name="items" component={(Items: $FIXME)} />
      </form>
    </Main>
  );
});

const Main = styled.div``;

const ListContainer = styled.div`
  height: 800px;
`;

const Row = styled.div`
  display: flex;
  height: 40px;
`;

const Label = styled.label`
  flex: 1;
  text-align: right;
`;

const Input = styled.input`
  width: 600px;
`;

const Error = styled.span`
  flex: 1;
  text-align: left;
`;
