import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

const PcTable = ({ data }) => {
  return (
    <>
      <div className="rc-table">
        <div className="rc-scroll--x">
          <table className="rc-table__table" data-js-table="">
            <thead className="rc-table__thead">
              <tr className="rc-table__row">
                <th className="rc-table__th rc-espilon text-gray-500">
                  <FormattedMessage id="Execution time" />
                </th>
                <th className="rc-table__th rc-espilon text-gray-500">
                  <FormattedMessage id="Event" />
                </th>
                <th className="rc-table__th rc-espilon text-gray-500">
                  <FormattedMessage id="Point transactions" />
                </th>
                <th className="rc-table__th rc-espilon text-gray-500">
                  <FormattedMessage id="Remark" />
                </th>
              </tr>
            </thead>
            <tbody className="rc-table__tbody">
              {data.length > 0 ? (
                data.map((item, index) => {
                  return (
                    <tr className="rc-table__row" key={index}>
                      <td className="rc-table__td">{item.time}</td>
                      <td className="rc-table__td">{item.event}</td>
                      <td className="rc-table__td">{item.PointTransactions}</td>
                      <td className="rc-table__td">{item.remark}</td>
                    </tr>
                  );
                })
              ) : (
                <div className="no-point py-3 px-6">
                  <FormattedMessage id="There is no point history." />
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx>{`
        .no-point {
          font-size: 16px;
          color: #666;
        }
      `}</style>
    </>
  );
};

export default PcTable;
