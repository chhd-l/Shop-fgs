import React, { useState } from 'react';
import './index.less';

// 目前只有se有这种情况，因为文案什么滴都是写死的，如果后期有多个国家都有该情况，可以再优化。
const ConsentToolTip = ({ consentInnerHtml, pageType }) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const handleShowTooltip = () => {
    setShowToolTip(true);
  };

  const handleHiddenTooltip = () => {
    setShowToolTip(false);
  };

  return (
    <div class="se-consent-text">
      <a
        class={`se-consent-desc ${
          pageType === 'account' ? 'account-consent' : ''
        }`}
        onMouseEnter={handleShowTooltip}
        onMouseLeave={handleHiddenTooltip}
        dangerouslySetInnerHTML={consentInnerHtml}
      ></a>
      <div class={`se-consent-tooltip-wrap ${showToolTip ? 'block' : 'none'}`}>
        <div class="se-consent-tooltip-inside">
          <p class="se-consent-tooltip-text">
            Banfield®, VCA , BluePearl™, AniCura, LINNAEUS, Veterinary Specialty
            Hospital (VSH), PEDIGREE®, ROYAL CANIN®, WHISKAS®, Iams, NUTRO
            ULTRA™, DREAMIES®, SHEBA®, Cesar®, TEMPTATIONS®, Eukanuba™,
            GREENIES™, AQUARIAN®, API®, BUCKEYE™, SPILLARS™, Winergy
            Equilibrium™, WISDOM PANEL®, Whistle™, Leap, Companion Fund,
            Kinship™, WALTHAM™
          </p>
          <div class="se-consent-tooltip-arrow"></div>
        </div>
      </div>
    </div>
  );
};

export default ConsentToolTip;
