import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import { Link } from 'react-router-dom';
import LinkPet from './LinkPet';
import { filterOrderId, getClubLogo } from '@/utils/utils';
import Cat from '@/assets/images/cat.png';
import Dog from '@/assets/images/dog.png';
const StatusText = ({ subDetail }) => {
  return subDetail.subscribeId ? (
    subDetail.subscribeStatus === '0' ? (
      <span
        style={{
          background: '#E0F3D4',
          color: '#47B700',
          fontSize: '.875rem',
          padding: '0 5px',
          marginLeft: '.625rem'
        }}
      >
        <FormattedMessage id="active" />
      </span>
    ) : subDetail.subscribeStatus === '1' ? (
      <span
        style={{
          background: '#FCEBD4',
          color: '#ED8A00',
          fontSize: '.875rem',
          padding: '0 5px'
        }}
      >
        <FormattedMessage id="paused" />
      </span>
    ) : (
      <span
        style={{
          background: '#FCEBD4',
          color: '#ED8A00',
          fontSize: '.875rem',
          padding: '0 5px'
        }}
      >
        <FormattedMessage id="inactive" />
      </span>
    )
  ) : null;
};
const SubDetailHeader = ({
  triggerShowAddNewPet,
  getBreedName,
  subDetail,
  initPage,
  history,
  isClub,
  editRecommendationVisible,
  recommendationVisibleLoading,
  isActive,
  isNotInactive,
  setState
}) => {
  console.info('subDetail', subDetail);
  let petsInfo = subDetail.petsInfo;
  //plan同时存在goodsCategory为dog和cat的商品，不展示新增情况
  let isCatAndDog = petsInfo?.petsType === 'CatAndDog';
  let isAutoshipAndClub =
    subDetail.subscriptionType?.match(/autoship_club/i)?.index > -1;
  let isCantLinkPet = isAutoshipAndClub || isCatAndDog;
  let petBreed = getBreedName(petsInfo?.petsType, petsInfo?.petsBreed);
  const showAddNewPet = () => {
    setState({ triggerShowAddNewPet: true });
  };
  return (
    <div className="d-flex align-items-center align-items-center flex-wrap rc-margin-bottom--xs center-for-h5">
      <LinkPet
        getBreedName={getBreedName}
        setState={setState}
        initPage={initPage}
        subDetail={subDetail}
        history={history}
        triggerShowAddNewPet={triggerShowAddNewPet}
      />
      {subDetail.petsId &&
        isClub &&
        editRecommendationVisible &&
        (recommendationVisibleLoading ? (
          <div className="mt-4 1111" style={{ width: '100%' }}>
            <Skeleton color="#f5f5f5" width="100%" height="30%" count={2} />
          </div>
        ) : (
          <div className="recommendatio-wrap  rc-margin-bottom--sm rc-padding--sm">
            <p className="recommendatio-wrap-title">
              <FormattedMessage id="subscriptionDetail.newProduct" />
            </p>
            <div className="rc-outline-light rc-padding--sm recommendatio-wrap-content"></div>
          </div>
        ))}
      {/* 未激活的情况下不展示club相关信息 */}
      {(isClub && isActive) ||
      (isClub && isNotInactive && subDetail.petsId && !isCantLinkPet) ? (
        <>
          <img
            src={getClubLogo()}
            style={{ maxWidth: '100px' }}
            alt="club Icon"
          />
          <div className="d-flex align-items-center add-pet-btn-wrap">
            {subDetail.petsId ? (
              <React.Fragment>
                <img
                  style={{ marginLeft: '1rem', marginRight: '1rem' }}
                  className="pet-img text-center rc-margin-y--sm"
                  alt="pet img"
                  src={
                    (petsInfo?.petsImg && petsInfo.petsImg.includes('https')
                      ? petsInfo.petsImg
                      : null) || (petsInfo?.petsType === 'cat' ? Cat : Dog)
                  }
                />
                <div className="rc-md-down">
                  <StatusText subDetail={subDetail} />
                </div>
                <Link
                  className="rc-md-down rc-margin-y--sm"
                  to={{
                    pathname: `/account/pets/petForm/${subDetail.petsId}`,
                    state: {
                      isFromSubscriptionDetail: true,
                      subscribeId: subDetail.subscribeId
                    }
                  }}
                >
                  <div className="rc-styled-link">
                    <FormattedMessage id="subscriptionDetail.editPetProfile" />
                  </div>
                </Link>
                <div className="d-flex align-items-center">
                  <div className="rc-padding-right--md">
                    <h4
                      className="rc-md-up"
                      style={{ color: '#e2001a', margin: 0 }}
                    >
                      <FormattedMessage id="subscriptionDetail.clubFor" />{' '}
                      {petsInfo?.petsName}
                    </h4>
                    <div>
                      <FormattedMessage id="age" />:
                      <strong>
                        {' '}
                        {getFormatDate(petsInfo?.birthOfPets || '')}
                      </strong>
                    </div>
                  </div>
                  <div className="rc-padding-right--md">
                    <Link
                      className="rc-md-up"
                      to={{
                        pathname: `/account/pets/petForm/${subDetail.petsId}`,
                        state: {
                          isFromSubscriptionDetail: true,
                          subscribeId: subDetail.subscribeId
                        }
                      }}
                    >
                      <div className="rc-styled-link">
                        <FormattedMessage id="subscriptionDetail.editPetProfile" />
                      </div>
                    </Link>
                    <div>
                      <FormattedMessage id="breed" />:
                      <strong>{petBreed}</strong>{' '}
                    </div>
                  </div>
                  <div className="rc-padding-right--md">
                    <div className="rc-md-up" style={{ color: '#fff' }}>
                      {' '}
                      &nbsp:;
                    </div>
                    <div>
                      <FormattedMessage id="sterilized" />:{' '}
                      <strong>
                        {' '}
                        {petsInfo?.sterilized ? (
                          <FormattedMessage id="account.yes" />
                        ) : (
                          <FormattedMessage id="account.no" />
                        )}
                      </strong>
                    </div>
                  </div>
                  <div className="rc-md-up">
                    <div style={{ color: '#fff' }}> &nbsp:;</div>
                    <span>
                      <StatusText subDetail={subDetail} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div
                  className="pet-img add-pet-btn text-center"
                  onClick={showAddNewPet}
                ></div>
                <div>
                  <FormattedMessage id="subscriptionDetail.better" />
                  <div>
                    <span className="rc-styled-link" onClick={showAddNewPet}>
                      <FormattedMessage id="subscriptionDetail.link" />
                    </span>
                    <span className="mobile-block">
                      <StatusText subDetail={subDetail} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </>
      ) : (
        <>
          {subDetail.subscriptionType?.toLowerCase().includes('club') &&
            process.env.REACT_APP_COUNTRY == 'RU' && (
              <img
                src={getClubLogo()}
                style={{ maxWidth: '100px', marginRight: '10px' }}
                alt="club Icon"
              />
            )}
          <h4
            className="rc-delta font-weight-normal mb-2"
            style={{ color: '#666' }}
          >
            {subDetail.subscribeId ? (
              <span>{filterOrderId(subDetail.subscribeId)}</span>
            ) : null}
            <StatusText subDetail={subDetail} />
          </h4>
        </>
      )}
    </div>
  );
};
export default injectIntl(SubDetailHeader);
