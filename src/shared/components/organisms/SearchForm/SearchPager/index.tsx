import React from "react";
import styled from "styled-components";

import { Link as ReactRouterLink } from "react-router";

const PAGE_WINDOW = 20;

type Props = {
  page: number;
  pages: number[];
  keyword: string;
};

export default React.memo(function SearchPager(props: Props) {
  const { keyword, page, pages } = props;
  const slicedPages = slicePages(page, pages);

  return (
    <div>
      {slicedPages.map(p =>
        page === p ? (
          <Current key={p}>{p}</Current>
        ) : (
          <Link key={p} to={`/search?keyword=${keyword}&page=${p}`}>
            {p}
          </Link>
        ),
      )}
    </div>
  );
});

function slicePages(page: number, pages: Array<number>): Array<number> {
  if (page < PAGE_WINDOW / 2) {
    return pages.slice(0, PAGE_WINDOW);
  }

  return pages.slice(page - PAGE_WINDOW / 2, page + PAGE_WINDOW / 2);
}

const Link = styled(ReactRouterLink)`
  color: #0033cc;
  text-decoration: underline;
  cursor: pointer;
  padding: 8px 8px;
`;

const Current = styled.span`
  text-decoration: bold;
  padding: 8px 8px;
`;
