import React, { useState, useEffect } from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressWithTooptip from '@/components/ProgressWithTooptip';
import helpImg from '@/assets/images/product-finder-help.png';
import RadioAnswer from './RadioAnswer';
import SelectAnswer from './SelectAnswer';
import SearchAnswer from './SearchAnswer';

import catImg from '@/assets/images/product-finder-cat.png';
import dogImg from '@/assets/images/product-finder-dog.png';

const ProductFinder = ({ location, history, match }) => {
  const type = match.params.type;
  const [progress, setProgress] = useState(12);
  const [questionType, setQuestionType] = useState('');
  const [questionCfg, setQuestionCfg] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [form, setFormData] = useState('');
  const [url, setUrl] = useState(`xxx?query=`);
  const [qListVisible, setQListVisible] = useState(false);
  const [iconToolTipVisible, setIconToolTipVisible] = useState(false);
  const [btnToolTipVisible, setBtnToolTipVisible] = useState(false);

  // setInterval(() => {
  //   if (progress < 101) {
  //     setProgress((c) => c + 1);
  //   }
  // }, 3000);
  // 请求接口，判断本道题为什么类型

  useEffect(() => {
    // 请求题目
    setIsPageLoading(true);
    setTimeout(() => {
      setQuestionCfg({
        title: 'Which of the following best describes your cat？',
        list: [
          'My cat is new in our family',
          'My cat is no longer a kitten',
          'My cat is ageing',
          'My cat seems to have some sensitivities',
          'My cat has health problems',
          'None of the above'
        ]
      });
      setQuestionType('radio');

      // setQuestionCfg({
      //   title: 'How old is your cat?',
      //   list: [
      //     ['1 year', '2 years'],
      //     ['3 month', '4 month']
      //   ]
      // });
      // setQuestionType('select');

      // setQuestionCfg({
      //   title: 'What breed is your cat?',
      //   list: ['a','aa', 'bb']
      // });
      // setQuestionType('search');

      setIsPageLoading(false);
    }, 2000);
  }, [url]);

  function updateFromData(data) {
    setFormData(data);
  }

  function handleClickNext() {
    // 根据当前answer，请求题目
    setUrl(`xxx?query=${form}`);
  }

  function toggleShowQList() {
    setQListVisible((c) => !c);
  }

  const event = {
    page: {
      type: 'Product Finder',
      theme: type
    }
  };

  return (
    <div>
      <GoogleTagManager additionalEvents={event} />
      <Header
        showMiniIcons={true}
        showUserIcon={true}
        location={location}
        history={history}
        match={match}
      />
      <div className="rc-content--fixed-header rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile rc-max-width--lg mb-0">
        <ProgressWithTooptip value={progress} style={{ height: '.4rem' }} />
        <div className="row justify-content-center justify-content-md-between mb-4">
          <div className="col-8 col-md-4 mt-2">
            <div
              className="pt-2 pb-2 rc-bg-colour--brand4 text-center rounded ui-cursor-pointer-pure"
              onClick={toggleShowQList}
            >
              {qListVisible ? (
                <span className="rc-icon rc-down--xs rc-iconography" />
              ) : (
                <span className="rc-icon rc-right--xs rc-iconography" />
              )}
              <FormattedMessage id="answeredQuestions" />
            </div>
            {qListVisible && (
              <div className="mt-2 rc-bg-colour--brand4 rounded text-center">
                {['my dsdfadsa', 'my dhahhahaha', 'yeyeyeyeyeyeyye'].map(
                  (ele) => (
                    <div
                      className="ml-2 mr-2 pt-2 pb-2 border-bottom"
                      ref={(node) => {
                        if (node) {
                          node.style.setProperty(
                            'border-bottom',
                            '2px solid #fff',
                            'important'
                          );
                        }
                      }}
                    >
                      {ele}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <div className="col-2 col-md-1 rc-md-up">
            <img
              className="ui-cursor-pointer"
              src={helpImg}
              onMouseEnter={() => {
                setIconToolTipVisible(true);
              }}
              onMouseLeave={() => {
                setIconToolTipVisible(false);
              }}
              alt=""
            />
            <ConfirmTooltip
              arrowDirection="right"
              arrowStyle={{ top: '25%' }}
              display={iconToolTipVisible}
              cancelBtnVisible={false}
              confirmBtnVisible={false}
              updateChildDisplay={(status) => setIconToolTipVisible(status)}
              content={<FormattedMessage id="productFinder.helpTip3" />}
              key="1"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 order-1 order-md-0 mt-4 mt-md-0">
            {isPageLoading ? (
              <span className="mt-4">
                <Skeleton color="#f5f5f5" width="100%" height="3%" count={5} />
              </span>
            ) : (
              <>
                {questionType === 'radio' && (
                  <RadioAnswer
                    config={questionCfg}
                    updateFromData={updateFromData}
                  />
                )}
                {questionType === 'select' && (
                  <SelectAnswer
                    config={questionCfg}
                    updateFromData={updateFromData}
                  />
                )}
                {questionType === 'search' && (
                  <SearchAnswer
                    config={questionCfg}
                    updateFromData={updateFromData}
                  />
                )}
                {questionType ? (
                  <div className="row text-center text-md-left">
                    <div className="col-12 col-md-3">
                      <button
                        className="rc-btn rc-btn--one rc-btn--sm"
                        disabled={!form}
                        onClick={handleClickNext}
                      >
                        <FormattedMessage id="next" />
                      </button>
                    </div>
                    <div className="col-12 col-md-7 mt-2 mb-4 mt-md-0 mb-md-0">
                      <div className="position-relative inlineblock">
                        <p
                          className="rc-styled-link mb-0 mt-2"
                          onMouseEnter={() => {
                            setBtnToolTipVisible(true);
                          }}
                          onMouseLeave={() => {
                            setBtnToolTipVisible(false);
                          }}
                        >
                          <FormattedMessage id="productFinder.whyAreWeAskingThis" />
                        </p>
                        <div className="rc-md-up">
                          <ConfirmTooltip
                            arrowDirection="left"
                            arrowStyle={{ top: '50%' }}
                            display={btnToolTipVisible}
                            cancelBtnVisible={false}
                            confirmBtnVisible={false}
                            updateChildDisplay={(status) =>
                              setBtnToolTipVisible(status)
                            }
                            content={
                              <FormattedMessage id="productFinder.helpTip3" />
                            }
                            key="2"
                          />
                        </div>
                        <div className="rc-md-down">
                          <ConfirmTooltip
                            arrowDirection="bottom"
                            arrowStyle={{ top: '-14%' }}
                            containerStyle={{
                              transform: 'translate(-50%, 120%)'
                            }}
                            display={btnToolTipVisible}
                            cancelBtnVisible={false}
                            confirmBtnVisible={false}
                            updateChildDisplay={(status) =>
                              setBtnToolTipVisible(status)
                            }
                            content={
                              <FormattedMessage id="productFinder.helpTip3" />
                            }
                            key="3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
          <div className="col-12 col-md-6 order-0 order-md-1">
            <img
              src={{ cat: catImg, dog: dogImg }[type]}
              className="p-f-q-avatar"
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductFinder;
