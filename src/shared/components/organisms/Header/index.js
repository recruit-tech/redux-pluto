import React from "react";
import { compose, pure } from "recompose";
import { IndexLink, Link } from "react-router";
import styled from "styled-components";

const links = [
  { key: "home", to: "/", label: "Home", index: true },
  { key: "foo", to: "/foo", label: "Foo" },
  { key: "bar", to: "/bar", label: "Bar" },
  { key: "agreedsample", to: "/agreedsample", label: "AgeedSample" },
  { key: "uploadsample", to: "/uploadsample", label: "UploadSample" },
  { key: "style", to: "/style", label: "Style" },
  { key: "salon", to: "/salon", label: "Salon" },
  { key: "agreedsalon", to: "/agreedsalon", label: "AgreedSalon" },
  { key: "largeform", to: "/largeform", label: "LargeForm" },
  { key: "login", to: "/login", label: "Login" },
  { key: "logout", to: "/logout", label: "Logout" }
];

export default compose(pure)(function Header(props) {
  return (
    <Root>
      <hgroup>
        <ServiceLogo>HOT PEPPER Beauty</ServiceLogo>
        <CorporateLogo>PRODUCED by RECRUIT</CorporateLogo>
      </hgroup>
      <NavLinks>
        <Items>
          {links.map(({ key, to, label, index }) => (
            <Item key={key}>
              {index ? (
                <IndexLink to={to}>{label}</IndexLink>
              ) : (
                <StyledLink to={to}>{label}</StyledLink>
              )}
            </Item>
          ))}
        </Items>
      </NavLinks>
    </Root>
  );
});

const Root = styled.header`
  text-align: center;
  padding-top: 24px;
  background-color: #be3c5f;
  color: white;
  width: 100%;
  position: fixed;
`;

const ServiceLogo = styled.h1`
  margin-bottom: 24px;
`;

const CorporateLogo = styled.h2``;

const NavLinks = styled.nav``;

const Items = styled.ul`
  display: flex;
  justify-content: space-around;
  overflow: hidden;
`;

const Item = styled.li`
  flex-grow: 1;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 12px 0;
  background-color: lightgrey;

  &:hover {
    background-color: darkgray;
  }

  &-isActive {
    background-color: grey;
  }
`;
