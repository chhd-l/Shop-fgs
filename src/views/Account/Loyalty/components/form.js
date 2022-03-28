import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

const Form = (props) => {
  return (
    <>
      <div class="rc-table">
        <div class="rc-scroll--x">
          <table class="rc-table__table" data-js-table="">
            <thead class="rc-table__thead">
              <tr class="rc-table__row">
                <th class="rc-table__th rc-espilon">
                  <FormattedMessage id="Execution time" />
                </th>
                <th class="rc-table__th rc-espilon">
                  <FormattedMessage id="Event" />
                </th>
                <th class="rc-table__th rc-espilon">
                  <FormattedMessage id="Point transactions" />
                </th>
                <th class="rc-table__th rc-espilon">
                  <FormattedMessage id="Remark" />
                </th>
              </tr>
            </thead>
            <tbody class="rc-table__tbody">
              <tr class="rc-table__row">
                <td class="rc-table__td">2022.02.21 13:05</td>
                <td class="rc-table__td">Checkut point grant</td>
                <td class="rc-table__td">+30</td>
                <td class="rc-table__td">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Form;
