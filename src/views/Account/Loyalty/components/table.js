import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { getDeviceType } from '@/utils/utils';
import { format } from 'date-fns';
const isMobile = getDeviceType() !== 'PC';
import './table.less';

const Table = ({ data }) => {
  const PCThead = () => {
    return (
      <thead className="rc-table__thead">
        <tr className="rc-table__row">
          <th className="rc-table__th rc-espilon text-gray-500">
            <FormattedMessage id="account.loyalty.executionTime" />
          </th>
          <th className="rc-table__th rc-espilon text-gray-500">
            <FormattedMessage id="account.loyalty.event" />
          </th>
          <th className="rc-table__th rc-espilon text-gray-500">
            <FormattedMessage id="account.loyalty.pointTransactions" />
          </th>
          <th className="rc-table__th rc-espilon text-gray-500">
            <FormattedMessage id="account.loyalty.remark" />
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
                      <td className="rc-table__td">
                        {format(
                          new Date(item.activationDate),
                          'yyyy-MM-dd hh:mm:ss'
                        )}
                      </td>
                      <td className="rc-table__td">{item.type}</td>
                      <td className="rc-table__td">{item.value}</td>
                      <td className="rc-table__td">{item.description}</td>
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
                  <FormattedMessage id="ThereIsNoPointHistory" />
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
              <div className="content">
                {format(new Date(item.activationDate), 'yyyy-MM-dd hh:mm:ss')}
              </div>
            </div>
            <div className="mb-2">
              <div className="title">
                <FormattedMessage id="Event" />
              </div>
              <div className="content">{item.type}</div>
            </div>
            <div className="mb-2">
              <div className="title">
                <FormattedMessage id="Point transactions" />
              </div>
              <div className="content">{item.value}</div>
            </div>
            <div className="mb-2">
              <div className="title">
                <FormattedMessage id="Remark" />
              </div>
              <div className="content">{item.description}</div>
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

  return (
    <div className="loyalty-table">{chooseFragment(isMobile, data.length)}</div>
  );
};

export default Table;
