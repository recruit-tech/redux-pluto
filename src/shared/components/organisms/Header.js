/* @flow */
import React from "react";
import { compose, pure } from "recompose";
import { Link as ReactRouterLink, IndexLink as ReactRouterIndexLink } from "react-router";
import styled from "styled-components";

type Props = {
  location: {
    pathname: string
  }
};

type HeaderLink = {
  key: string,
  to: string,
  label: string,
  index?: boolean
};

const links: HeaderLink[] = [
  { key: "home", to: "/", label: "Home", index: true },
  { key: "foo", to: "/foo", label: "Foo" },
  { key: "bar", to: "/bar", label: "Bar" },
  { key: "agreedsample", to: "/agreedsample", label: "AgeedSample" },
  { key: "uploadsample", to: "/uploadsample", label: "UploadSample" },
  { key: "search", to: "/search", label: "Search" },
  { key: "largeform", to: "/largeform", label: "LargeForm" },
  { key: "hacker-news", to: "/hn", label: "HackerNews" },
  { key: "login", to: "/login", label: "Login" },
  { key: "logout", to: "/logout", label: "Logout" }
];

export default compose(pure)(function Header(props: Props) {
  return (
    <Root>
      <hgroup>
        <ServiceLogo>REDUX PLUTO</ServiceLogo>
        <CorporateLogo>PRODUCED by RECRUIT</CorporateLogo>
      </hgroup>
      <NavLinks>
        <Items>
          {links.map(({ key, to, label, index }) => (
            <Item key={key}>
              {index ? (
                <IndexLink to={to} selected={to === props.location.pathname}>
                  {label}
                </IndexLink>
              ) : (
                <Link to={to} selected={to === props.location.pathname}>
                  {label}
                </Link>
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

const Link = styled(ReactRouterLink)`
  display: block;
  padding: 12px 0;
  background-color: ${props => (props.selected ? "grey" : "lightgray")};

  &:hover {
    background-color: darkgray;
  }
`;

const IndexLink = styled(ReactRouterIndexLink)`
  background-color: ${props => (props.selected ? "grey" : "lightgray")};
  display: block;
  padding: 12px 0;
  &:hover {
    background-color: darkgray;
  }
`;
