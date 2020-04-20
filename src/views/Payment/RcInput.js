import React from "react";

class RcInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      // <div class="rc-layout-container">
      //   <div class="rc-column rc-padding-y--none">
      //     <div class="form-group required dwfrm_shipping_shippingAddress_addressFields_firstName">
      //       <label class="form-control-label" for="shippingFirstName">
      //         First Name
      //       </label>
      //       <span
      //         class="rc-input rc-input--inline rc-full-width rc-input--full-width"
      //         input-setup="true"
      //       >
      //         <input
      //           class="rc-input__control shippingFirstName"
      //           id="shippingFirstName"
      //           type="text"
      //           value={billingAddress.firstName}
      //           onChange={(e) => this.billingInputChange(e)}
      //           name="firstName"
      //           required=""
      //           aria-required="true"
      //           maxlength="50"
      //         />
      //         <label class="rc-input__label" for="id-text1"></label>
      //       </span>
      //       <div class="invalid-feedback">This field is required.</div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default RcInput
