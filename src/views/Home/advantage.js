import React from 'react'
import { FormattedMessage } from 'react-intl';
import { formatMoney } from '@/utils/utils';

export function Advantage() {
    const defaultJSX = (
        <>
            <div className="col-12 col-md-6 col-xxl-4 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                    <img
                        className="value-proposition__img"
                        src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3206e904/homepage/pack@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                        alt=""
                        title=""
                    />
                    <div className="pl-3 d-flex align-items-center value-proposition__text">
                        <p className="rc-margin-bottom--none rc-intro">
                            <FormattedMessage id="home.convenientTip1" />
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                    <img
                        className="value-proposition__img"
                        src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw0093423f/homepage/delivery@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                        alt=""
                        title=""
                    />
                    <div className="pl-3 d-flex align-items-center value-proposition__text">
                        <p className="rc-margin-bottom--none rc-intro">
                            <FormattedMessage
                                id="home.convenientTip2"
                                values={{
                                    val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT)
                                }}
                            />
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                    <img
                        className="value-proposition__img"
                        src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw91a30682/homepage/question@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                        alt=""
                        title=""
                    />
                    <div className="pl-3 d-flex align-items-center value-proposition__text">
                        <p className="rc-margin-bottom--none rc-intro">
                            <FormattedMessage id="home.convenientTip3" />
                        </p>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        {
            en: (
                <>
                    <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                            <img
                                className="value-proposition__img lazyloaded"
                                data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0a2524e3/Homepage/CLUB-BENEFITS_PRODUCT-RECOS@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                                data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0a2524e3/Homepage/CLUB-BENEFITS_PRODUCT-RECOS@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0a2524e3/Homepage/CLUB-BENEFITS_PRODUCT-RECOS@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                                alt="ideal formula"
                                title="ideal formula"
                                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0a2524e3/Homepage/CLUB-BENEFITS_PRODUCT-RECOS@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0a2524e3/Homepage/CLUB-BENEFITS_PRODUCT-RECOS@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                                src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0a2524e3/Homepage/CLUB-BENEFITS_PRODUCT-RECOS@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                            />
                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">
                                    Find the Ideal Formula for Your Pet’s Health
                  </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xxl-3 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                            <img
                                className="value-proposition__img lazyloaded"
                                data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwc5a22147/Homepage/CLUB-BENEFITS_DISCOUNT@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                                data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwc5a22147/Homepage/CLUB-BENEFITS_DISCOUNT@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwc5a22147/Homepage/CLUB-BENEFITS_DISCOUNT@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                                alt="club benefits"
                                title="club benefits"
                                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwc5a22147/Homepage/CLUB-BENEFITS_DISCOUNT@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwc5a22147/Homepage/CLUB-BENEFITS_DISCOUNT@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                                src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwc5a22147/Homepage/CLUB-BENEFITS_DISCOUNT@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                            />
                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">
                                    Save 5% on Every Autoship Order Plus, 30% Off Your First Order
                                    Through Royal Canin Club
                  </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                            <img
                                className="value-proposition__img lazyloaded"
                                data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0e710f21/Homepage/CLUB-BENEFITS_WELCOME-BOX@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                                data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0e710f21/Homepage/CLUB-BENEFITS_WELCOME-BOX@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0e710f21/Homepage/CLUB-BENEFITS_WELCOME-BOX@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                                alt="Welcome Box"
                                title="Welcome Box"
                                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0e710f21/Homepage/CLUB-BENEFITS_WELCOME-BOX@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0e710f21/Homepage/CLUB-BENEFITS_WELCOME-BOX@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                                src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0e710f21/Homepage/CLUB-BENEFITS_WELCOME-BOX@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                            />
                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">
                                    Receive a Specialty Welcome Box to Help Welcome Your New Pet
                    Home{' '}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xxl-3 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                            <img
                                className="value-proposition__img lazyloaded"
                                data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw647a8fe4/Homepage/CLUB-BENEFITS_FREE-SHIPPING@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                                data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw647a8fe4/Homepage/CLUB-BENEFITS_FREE-SHIPPING@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw647a8fe4/Homepage/CLUB-BENEFITS_FREE-SHIPPING@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                                alt="Free Automatic Shipping"
                                title="Free Automatic Shipping"
                                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw647a8fe4/Homepage/CLUB-BENEFITS_FREE-SHIPPING@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw647a8fe4/Homepage/CLUB-BENEFITS_FREE-SHIPPING@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                                src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw647a8fe4/Homepage/CLUB-BENEFITS_FREE-SHIPPING@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                            />
                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">
                                    Free Automatic Shipping
                  </p>
                            </div>
                        </div>
                    </div>
                </>
            ),
            fr: (
                <>
                    <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                            <img
                                className="value-proposition__img"
                                src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3206e904/homepage/pack@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                                alt=""
                                title=""
                            />
                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">
                                    <FormattedMessage id="home.convenientTip1" />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                            <img
                                className="value-proposition__img"
                                src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw3df20153/Homepage/autoship@2x.png?sw=90&sh=90&sm=cut&sfrm=png"
                                alt=""
                                title=""
                            />
                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">
                                    Bénéficiez d'une livraison automatique
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                            <img
                                className="value-proposition__img"
                                src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw0093423f/homepage/delivery@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                                alt=""
                                title=""
                            />
                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">
                                    <FormattedMessage
                                        id="home.convenientTip2"
                                        values={{
                                            val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT)
                                        }}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xxl-3 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                            <img
                                className="value-proposition__img"
                                src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw91a30682/homepage/question@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                                alt=""
                                title=""
                            />
                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">
                                    <FormattedMessage id="home.convenientTip3" />
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )
        }[process.env.REACT_APP_LANG] || defaultJSX
    );
}