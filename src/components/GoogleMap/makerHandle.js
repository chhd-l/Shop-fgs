import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { funcUrl } from '@/lib/url-utils';

const localItemRoyal = window.__.localItemRoyal;

@inject('clinicStore')
@observer
class MakerHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const type = funcUrl({ name: 'type' });
    const id = funcUrl({ name: 'id' });
    const prescriberName = funcUrl({ name: 'prescriberName' });
    const lat = funcUrl({ name: 'lat' });
    const lng = funcUrl({ name: 'lng' });

    if (type == 'confirm') {
      this.handleConfirm(id, prescriberName);
    } else {
      this.handleNavigate(lat, lng);
    }
  }

  handleConfirm = (id, prescriberName) => {
    const { setSelectClinicId, setSelectClinicName } = this.props.clinicStore;
    setSelectClinicId(id);
    setSelectClinicName(prescriberName);
    localItemRoyal.set('checkOutNeedShowPrescriber', 'true'); //在checkout页面显示prescriber信息
    this.props.history.push('/checkout');
  };

  handleNavigate = (item) => {
    let url =
      'https://www.google.com/maps?saddr=My Location&daddr=' +
      lat +
      ',' +
      item.lng;
    let link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.target = '_blank';
    link.rel = 'nofollow';
    document.body.appendChild(link);
    link.click();
  };

  render() {
    return <></>;
  }
}

export default MakerHandle;
