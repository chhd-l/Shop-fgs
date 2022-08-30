import React from 'react';
import { injectIntl } from 'react-intl-phraseapp';
import AdyenEditForm from '@/components/Adyen/form';

@injectIntl
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <AdyenEditForm
          showSetAsDefaultCheckobx={window.__.env.REACT_APP_COUNTRY === 'uk'}
          showCancelBtn={true}
          // queryList={this.props.refreshList}
          // updateFormVisible={this.handleCancel}
          // updateInitStatus={this.updateInitStatus}
          enableStoreDetails={true}
          mustSaveForFutherPayments={true}
          // showErrorMsg={this.showErrorMsg}
          {...this.props}
        />
      </div>
    );
  }
}

export default Test;
