import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../index.less';
import '../mobile.less';
import 'react-calendar/dist/Calendar.css';
import { inject, observer } from 'mobx-react';
import img from '../image/img.png';
import exper1 from '../image/exper.png';
import exper2 from '../image/exper1.png';
import exper3 from '../image/exper2.png';
import exper4 from '../image/exper4.png';
import exper5 from '../image/exper5.png';
import exper6 from '../image/exper6.png';

@inject('loginStore')
@observer
class ConseillerTwo extends React.Component {
  render() {
    return (
      <div className="conseiller-two">
        <div className="grid grid-cols-2 gap-6">
          <div className="txt-centr">
            <div className="jus-flex-center">
              <img src={exper1} alt="" />
            </div>
            <div className="mtb10">Alexandre Blavier</div>
            <div className="col0">Vétérinaire</div>
          </div>
          <div className="txt-centr">
            <div className="jus-flex-center">
              <img src={exper2} alt="" />
            </div>
            <div className="mtb10">Camille DeDecker</div>
            <div className="col0">Vétérinaire</div>
          </div>
          <div className="txt-centr">
            <div className="jus-flex-center">
              <img src={exper3} alt="" />
            </div>
            <div className="mtb10">Claire Nelaton</div>
            <div className="col0">Vétérinaire</div>
          </div>
          <div className="txt-centr">
            <div className="jus-flex-center">
              <img src={exper4} alt="" />
            </div>
            <div className="mtb10">Franck Perron</div>
            <div className="col0">Vétérinaire & éthologue</div>
          </div>
          <div className="txt-centr">
            <div className="jus-flex-center">
              <img src={exper5} alt="" />
            </div>
            <div className="mtb10">Hervé Page</div>
            <div className="col0">Expert en Nutrition</div>
          </div>
          <div className="txt-centr">
            <div className="jus-flex-center">
              <img src={exper6} alt="" />
            </div>
            <div className="mtb10">Pauline Bouissou</div>
            <div className="col0">Vétérinaire</div>
          </div>
        </div>
      </div>
    );
  }
}
export default ConseillerTwo;
