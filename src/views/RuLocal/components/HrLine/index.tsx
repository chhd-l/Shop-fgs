import React from 'react';
const HrLine = ({alwaysShow}:{alwaysShow?:boolean}) => (
  <hr
    className={alwaysShow?"":"rc-md-up"}
    style={{ borderWidth: '8px', borderColor: '#f4f4f4' }}
  />
);

export default HrLine