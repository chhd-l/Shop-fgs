import React from 'react';
import { FormattedMessage } from 'react-intl';
import './index.css'

class ValidationAddressModal extends React.Component {
  static defaultProps = {
    modalTitle: <FormattedMessage id="information" />,
    modalVisible: false,
    address: [],
    validationAddress: [],
    selectValidationOption: 'suggestedAddress'
  };
  close() {
    this.props.close();
  }
  hanldeClickConfirm() {
    this.props.hanldeClickConfirm();
  }
  handleChooseValidationAddress(e) {
    this.props.handleChooseValidationAddress(e);
  }
  render() {
    const { address, validationAddress, modalVisible, selectValidationOption } = this.props;
    return (
      <div className={`modal validation_modal fade ${modalVisible == true ? 'show' : ''}`} id="shippingAddressValidationModal" tabIndex="-1" role="dialog" aria-labelledby="shippingAddressValidationModal" aria-modal="true" style={{ paddingRight: '16px' }}>
        <div className="modal-dialog" role="document" style={{ transform: 'none' }}>
          <div className="modal-content rc-padding-x--lg rc-padding-y--sm rc-padding-y--lg--mobile" style={{ marginTop: '0' }}>
            <div className="modal-header text-center rc-padding-bottom--xs rc-padding-top--sm rc-padding-y--lg--mobile rc-margin-top--lg--mobile">
              <h4 className="modal-title sav-modal-title rc-full-width rc-gamma rc-margin-bottom--none">Verify your address</h4>
            </div>
            <div className="modal-body rc-padding-top--xs--mobile">
              <div className="text-center rc-margin-bottom--sm rc-meta">
                <span className="d-none d-md-block">
                  We could not verify the address you provided
                  <br />
                  Please confirm or edit your address to ensure prompt delivery.
                </span>
                <span className="d-block d-md-none">We could not verify the address you providedPlease confirm or edit your address to ensure prompt delivery.</span>
              </div>
              <div className="d-flex rc-margin-bottom--sm rc-padding-top--xs row addressSuggestionModal">
                {/* originalAddress */}
                <div className={`originalAddress col-12 col-md-6 rc-column rc-padding-top--sm--mobile ${selectValidationOption == 'originalAddress' ? 'addressBorder' : ''}`}>
                  <div className="rc-input rc-padding-left--xs rc-margin-top--sm--mobile text-break" data-rc-feature-forms-setup="true">
                    <input type="radio" className="rc-input__radio" name="addressChoice" id="originalAddress" value="originalAddress" defaultChecked={selectValidationOption == 'originalAddress' ? true : false} onChange={(e) => this.handleChooseValidationAddress(e)} />
                    <label className="rc-input__label--inline rc-margin-bottom--none text-left" for="originalAddress">
                      <b>Original Address</b>
                      <br />
                      <span className="name"></span>
                      <span className="address-one">{address.address1},</span>
                      <span className="address-two">{address.address2}</span>
                      <span className="city">{address.city},</span>
                      <span className="state">{address.provinceName},</span>
                      <span className="postalCode">{address.postCode},</span>
                      <span className="countryCode">{address.countryName}</span>
                      <br />
                      <a className="styled-link" data-dismiss="modal" onClick={() => this.close()}><b>Edit</b></a>
                    </label>
                  </div>
                </div>
                {/* suggestedAddress */}
                <div className={`suggestedAddress col-12 col-md-6 rc-column rc-padding-top--sm--mobile rc-margin-top--sm--mobile ${selectValidationOption == 'suggestedAddress' ? 'addressBorder' : ''}`}>
                  <div className="rc-input rc-margin-top--sm--mobile text-break" data-rc-feature-forms-setup="true">
                    <input type="radio" className="rc-input__radio" name="addressChoice" id="suggestedAddress" value="suggestedAddress" defaultChecked={selectValidationOption == 'suggestedAddress' ? true : false} onChange={(e) => this.handleChooseValidationAddress(e)} />
                    <label className="rc-input__label--inline rc-margin-bottom--none text-left" for="suggestedAddress">
                      <b>Suggested Address</b>
                      <br />
                      <span className="name"></span>
                      <span className="address-one">{validationAddress.address1},</span>
                      <span className="address-two">{validationAddress.address2}</span>
                      <span className="city">{validationAddress.city},</span>
                      <span className="state">{validationAddress.provinceCode},</span>
                      <span className="postalCode">{validationAddress.postalCode},</span>
                      <span className="countryCode">{validationAddress.countryCode}</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="sav-buttons-div text-center rc-padding-top--lg--mobile rc-padding-top--sm">
                <button className="rc-btn rc-btn--one confirmAddress" onClick={(e) => this.hanldeClickConfirm(e)}>Confirm</button>
              </div>
              <input type="hidden" name="addressClassification" id="addressClassification" />
              <input type="hidden" name="fedexValidated" id="fedexValidated" />
            </div>
          </div>
        </div>
      </div >
    );
  }
}
export default ValidationAddressModal