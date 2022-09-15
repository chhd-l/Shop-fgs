import React from 'react';
import advantageIconList from '@/views/Home/modules/advantageIconList';
import LazyLoad from 'react-lazyload';
import { FormattedMessage } from 'react-intl-phraseapp';
import { optimizeImage } from '@/utils/utils';
import cn from 'classnames';

const AdvantageTip = () => {
  return (
    <div className="mt-14 md:w-4/5 mx-auto">
      <ul className="rc-list rc-list--blank grid grid-cols-12">
        {advantageIconList.map((ele: any, idx: number) => (
          <li
            className={cn(
              `rc-list__item rc-icon rc-margin-bottom--xs col-span-6 md:col-span-3 flex justify-center`
            )}
            key={idx}
          >
            <p className="w-24">
              <FormattedMessage id={ele.langKey}>
                {(txt: any) => (
                  <>
                    <LazyLoad height={200}>
                      <img
                        src={optimizeImage({
                          originImageUrl: ele.img,
                          width: 40
                        })}
                        srcSet={ele.img}
                        className="mx-auto w-4/5"
                        alt={txt}
                        title={txt}
                      />
                    </LazyLoad>
                    <p className="rc-meta text-center markup-text">{txt}</p>
                  </>
                )}
              </FormattedMessage>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvantageTip;
