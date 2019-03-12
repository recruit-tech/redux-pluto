import React, { memo, useCallback } from "react";
import styled from "styled-components";
import Overlay from "../../atoms/Overlay";

export type Props = {
  alert: {
    message: string;
  };
};

export type Handlers = {
  onClose: (e: React.MouseEvent<HTMLElement>) => any;
};

export default memo(function Alert(props: Props & Handlers) {
  const {
    alert: { message },
    onClose,
  } = props;

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => e.stopPropagation(),
    [],
  );

  if (!message) {
    return null;
  }

  return (
    <Root>
      <Overlay onClick={onClose}>
        <ObiOuter>
          <ObiInner onClick={onClick}>
            <DisplayArea>
              <MessageArea>
                <span>{message}</span>
              </MessageArea>
              <ButtonArea>
                <button type="button" onClick={onClose}>
                  閉じる
                </button>
              </ButtonArea>
            </DisplayArea>
          </ObiInner>
        </ObiOuter>
      </Overlay>
    </Root>
  );
});

const Root = styled.div``;

const ObiOuter = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 200px;
`;

const ObiInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
`;

const DisplayArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  height: 50px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

const MessageArea = styled.div`
  text-align: center;
`;

const ButtonArea = styled.div`
  text-align: center;
`;
