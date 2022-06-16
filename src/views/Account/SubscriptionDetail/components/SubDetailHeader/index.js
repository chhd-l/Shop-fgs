import React, { useEffect, useState, createContext } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import ChangeProduct from '../ChangeProduct';
import LinkPet from './LinkPet';
import { filterOrderId, getClubLogo, formatDate } from '@/utils/utils';
import Cat from '@/assets/images/cat.png';
import Dog from '@/assets/images/dog.png';
import { getDictionary } from '@/utils/utils';

const sessionItemRoyal = window.__.sessionItemRoyal;
export const SubDetailHeaderContext = createContext();

const StatusText = ({ subDetail }) => {
  return subDetail.subscribeId ? (
    <span
      className="ml-2"
      style={{
        fontSize: '.875rem'
      }}
    >
      {subDetail.subscribeStatus === 'ACTIVE' ? (
        <span
          className="px-1 rounded-sm"
          style={{
            background: '#E0F3D4',
            color: '#47B700'
          }}
        >
          <FormattedMessage id="active" />
        </span>
      ) : subDetail.subscribeStatus === 'PAUSE' ? (
        <span
          className="px-1 rounded-sm"
          style={{
            background: '#FCEBD4',
            color: '#ED8A00'
          }}
        >
          <FormattedMessage id="paused" />
        </span>
      ) : (
        <span
          className="px-1 rounded-sm"
          style={{
            background: '#FCEBD4',
            color: '#ED8A00'
          }}
        >
          <FormattedMessage id="inactive" />
        </span>
      )}
    </span>
  ) : null;
};
const SubDetailHeader = ({
  triggerShowAddNewPet,
  subDetail,
  initPage,
  history,
  getDetail,
  isShowClub,
  productListLoading,
  intl,
  triggerShowChangeProduct,
  petType,
  setState,
  currentChangeProductIdx
}) => {
  const isNotInactive = subDetail.subscribeStatus !== 'INACTIVE';
  let petsInfo = subDetail.petsInfo;
  //plan同时存在goodsCategory为dog和cat的商品，不展示新增情况
  let isCatAndDog = petsInfo?.petsType === 'CatAndDog';
  let isAutoshipAndClub =
    subDetail.subscriptionType?.match(/autoship_club/i)?.index > -1;
  let isCantLinkPet = isAutoshipAndClub || isCatAndDog;
  const [catBreedList, setCatBreedList] = useState([]);
  const [dogBreedList, setDogBreedList] = useState([]);
  useEffect(() => {
    getBreedList();
  }, []);
  const getBreedList = () => {
    getDictionary({ type: 'catBreed' }).then((res) => {
      setCatBreedList(res);
    });
    getDictionary({ type: 'dogBreed' }).then((res) => {
      setDogBreedList(res);
    });
  };
  const getBreedName = (petsType, petsBreed) => {
    let name =
      petsType?.toLowerCase() === 'dog'
        ? dogBreedList.length &&
          dogBreedList.filter((item) => item.valueEn == petsBreed)?.[0]?.name
        : catBreedList.length &&
          catBreedList.filter((item) => item.valueEn == petsBreed)?.[0]?.name;
    return name || intl.messages['Mixed Breed'];
  };
  let petBreed = getBreedName(petsInfo?.petsType, petsInfo?.petsBreed);
  const showAddNewPet = () => {
    setState({ triggerShowAddNewPet: true });
  };
  const propsObj = {
    isShowClub,
    subDetail,
    setState,
    triggerShowChangeProduct,
    getDetail,
    productListLoading,
    currentChangeProductIdx
  };
  return (
    <div className="d-flex align-items-center flex-wrap my-4 md:mt-0">
      <LinkPet
        petType={petType}
        getBreedName={getBreedName}
        setState={setState}
        initPage={initPage}
        subDetail={subDetail}
        history={history}
        triggerShowAddNewPet={triggerShowAddNewPet}
      />
      <SubDetailHeaderContext.Provider value={propsObj}>
        <ChangeProduct />
      </SubDetailHeaderContext.Provider>

      {/* 未激活的情况下不展示club相关信息 */}
      {isShowClub && isNotInactive && !isCantLinkPet ? (
        <>
          <img
            src={getClubLogo({ subscriptionType: subDetail.subscriptionType })}
            style={{ maxWidth: '100px' }}
            alt="club Icon"
          />
          <div className="d-flex align-items-center add-pet-btn-wrap">
            {subDetail.petsId ? (
              <React.Fragment>
                {/* {subDetail.subscriptionType == 'Individualization' ? (
                  <div className="rc-md-up">
                    <div className="rc-margin-x--xs"></div>
                  </div>
                ) : ( */}
                <img
                  style={{ marginLeft: '1rem', marginRight: '1rem' }}
                  className="pet-img text-center"
                  alt="pet img"
                  src={
                    (petsInfo?.petsImg && petsInfo.petsImg.includes('https')
                      ? petsInfo.petsImg
                      : null) || (petsInfo?.petsType === 'cat' ? Cat : Dog)
                  }
                />
                {/* )} */}

                <div className="rc-md-down">
                  <StatusText subDetail={subDetail} />
                </div>
                <div
                  className="rc-md-down"
                  style={{ color: 'rgb(226, 0, 26)' }}
                >
                  {petsInfo?.petsName}
                </div>
                <Link
                  className="rc-md-down rc-margin-y--sm"
                  onClick={() => {
                    sessionItemRoyal.set(
                      'rc-subdetailInfo',
                      JSON.stringify({
                        isFromSubscriptionDetail:
                          subDetail.goodsInfo?.length == 1, //新增的宠物绑定club，如果club商品大于1个就不展示弹窗
                        subscribeId: subDetail.subscribeId
                      })
                    );
                  }}
                  to={{
                    pathname: `/account/pets/petForm/${subDetail.petsId}`
                    // state: {
                    //   isFromSubscriptionDetail:
                    //     subDetail.goodsInfo?.length == 1, //新增的宠物绑定club，如果club商品大于1个就不展示痰喘
                    //   isFromSubscriptionDetail: true,
                    //   subscribeId: subDetail.subscribeId
                    // }
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
                      {subDetail.subscriptionType == 'club' ? (
                        <FormattedMessage id="subscriptionDetail.clubFor" />
                      ) : null}
                      {petsInfo?.petsName}
                    </h4>
                    <div>
                      {subDetail.subscriptionType == 'Individualization' ? (
                        // 'Date of birth'
                        <FormattedMessage id="dateOfBirth" />
                      ) : (
                        <FormattedMessage id="age" />
                      )}
                      :
                      <strong>
                        {' '}
                        {formatDate({ date: petsInfo?.birthOfPets })}
                      </strong>
                    </div>
                  </div>
                  <div className="rc-padding-right--md">
                    <Link
                      onClick={() => {
                        sessionItemRoyal.set(
                          'rc-subdetailInfo',
                          JSON.stringify({
                            isFromSubscriptionDetail:
                              subDetail.goodsInfo?.length == 1, //新增的宠物绑定club，如果club商品大于1个就不展示痰喘
                            subscribeId: subDetail.subscribeId
                          })
                        );
                      }}
                      className="rc-md-up"
                      to={{
                        pathname: `/account/pets/petForm/${subDetail.petsId}`
                        // state: {
                        //   isFromSubscriptionDetail:
                        //     subDetail.goodsInfo?.length == 1, //新增的宠物绑定club，如果club商品大于1个就不展示痰喘
                        //   isFromSubscriptionDetail: true,
                        //   subscribeId: subDetail.subscribeId
                        // }
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
                />
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
          {subDetail.subscriptionType?.toLowerCase().includes('club') && (
            // window.__.env.REACT_APP_COUNTRY == 'ru' &&
            <img
              src={getClubLogo({
                subscriptionType: subDetail.subscriptionType
              })}
              style={{ maxWidth: '100px', marginRight: '10px' }}
              alt="club Icon"
            />
          )}
          <h4
            className="rc-delta font-weight-normal mb-2"
            style={{ color: '#666' }}
          >
            {subDetail.subscribeId ? (
              <span>
                {filterOrderId({
                  orderNo: subDetail.subscribeId
                })}
              </span>
            ) : null}
            <StatusText subDetail={subDetail} />
          </h4>
        </>
      )}
    </div>
  );
};
export default injectIntl(SubDetailHeader);
