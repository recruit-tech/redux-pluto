import React, { memo } from "react";
import Indicator from "../../atoms/Indicator";

type Props = {
  loading: boolean;
};

export default memo(function GlobalIndicator(props: Props) {
  const { loading } = props;

  return (
    <div>
      <Indicator loading={loading} />
    </div>
  );
});
