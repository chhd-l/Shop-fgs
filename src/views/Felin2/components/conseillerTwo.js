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
        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile  rc-margin-y--lg--mobile">
          <div className="rc-max-width--xxl">
            <div className="rc-layout-container rc-two-column rc-content-h-middle flx-center">
              <div className="rc-column rc-triple-width rc-padding--none--mobile product-tiles-container pt-0 flx-center">
                <div className="rc-layout-container rc-three-column rc-layout-grid rc-match-heights product-tiles flx-center">
                  <div className="col-md-2  col-2 pr-0 md:pl-2 md:pr-2  mb-3 pl-0 mglr16">
                    <img src={cat1} alt="" />
                    <div className="mtb10">Alexandre Blavier</div>
                    <div className="col0">Expertise</div>
                  </div>
                  <div className="col-md-2 col-2 pr-0 md:pl-2 md:pr-2  mb-3 pl-0 mglr16">
                    <img src={cat1} alt="" />
                    <div className="mtb10">Alexandre Blavier</div>
                    <div className="col0">Expertise</div>
                  </div>
                  <div className="col-md-2 col-2 pr-0 md:pl-2 md:pr-2  mb-3 pl-0 mglr16">
                    <img src={cat1} alt="" />
                    <div className="mtb10">Alexandre Blavier</div>
                    <div className="col0">Expertise</div>
                  </div>
                  <div className="col-md-2 col-2 pr-0 md:pl-2 md:pr-2  mb-3 pl-0 mglr16">
                    <img src={cat1} alt="" />
                    <div className="mtb10">Alexandre Blavier</div>
                    <div className="col0">Expertise</div>
                  </div>
                  <div className="col-md-2 col-2 pr-0 md:pl-2 md:pr-2  mb-3 pl-0 mglr16">
                    <img src={cat1} alt="" />
                    <div className="mtb10">Alexandre Blavier</div>
                    <div className="col0">Expertise</div>
                  </div>
                  <div className="col-md-2 col-2 pr-0 md:pl-2 md:pr-2  mb-3 pl-0 mglr16">
                    <img src={cat1} alt="" />
                    <div className="mtb10">Alexandre Blavier</div>
                    <div className="col0">Expertise</div>
                  </div>
                  <div className="col-md-2 col-2 pr-0 md:pl-2 md:pr-2  mb-3 pl-0 mglr16">
                    <img src={cat1} alt="" />
                    <div className="mtb10">Alexandre Blavier</div>
                    <div className="col0">Expertise</div>
                  </div>
                  <div className="col-md-2 col-2 pr-0 md:pl-2 md:pr-2  mb-3 pl-0 mglr16">
                    <img src={cat1} alt="" />
                    <div className="mtb10">Alexandre Blavier</div>
                    <div className="col0">Expertise</div>
                  </div>
                  <div className="col-md-2 col-2 pr-0 md:pl-2 md:pr-2  mb-3 pl-0 mglr16">
                    <img src={cat1} alt="" />
                    <div className="mtb10">Alexandre Blavier</div>
                    <div className="col0">Expertise</div>
                  </div>
                  <div className="col-md-2 col-2 pr-0 md:pl-2 md:pr-2  mb-3 pl-0 mglr16">
                    <img src={cat1} alt="" />
                    <div className="mtb10">Alexandre Blavier</div>
                    <div className="col0">Expertise</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ConseillerTwo;
