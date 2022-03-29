import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

const MobileTable = ({ data }) => {
  return (
    <>
      {data.length > 0 ? (
        data.map((item, index) => {
          return (
            <div
              className="mobile-table border border-gray-300 p-5 pb-0 mb-4"
              key={index}
            >
              <div className="mb-2">
                <div className="title">
                  <FormattedMessage id="Execution time" />
                </div>
                <div className="content">{item.time}</div>
              </div>
              <div className="mb-2">
                <div className="title">
                  <FormattedMessage id="Event" />
                </div>
                <div className="content">{item.event}</div>
              </div>
              <div className="mb-2">
                <div className="title">
                  <FormattedMessage id="Point transactions" />
                </div>
                <div className="content">{item.PointTransactions}</div>
              </div>
              <div className="mb-2">
                <div className="title">
                  <FormattedMessage id="Remark" />
                </div>
                <div className="content">{item.remark}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="mobile-table border border-gray-300 p-5 pb-0 mb-4">
          <div className="mb-2">
            <div className="title">
              <FormattedMessage id="Execution time" />
            </div>
            <div className="content">-</div>
          </div>
          <div className="mb-2">
            <div className="title">
              <FormattedMessage id="Event" />
            </div>
            <div className="content">-</div>
          </div>
          <div className="mb-2">
            <div className="title">
              <FormattedMessage id="Point transactions" />
            </div>
            <div className="content">-</div>
          </div>
          <div className="mb-2">
            <div className="title">
              <FormattedMessage id="Remark" />
            </div>
            <div className="content">-</div>
          </div>
        </div>
      )}
      <style jsx>{`
        .no-point {
          font-size: 16px;
          color: #666;
        }
        .mobile-table .title {
          font-size: 16px;
          color: #666;
        }
        .mobile-table .content {
          font-size: 18px;
          color: #666;
          font-weight: 500;
        }
      `}</style>
    </>
  );
};

export default MobileTable;
