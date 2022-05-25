import React, { useEffect, useState } from 'react';
import {
  matchNamefromDict,
  getDeviceType,
  getClubFlag,
  getRation
} from '@/utils/utils';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { FormattedMessage } from 'react-intl-phraseapp';
import { ObjectConstructor } from '@/utils/types';
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const Tr = window.__.env.REACT_APP_COUNTRY === 'tr';

interface Props {
  setState: Function;
  goodsNo: string;
}
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

const Ration = ({ goodsNo, setState }: Props) => {
  const [isFromPF, setIsFromPF] = useState(false);
  const [rationInfo, setRationInfo] = useState({ weight: '', weightUnit: '' });

  const getRationInfos = async () => {
    let pf_params = {};
    console.log(
      localStorage.getItem('pfls') && getClubFlag(),
      sessionItemRoyal.get('pf-result') && getClubFlag(),
      'aaaaa'
    );
    console.log(
      localStorage.getItem('pfls'),
      getClubFlag(),
      JSON.parse(sessionItemRoyal.get('pf-result')),
      'aaaaa'
    );
    try {
      if (localStorage.getItem('pfls') && getClubFlag()) {
        // @ts-ignore
        pf_params = JSON.parse(localStorage.getItem('pfls')).lastQuery;
        setState({ questionParams: JSON.stringify(pf_params) });
        setIsFromPF(true);
        const rationRes = await getRation(
          Object.assign(
            {
              spuNoList: [goodsNo]
            },
            pf_params
          )
        );
        setRationInfo((rationRes as any)?.context.rationResponseItems[0]);
      } else if (sessionItemRoyal.get('pf-result') && getClubFlag()) {
        pf_params = JSON.parse(sessionItemRoyal.get('pf-result')).queryParams;
        setState({ questionParams: JSON.stringify(pf_params) });
        setIsFromPF(true);
        const rationRes = await getRation(
          Object.assign(
            {
              spuNoList: [goodsNo]
            },
            pf_params
          )
        );
        setRationInfo((rationRes as any)?.context.rationResponseItems[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRationInfos();
  }, []);
  return (
    <div>
      {isFromPF ? (
        <div className="productFinderBox d-flex align-items-center justify-content-center justify-content-md-between p-3 mb-2 mt-2 flex-wrap">
          <div style={{ flex: '1' }}>
            <FormattedMessage id="details.recommendedDaily" />
            &nbsp;
            <span className="strong">
              <FormattedMessage
                id="details.recommendedDaily.info"
                values={{
                  val: rationInfo.weight
                    ? rationInfo.weight + rationInfo.weightUnit
                    : '0g'
                }}
              />
            </span>
          </div>
          <DistributeHubLinkOrATag
            href="/product-finder/product-finder-result-page"
            to="/product-finder-recommendation"
            className="rc-styled-link backProductFinder mt-0 pb-0"
          >
            <FormattedMessage id="Go back to recommendation" />
          </DistributeHubLinkOrATag>
        </div>
      ) : (
        <div
          className={`productFinderBox ${
            isMobile ? '' : 'd-flex'
          } align-items-center justify-content-center justify-content-md-between p-3 mb-2 mt-2 flex-wrap`}
        >
          <div style={{ flex: '1' }}>
            <FormattedMessage
              id="details.findProductTip"
              values={{
                btn: (
                  <DistributeHubLinkOrATag
                    href="/product-finder"
                    to="/product-finder"
                    className={`rc-styled-link ${
                      Tr || isMobile ? '' : 'backProductFinder'
                    } mt-0 pb-0`}
                  >
                    <FormattedMessage id="details.findProductTips" />
                  </DistributeHubLinkOrATag>
                )
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Ration;
