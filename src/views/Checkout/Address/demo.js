import React, { forwardRef } from 'react';

const Demo = (prop, ref) => {
  return <div ref={ref}>demo</div>;
};

export default forwardRef(Demo);
