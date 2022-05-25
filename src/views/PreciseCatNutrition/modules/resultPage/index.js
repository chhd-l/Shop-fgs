import React from 'react';
import './index.less';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import hos from '../../../../assets/images/preciseCatNutrition/hos.png';
import recommend from '../../../../assets/images/preciseCatNutrition/recomment.jpg';
import { FormattedMessage } from 'react-intl-phraseapp';

let resultObj = {
  redirectToVet: {
    title: 'Find a vet',
    href: '/where-to-buy/find-a-vet',
    img: hos,
    text: 'moreComplexWeightDsc'
    // 'It seems that your cat may have a more complex weight concern, therefore we recommend you to visit your veterinarian to ensure that your cat will receive an optimal nutritional solution according to its specific needs.'
  },
  redirectToProductFinder: {
    title: 'Discover',
    href: '/product-finder',
    img: recommend,
    text: 'noWeightProblemsDsc'
    // 'It seems that your cat does not have any weight related concerns, this offer is therefore not suited for him. But you can still discover the most adapted product for your cat from our complete range of formulas'
  }
};
export default function ResultPage({ getInit, result }) {
  return (
    <div className="Veterinarian">
      <img className="Veterinarian-img" src={resultObj[result].img} />
      <div className="Veterinarian-title">
        <FormattedMessage id={resultObj[result].text} />
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <DistributeHubLinkOrATag href={resultObj[result].href}>
          <button className="rc-btn rc-btn--one question-button">
            <FormattedMessage id={resultObj[result].title} />
          </button>
        </DistributeHubLinkOrATag>

        <div
          style={{ textAlign: 'center', marginTop: '20px' }}
          onClick={() => getInit(true)}
        >
          <span className="back-btn">
            {' '}
            <FormattedMessage id="StartAgain" />
          </span>
        </div>
      </div>
    </div>
  );
}
