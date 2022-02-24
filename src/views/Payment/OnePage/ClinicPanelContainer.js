import React from 'react';
import { PanelContainer } from '../Common';
import { FormattedMessage } from 'react-intl-phraseapp';

const ClinicPanelContainer = ({
  panelStatus,
  children,
  onEdit,
  isLogin,
  previewJSX
}) => {
  return (
    <PanelContainer
      panelStatus={panelStatus}
      titleConf={{
        icon: {
          defaultIcon: <em className={`rc-icon rc-vet--xs rc-iconography`} />,
          highlighIcon: <em className={`rc-icon rc-vet--xs rc-brand1`} />
        },
        text: {
          title: isLogin ? (
            <FormattedMessage id="payment.clinicTitle2" />
          ) : (
            <FormattedMessage id="payment.clinicTitle" />
          )
        },
        onEdit
      }}
      previewJSX={previewJSX}
    >
      {children}
    </PanelContainer>
  );
};

export default ClinicPanelContainer;
