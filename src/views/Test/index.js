import React from 'react';
import { injectIntl } from 'react-intl-phraseapp';
// import AdyenEditForm from '@/components/Adyen/formTest';
@injectIntl
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="rc-content--fixed-header rc-bg-colour--brand4 p-40 text-4xl">
        <h1 className="mt-32">feature_0401_sprint12</h1>
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
      </div>
    );
  }
}

export default Test;
