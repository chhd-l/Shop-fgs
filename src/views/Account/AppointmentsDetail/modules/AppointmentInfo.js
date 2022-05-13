import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { handleFelinAppointTime, formatDate } from '@/utils/utils';

@inject('configStore')
@observer
class AppointmentInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleFelinOrderDate = (appointmentDate) => {
    const orderTime = handleFelinAppointTime(appointmentDate);
    return (
      formatDate({ date: orderTime.appointStartTime.split(' ')[0] }) +
      ' ' +
      orderTime.appointStartTime.split(' ')[1] +
      ' - ' +
      orderTime.appointEndTime.split(' ')[1]
    );
  };
  render() {
    const { details } = this.props;
    return (
      <div className="ml-2 mr-2 md:mr-0 md:ml-0">
        <p className="mt-4 mb-3 red text-left">
          <FormattedMessage id="Appointment Information" />
        </p>

        <div className="row text-left text-break">
          {/*Felin Address*/}
          <div className="col-12 col-md-4 mb-3">
            <div className="border rounded h-100">
              <div className="d-flex p-3 h-100">
                <img
                  className="align-middle mr-3 ml-1"
                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/addresses.svg`}
                  alt="icons addresses"
                  style={{ width: '2em', height: '2em' }}
                />
                <div>
                  <p className="medium mb-3">
                    <FormattedMessage id="Felin Address" />
                  </p>
                  {/* 地址 */}
                  <p className="mb-0 od_mb_address1">
                    142 BOULEVARD SAINT GERMAIN
                  </p>
                  <p className="mb-0 od_mb_cpp">PARIS,75006</p>
                </div>
              </div>
            </div>
          </div>
          {/*Appointment summary*/}
          <div className="col-12 col-md-4 mb-3">
            <div className="border rounded p-3 h-100">
              <div className="d-flex">
                <i
                  className="iconfont iconyuyuexinxi mr-3 ml-1"
                  style={{
                    fontSize: '36px',
                    color: '#d81e06',
                    marginTop: '-12px'
                  }}
                />
                <div>
                  <div className="medium mb-3">
                    <FormattedMessage id="Appointment summary" />
                  </div>
                  <p className="mb-0">
                    <FormattedMessage id="Expert type" />
                    {details.expertType}
                  </p>
                  <p className="mb-0">
                    <FormattedMessage id="Appointment type" />
                    {details.appointmentType}
                  </p>
                  <p className="mb-0">
                    <FormattedMessage id="Appointment time" />
                  </p>
                  <p className="mb-0">
                    {this.handleFelinOrderDate(details.apptTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppointmentInfo;
