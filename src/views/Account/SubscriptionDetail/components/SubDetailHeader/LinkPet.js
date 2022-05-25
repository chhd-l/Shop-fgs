import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useLocalStore } from 'mobx-react';
import Modal from '@/components/Modal';
import stores from '@/store';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '@/components/Message';
import Banner_Cat from '../../../PetForm/images/banner_Cat.jpg';
import Banner_Dog from '../../../PetForm/images/banner_Dog.jpg';
import Cat from '@/assets/images/cat.png';
import Dog from '@/assets/images/dog.png';
import { getPetList } from '@/api/pet';
import { changeSubscriptionDetailPets } from '@/api/subscription';
import cn from 'classnames';

const sessionItemRoyal = window.__.sessionItemRoyal;

const LinkPet = ({
  triggerShowAddNewPet,
  setState,
  getBreedName,
  subDetail,
  initPage,
  petType,
  history
}) => {
  console.info('.....................petType', petType);
  const { loginStore } = useLocalStore(() => stores);
  const { userInfo } = loginStore;
  const [petList, setPetList] = useState([]);
  const [addNewPetVisible, setAddNewPetVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  let timer = null;
  useEffect(() => {
    triggerShowAddNewPet && showAddNewPet();
  }, [triggerShowAddNewPet]);
  const closeAddNewPet = () => {
    setState({ triggerShowAddNewPet: false });
    setAddNewPetVisible(false);
  };
  const showAddNewPet = async () => {
    if (!userInfo.customerAccount) {
      return false;
    }
    setState({ loadingPage: true });
    getPetList({
      petsType: petType,
      customerId: userInfo.customerId,
      consumerAccount: userInfo.customerAccount
    })
      .then((res) => {
        let petsList = res.context.context || [];
        let petList =
          petsList?.filter(
            (el) => el.petsType?.match(eval('/' + petType + '/i'))?.index > -1
          ) || [];
        setPetList(petList);
        setAddNewPetVisible(true);
      })
      .catch((err) => {
        console.info(err);
        setErrorMsg(err && err.message);
      })
      .finally(() => {
        setState({ loadingPage: false });
      });
  };

  const linkPets = async (petsId) => {
    closeAddNewPet();
    setState({ loadingPage: true });
    let { subscribeId } = subDetail;
    try {
      let param = {
        subscribeId,
        petsId
      };
      let res = await changeSubscriptionDetailPets(param);
      let newSubscribeId = res.context;
      if (newSubscribeId === subscribeId) {
        initPage(true);
      } else {
        history.push(`/account/subscription/order/detail/${newSubscribeId}`);
      }
    } catch (err) {
      setErrorMsg(err.message);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setErrorMsg('');
      }, 3000);
    } finally {
      setState({ loadingPage: false });
    }
  };
  return (
    <div className="add-new-cat-modal">
      <Modal
        headerVisible={true}
        footerVisible={false}
        visible={addNewPetVisible}
        modalTitle={<FormattedMessage id="subscriptionDetail.linkProfile" />}
        close={closeAddNewPet}
      >
        <ErrorMessage msg={errorMsg} />
        <div className="rc-padding-x--md" style={{ maxHeight: '80vh' }}>
          <div className="pets-list-wrap">
            {petList
              .filter(
                (el) => !(el.sourceType == 1 || el.sourceType == 'individual')
              )
              .map((el) => (
                <div
                  onClick={(e) => {
                    linkPets(el.petsId);
                  }}
                  className=" border-solid d-flex pets-list-item align-items-center"
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      alt={el.petsName}
                      src={
                        (el.petsImg && el.petsImg.includes('https')
                          ? el.petsImg
                          : null) || (el.petsType === 'cat' ? Cat : Dog)
                      }
                      className="pet-img"
                    />
                    <span
                      className={cn(
                        'iconfont',
                        el.petsSex ? 'iconfemale' : 'iconmale'
                      )}
                      style={{ color: '#666' }}
                    />
                  </div>
                  <div style={{ paddingLeft: '1rem' }}>
                    <div style={{ color: '#e2001a' }}>{el.petsName}</div>
                    <div>{getBreedName(el.petsType, el.petsBreed)}</div>
                  </div>
                </div>
              ))}
            <Link
              onClick={() => {
                sessionItemRoyal.set(
                  'rc-subdetailInfo',
                  JSON.stringify({
                    isFromSubscriptionDetail: subDetail.goodsInfo?.length == 1, //新增的宠物绑定club，如果club商品大于1个就不展示痰喘
                    petsType: petType,
                    subscribeId: subDetail.subscribeId
                  })
                );
              }}
              to={{
                pathname: `/account/pets/petForm`
                // state: {
                //   isFromSubscriptionDetail: subDetail.goodsInfo?.length == 1, //新增的宠物绑定club，如果club商品大于1个就不展示痰喘
                //   petsType: petType,
                //   subscribeId: subDetail.subscribeId
                // }
              }}
            >
              <div
                style={{ paddingLeft: '2rem' }}
                className="border-dot height100 align-items-center d-flex"
              >
                <div>
                  +{' '}
                  <strong>
                    {petType == 'Cat' ? (
                      <FormattedMessage id="subscriptionDetail.addNewCat" />
                    ) : (
                      <FormattedMessage id="subscriptionDetail.addNewDog" />
                    )}
                  </strong>
                </div>
                <img
                  style={{ paddingLeft: '2rem' }}
                  className="pet-icon"
                  src={petType == 'Cat' ? Banner_Cat : Banner_Dog}
                />
              </div>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default LinkPet;
