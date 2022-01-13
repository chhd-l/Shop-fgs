import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../index.less';
import '../mobile.less';
import 'react-calendar/dist/Calendar.css';
import { inject, observer } from 'mobx-react';
import img from '../image/img.png';
import exper1 from '../image/exper1.png';
import exper2 from '../image/exper2.png';
import exper3 from '../image/exper3.png';
import exper4 from '../image/exper4.png';

@inject('loginStore')
@observer
class ConseillerTwo extends React.Component {
  render() {
    return (
      <div className="conseiller-two">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <img src={exper1} alt="" />
            <div className="mtb10">Camille De Decker</div>
            <div className="col0">Vétérinaire Expert</div>
          </div>
          <div>
            <img src={exper2} alt="" />
            <div className="mtb10">Claire Nelaton</div>
            <div className="col0">Vétérinaire Expert</div>
          </div>
          <div>
            <img src={exper3} alt="" />
            <div className="mtb10">Pauline Bouissou</div>
            <div className="col0">Vétérinaire Expert</div>
          </div>
          <div>
            <img src={exper4} alt="" />
            <div className="mtb10">Thierry Pauline</div>
            <div className="col0">Vétérinaire Expert</div>
          </div>
        </div>
      </div>
    );
  }
}
export default ConseillerTwo;
