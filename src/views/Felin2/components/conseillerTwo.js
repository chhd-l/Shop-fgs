import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../index.less';
import '../mobile.less';
import 'react-calendar/dist/Calendar.css';
import { inject, observer } from 'mobx-react';
import img from '../image/img.png';
import cat1 from '../image/cat1.png';

@inject('loginStore')
@observer
class ConseillerTwo extends React.Component {
  render() {
    return (
      <div className="conseiller-two">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <img src={cat1} alt="" />
            <div className="mtb10">Alexandre Blavier</div>
            <div className="col0">Expertise</div>
          </div>
          <div>
            <img src={cat1} alt="" />
            <div className="mtb10">Alexandre Blavier</div>
            <div className="col0">Expertise</div>
          </div>
          <div>
            <img src={cat1} alt="" />
            <div className="mtb10">Alexandre Blavier</div>
            <div className="col0">Expertise</div>
          </div>
          <div>
            <img src={cat1} alt="" />
            <div className="mtb10">Alexandre Blavier</div>
            <div className="col0">Expertise</div>
          </div>
          <div>
            <img src={cat1} alt="" />
            <div className="mtb10">Alexandre Blavier</div>
            <div className="col0">Expertise</div>
          </div>
        </div>
      </div>
    );
  }
}
export default ConseillerTwo;
