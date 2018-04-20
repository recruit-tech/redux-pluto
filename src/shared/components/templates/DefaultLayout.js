/* @flow */
import React, { type Node } from "react";
import styled from "styled-components";
import pure from "recompose/pure";
// import Alert from "shared/components/organisms/Alert";
// import GlobalIndicator from "shared/components/organisms/GlobalIndicator";

type Props = {
  // header: Node,
  main: Node,
  // footer: Node
};

// export default pure((props: Props) => {
//   const { header, main, footer } = props;
//
//   return (
//     <Root>
//       <Header>{header}</Header>
//       <Main>{main}</Main>
//       <Footer>{footer}</Footer>
//       <AlertContainer>
//         <Alert />
//       </AlertContainer>
//       <IndicatorContainer>
//         <GlobalIndicator />
//       </IndicatorContainer>
//     </Root>
//   );
// });

export default pure((props: Props) => {
  const { main } = props;

  return (
    <Root>
      <Main>{main}</Main>
    </Root>
  );
});


const Root = styled.div``;
// const Header = styled.div``;
const Main = styled.div``;
// const Footer = styled.div``;
// const AlertContainer = styled.div``;
// const IndicatorContainer = styled.div`
//   .indicator {
//     position: fixed;
//     top: 50%;
//     left: 50%;
//   }
// `;
