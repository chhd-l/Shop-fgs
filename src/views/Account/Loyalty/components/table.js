import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { getDeviceType } from '@/utils/utils';
import { useAxios } from '@/utils/useAxios';
import { postVisitorRegisterAndLogin } from '@/api/payment';
const isMobile = getDeviceType() !== 'PC';

const Table = ({ pageNum, sendData }) => {
  const [data, setData] = useState([
    {
      time: '2022.02.21 13:05',
      event: 'Checkut point grant',
      PointTransactions: '+30',
      remark: '-'
    },
    {
      time: '2022.02.21 13:05',
      event: 'Checkut point grant',
      PointTransactions: '+30',
      remark: '-'
    },
    {
      time: '2022.02.21 13:05',
      event: 'Checkut point grant',
      PointTransactions: '+30',
      remark: '-'
    },
    {
      time: '2022.02.21 13:05',
      event: 'Checkut point grant',
      PointTransactions: '+30',
      remark: '-'
    },
    {
      time: '2022.02.21 13:05',
      event: 'Checkut point grant',
      PointTransactions: '+30',
      remark: '-'
    }
  ]);

  const PCThead = () => {
    return (
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
    );
  };

  const chooseFragment = (isMobile, length) => {
    let fragment = '';
    if (!isMobile && length > 0) {
      fragment = (
        <div className="rc-table">
          <div className="rc-scroll--x">
            <table className="rc-table__table" data-js-table="">
              <PCThead />
              <tbody className="rc-table__tbody">
                {data.map((item, index) => {
                  return (
                    <tr className="rc-table__row" key={index}>
                      <td className="rc-table__td">{item.time}</td>
                      <td className="rc-table__td">{item.event}</td>
                      <td className="rc-table__td">{item.PointTransactions}</td>
                      <td className="rc-table__td">{item.remark}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (!isMobile && length == 0) {
      fragment = (
        <div className="rc-table">
          <div className="rc-scroll--x">
            <table className="rc-table__table" data-js-table="">
              <PCThead />
              <tbody className="rc-table__tbody">
                <div className="pc-no-point py-3 px-6">
                  <FormattedMessage id="There is no point history." />
                </div>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    if (isMobile && length > 0) {
      fragment = data.map((item, index) => {
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
      });
    }

    if (isMobile && length == 0) {
      fragment = (
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
      );
    }

    return fragment;
  };

  //const {data,isPending,error} = useAxios(postVisitorRegisterAndLogin)
  sendData(data);

  return (
    <>
      {chooseFragment(isMobile, data.length)}

      <style jsx>{`
        .pc-no-point {
          font-size: 16px;
          color: #666;
        }

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

export default Table;
