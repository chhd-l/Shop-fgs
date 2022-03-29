import React from 'react';

const MobileTable = ({ data }) => {
  return (
    <>
      {data.length > 0 ? (
        data.map((item, index) => {
          return <div>{item.time}</div>;
        })
      ) : (
        <div className="no-point py-3 px-6">
          <FormattedMessage id="There is no point history." />
        </div>
      )}
      <style jsx>{`
        .no-point {
          font-size: 16px;
          color: #666;
        }
      `}</style>
    </>
  );
};

export default MobileTable;
