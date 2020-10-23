import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressWithTooptip from '@/components/ProgressWithTooptip';
import helpImg from '@/assets/images/product-finder-help.png';
import RadioAnswer from './RadioAnswer';
import SelectAnswer from './SelectAnswer';

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
        title: 'Which of the following best describes your cart？',
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

      setQuestionCfg({
        title: 'How old is your cat?',
        list: [
          ['1 year', '2 years'],
          ['3 month', '4 month']
        ]
      });
      setQuestionType('select');

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

  return (
    <div>
      <Header
        showMiniIcons={true}
        showUserIcon={true}
        location={location}
        history={history}
        match={match}
      />
      <div className="rc-content--fixed-header rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile rc-max-width--lg mb-0">
        <ProgressWithTooptip value={progress} style={{ height: '.4rem' }} />
        <div className="row justify-content-end">
          <div className="col-1">
            <img src={helpImg} />
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
                    <div className="col-12 col-md-6 mt-2 mb-4 mt-md-0 mb-md-0">
                      <p className="rc-styled-link mb-0 mt-2">
                        <FormattedMessage id="productFinder.whyAreWeAskingThis" />
                      </p>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
          <div className="col-12 col-md-6 order-0 order-md-1">
            <img src={{ cat: catImg, dog: dogImg }[type]} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductFinder;
