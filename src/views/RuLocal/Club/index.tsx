import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import HrLine from '../components/HrLine';
import Collapse from '@/components/Collapse';

const Club = () => {
  const {Panel} = Collapse
  return (
    <div className="ru-local-club">
      <Header showMiniIcons={true} showUserIcon={true} />
      <main className="rc-content--fixed-header rc-bg-colour--brand3">
        <BreadCrumbs />
        <div
          className="rc-content-block rc-padding-x--sm rc-margin--none rc-bg-colour--brand3 rc-full-width"
          data-component="content-animation"
          id="content-block-1-club-page"
        >
          <div className="rc-padding-y--md rc-md-down"></div>
          <div className="rc-layout-container rc-two-column rc-max-width--xl rc-content-h-middle">
            <div className="rc-column   rc-text--center">
              <div className="rc-full-width rc-padding-x--sm">
                <div className="rc-container-text">
                  <h2 className="rc-alpha "></h2>
                  <p>&nbsp;</p>
                  <h1>
                    <span style={{ color: '#e30613' }}>
                      <strong>
                        Вступайте
                        <br />в ROYAL CANIN® Клуб и получайте корм с
                        дополнительной выгодой
                      </strong>
                    </span>
                  </h1>
                  <a
                    className="rc-btn rc-btn--one "
                    href="https://www.royalcanin.com/ru/club/find-product"
                  >
                    ВЫБРАТЬ КОРМ
                  </a>
                </div>
              </div>
            </div>
            <div className="rc-column rc-padding-bottom--none  rc-text--left">
              <div className="rc-full-width rc-padding-x--sm">
                <img
                  className="lazyautosizes lazyloaded"
                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/club/10004.png`}
                />
              </div>
            </div>
          </div>
          <div className="rc-hidden"></div>
        </div>
        <div
          className="rc-content-block rc-padding-x--sm rc-margin--none rc-bg-colour--brand4 rc-full-width"
          data-component="content-animation"
          id="content-block-3-club-page"
        >
          <div className="rc-padding-y--md rc-md-down"></div>
          <div className="rc-layout-container rc-one-column rc-max-width--md rc-content-h-middle">
            <div className="rc-column rc-padding-bottom--none  rc-text--center">
              <div className="rc-full-width rc-padding-x--sm">
                <img
                  className="lazyautosizes lazyloaded"
                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/club/10003.png`}
                />
              </div>
            </div>
          </div>
          <div className="rc-hidden"></div>
        </div>
        <div
          className="rc-content-block rc-padding--sm rc-margin--none rc-bg-colour--brand4 rc-full-width"
          data-component="content-animation"
          id="content-block-2-club-page"
        >
          <div className="rc-padding-y--md rc-md-down"></div>
          <div className="rc-layout-container rc-two-column rc-max-width--xl rc-content-h-middle">
            <div className="rc-column   rc-text--left">
              <div className="rc-full-width rc-padding-x--sm">
                <img
                  className="lazyautosizes lazyloaded"
                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/club/10001.png`}
                />
              </div>
            </div>
            <div className="rc-column   rc-text--left">
              <div className="rc-full-width rc-padding-x--sm">
                <img
                  className="lazyautosizes lazyloaded"
                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/club/10002.png`}
                />
              </div>
            </div>
          </div>
          <div className="rc-padding-y--md rc-md-down"></div>
        </div>
        <div
          className="rc-content-block rc-padding--sm rc-margin--none rc-bg-colour--brand3 rc-full-width rc-animation-001--base rc-animation-001--active"
          data-component="content-animation"
          id="content-block-4-club-page"
        >
          <div className="rc-padding-y--md rc-md-down"></div>
          <div className="rc-layout-container rc-one-column rc-max-width--md rc-content-h-middle">
            <div className="rc-column   rc-text--center">
              <div className="rc-full-width rc-padding-x--sm">
                <div
                  data-js-table="true"
                  data-rc-feature-tables-setup="true"
                  className="richtext-editor rc-wysiwyg rc-bg-colour--brand3"
                >
                  <p>
                    &nbsp;
                    <span
                      style={{
                        color: ' rgb(226, 0, 26)',
                        fontSize: '1.875rem'
                      }}
                    >
                      Как это работает
                    </span>
                  </p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div className="rc-padding-y--md rc-md-down"></div>
        </div>
        <div
          className="rc-padding-x--sm rc-margin--none rc-bg-colour--brand3 rc-animation-001--base rc-animation-001--active"
          data-component="content-animation"
        >
          <div className="rc-padding-y--md rc-md-down"></div>
          <div className="rc-layout-container rc-two-column  rc-max-width--xl ">
            <div className="rc-column rc-padding-y--none rc-single rc-padding--none">
              <div
                className="rc-padding--sm rc-full-width rc-margin-bottom--xs rc-bg-colour--brand3 "
                data-component="content-animation"
                id="content-block-with-text-and-image-1-club-page"
              >
                <div className="rc-padding-y--md rc-md-down"></div>
                <div className="rc-layout-container rc-one-column rc-max-width--xl">
                  <div className="rc-column">
                    <div className="rc-full-width ">
                      <img
                        className="lazyautosizes lazyloaded"
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/club/10007.png`}
                      />
                    </div>
                  </div>
                </div>
                <div className="rc-layout-container rc-one-column rc-max-width--xl">
                  <div className="rc-column">
                    <div className="rc-full-width rc-text--center ">
                      <div className="rc-container-text">
                        <h2 className="rc-beta "></h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rc-padding-y--md rc-md-down"></div>
              </div>
            </div>
            <div className="rc-column rc-padding-y--none rc-single rc-padding--none">
              <div
                className="rc-padding--sm rc-full-width rc-margin--none rc-bg-colour--brand3 "
                data-component="content-animation"
                id="content-block-with-text-and-image-2-club-page"
              >
                <div className="rc-padding-y--md rc-md-down"></div>
                <div className="rc-layout-container rc-one-column rc-max-width--xl">
                  <div className="rc-column">
                    <div className="rc-full-width ">
                      <img
                        className="lazyautosizes lazyloaded"
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/club/10006.png`}
                      />
                    </div>
                  </div>
                </div>
                <div className="rc-layout-container rc-one-column rc-max-width--xl">
                  <div className="rc-column">
                    <div className="rc-full-width rc-text--center ">
                      <div className="rc-container-text">
                        <h2 className="rc-beta "></h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rc-padding-y--md rc-md-down"></div>
              </div>
            </div>
            <div className="rc-column rc-padding-y--none rc-single rc-padding--none">
              <div
                className="rc-padding--sm rc-full-width rc-margin--none rc-bg-colour--brand3 "
                data-component="content-animation"
                id="content-block-with-text-and-image-3-club-page"
              >
                <div className="rc-padding-y--md rc-md-down"></div>
                <div className="rc-layout-container rc-one-column rc-max-width--xl">
                  <div className="rc-column">
                    <div className="rc-full-width ">
                      <img
                        className="lazyautosizes lazyloaded"
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/club/10005.png`}
                      />
                    </div>
                  </div>
                </div>
                <div className="rc-layout-container rc-one-column rc-max-width--xl">
                  <div className="rc-column">
                    <div className="rc-full-width rc-text--center ">
                      <div className="rc-container-text">
                        <h2 className="rc-beta "></h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rc-padding-y--md rc-md-down"></div>
              </div>
            </div>
          </div>
          <div className="rc-padding-y--md rc-md-down rc-hidden"></div>
        </div>
        <div
          className="rc-content-block rc-padding-x--sm rc-margin-bottom--xs rc-bg-colour--brand3 rc-full-width rc-animation-001--base rc-animation-001--active"
          data-component="content-animation"
          id="content-block-7-club-page"
        >
          <div className="rc-padding-y--md rc-md-down"></div>
          <div className="rc-layout-container rc-one-column rc-max-width--md rc-content-h-middle">
            <div className="rc-column rc-padding-bottom--none  rc-text--center">
              <div className="rc-full-width rc-padding-x--sm">
                <a
                  href="https://www.royalcanin.com/ru/club/find-product"
                  className="rc-margin-bottom--xl--mobile rc-margin-bottom--md rc-btn rc-btn--one"
                >
                  ВЫБРАТЬ КОРМ
                </a>
              </div>
            </div>
          </div>
          <div className="rc-hidden"></div>
        </div>
        <HrLine />
        <div
          className="rc-margin--none rc-bg-colour--brand3 rc-full-width rc-animation-001--base rc-animation-001--active"
          data-component="content-animation"
          id="content-block-with-text-2-club-page"
        >
          <div className="rc-padding-y--md rc-md-down"></div>
          <div className="rc-layout-container rc-one-column rc-text--center rc-max-width--md">
            <div className="rc-column">
              <div className="rc-full-width">
                <div className="rc-container-text">
                  <h2
                    className="rc-beta "
                    data-en-title="Дарим подарки участникам клуба"
                  >
                    Дарим подарки участникам клуба
                  </h2>
                  <p>Подарки каждые 3 месяца участия*.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rc-padding-y--md rc-md-down"></div>
        </div>
        <div
          className="rc-content-block rc-padding--sm rc-margin-bottom--xs rc-bg-colour--brand3 rc-full-width rc-animation-001--base rc-animation-001--active"
          data-component="content-animation"
          id="content-block-8-club-page"
        >
          <div className="rc-padding-y--md rc-md-down"></div>
          <div className="rc-layout-container rc-one-column rc-max-width--lg rc-content-h-middle">
            <div className="rc-column   rc-text--center">
              <div className="rc-full-width rc-padding-x--sm">
                <img
                  className="lazyautosizes lazyloaded"
                  src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ru-local/club/10008.png`}
                />
              </div>
            </div>
          </div>
          <div className="rc-padding-y--md rc-md-down"></div>
        </div>
        <HrLine />
        <div className="rc-column rc-padding-bottom--none  rc-text--center">
          <div className="rc-full-width rc-padding-x--sm">
            <h3 className="rc-gamma">Ответы на часто задаваемые вопросы</h3>
          </div>
        </div>


        <Collapse onChange={()=>{
          console.info('sdsdsdsds')
        }}>
      <Panel header="This is panel header 1" key="1">
        <p>asdsdsdsds</p>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>sdsdsdsdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>bbbbbbbbbbbbbbbbbbbbbbb</p>
      </Panel>
    </Collapse>
      </main>
      <Footer />
    </div>
  );
};
export default Club;
