import { steps } from "redux-effects-steps";
import { fetchrRead } from "redux-effects-fetchr";
import { HackerNewsItem } from "../../types/HackerNews";

/**
 * Action types
 */
export const FETCH_ITEMS_REQUEST = "redux-proto/hackerNews/fetch-items/request";
export const FETCH_ITEMS_SUCCESS = "redux-proto/hackerNews/fetch-items/success";
export const FETCH_ITEMS_FAIL = "redux-proto/hackerNews/fetch-items/fail";

type GetHackerNewsType = {
  data: HackerNewsItem[];
};

type FetchItemsRequest = {
  type: typeof FETCH_ITEMS_REQUEST;
};
type FetchItemsSuccess = {
  type: typeof FETCH_ITEMS_SUCCESS;
  payload: GetHackerNewsType;
};
type FetchItemsFail = {
  type: typeof FETCH_ITEMS_FAIL;
  payload: Error;
  error: boolean;
};

type Action = FetchItemsRequest | FetchItemsSuccess | FetchItemsFail;

/**
 * Action creators
 */

function fetchItemsRequest(): FetchItemsRequest {
  return {
    type: FETCH_ITEMS_REQUEST,
  };
}
function fetchItemsSuccess(res: GetHackerNewsType): FetchItemsSuccess {
  return {
    type: FETCH_ITEMS_SUCCESS,
    payload: res,
  };
}
function fetchItemsFail(error: Error): FetchItemsFail {
  return {
    type: FETCH_ITEMS_FAIL,
    payload: error,
    error: true,
  };
}

export function fetchItems(page: number = 1) {
  return steps(
    fetchItemsRequest(),
    fetchrRead({ resource: "hackerNews", params: { page } }),
    [fetchItemsSuccess, fetchItemsFail],
  );
}

/**
 * Initial state
 */

export type State = {
  items: HackerNewsItem[];
  page: number;
  loading: boolean;
  error?: boolean;
};

export const INITIAL_STATE: State = {
  items: [],
  page: 1,
  loading: false,
};

/**
 * Reducer
 */
export default function(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_ITEMS_SUCCESS: {
      const {
        payload: { data },
      } = action;
      return {
        ...state,
        loading: false,
        items: data,
      };
    }
    case FETCH_ITEMS_FAIL: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
}
