import React from 'react';
class BuyFromRetailerBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { ccidBtnDisplay, onClick, barcode } = this.props;
    return (
      <div
        className={`other-buy-btn rc-btn rc-btn--sm rc-btn--two ${
          !ccidBtnDisplay && 'rc-btn-solid-disabled'
        }`}
        data-ccid="wtb-target"
        data-ean={
          process.env.REACT_APP_LANG === 'fr' ? '3182550751148' : barcode
        }
        onClick={onClick}
      >
        <span className="rc-icon rc-location--xs rc-iconography rc-brand1 eanIcon" />
        {!ccidBtnDisplay ? (
          <span className="default-txt">Acheter via nos revendeurs</span>
        ) : null}
      </div>
    );
  }
}

export default BuyFromRetailerBtn;
