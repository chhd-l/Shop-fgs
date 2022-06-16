import React from 'react';
import { PanelContainer } from '../Common';
import { FormattedMessage } from 'react-intl-phraseapp';

const AddressPanelContainer = ({
  panelStatus,
  children,
  titleVisible,
  titleId,
  isFromFelin,
  isDeliverAddress,
  handleClickEdit,
  previewJSX
}) => {
  return (
    <PanelContainer
      panelStatus={panelStatus}
      titleConf={{
        titleVisible: titleVisible,
        id: `J-address-title-${titleId}`,
        icon: {
          defaultIcon: (
            <em className="rc-icon rc-indoors--xs rc-iconography rc-margin-right--xs" />
          ),
          highlighIcon: (
            <em className="rc-icon rc-indoors--xs rc-brand1 rc-margin-right--xs" />
          )
        },
        text: {
          title: isFromFelin ? (
            <FormattedMessage id="Felin Address" />
          ) : (
            <FormattedMessage
              id={
                isDeliverAddress ? 'payment.deliveryTitle' : 'payment.billTitle'
              }
            />
          )
        },
        onEdit: isFromFelin ? null : handleClickEdit
      }}
      containerConf={{ id: 'J_checkout_panel_deliveryAddr' }}
      previewJSX={previewJSX}
    >
      {children}
    </PanelContainer>
  );
};

export default AddressPanelContainer;
