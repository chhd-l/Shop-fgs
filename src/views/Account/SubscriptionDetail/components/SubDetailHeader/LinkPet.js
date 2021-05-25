import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocalStore } from 'mobx-react';
import Modal from '@/components/Modal';
import stores from '@/store';
import { Link } from 'react-router-dom';
import ShowErrorDom from '../ShowErrorDom';
import Banner_Cat from '../../../PetForm/images/banner_Cat.jpg';
import Banner_Dog from '../../../PetForm/images/banner_Dog.jpg';
import Female from '@/assets/images/female.png';
import Male from '@/assets/images/male.png';
import Cat from '@/assets/images/cat.png';
import Dog from '@/assets/images/dog.png';
import { getPetList } from '@/api/pet';
import { changeSubscriptionDetailPets } from '@/api/subscription';
const LinkPet = ({
  triggerShowAddNewPet,
  setState,
  getBreedName,
  subDetail,
  initPage,
  petType,
  history
}) => {
  const { loginStore } = useLocalStore(() => stores);
  const { userInfo } = loginStore;
  const [petList, setPetList] = useState([]);
  const [addNewPetVisible, setAddNewPetVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  let petsInfo = subDetail?.petsInfo;
  let timer = null;
  let petsType = petsInfo?.petsType;
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
        initPage();
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
        <ShowErrorDom errorMsg={errorMsg} />
        <div className="rc-padding-x--md" style={{ maxHeight: '80vh' }}>
          <div className="pets-list-wrap">
            {petList.map((el) => (
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
                    alt="pet img"
                    className="pet-img"
                  />
                  <img
                    style={{
                      width: '1.25rem',
                      position: 'absolute',
                      bottom: 0,
                      right: 0
                    }}
                    src={!el.petsSex ? Male : Female}
                    alt="pet sex icon"
                  />
                </div>
                <div style={{ paddingLeft: '1rem' }}>
                  <div style={{ color: '#e2001a' }}>{el.petsName}</div>
                  <div>{getBreedName(el.petsType, el.petsBreed)}</div>
                </div>
              </div>
            ))}
            <Link
              to={{
                pathname: `/account/pets/petForm`,
                state: {
                  isFromSubscriptionDetail: subDetail.goodsInfo?.length == 1, //新增的宠物绑定club，如果club商品大于1个就不展示痰喘
                  petsType: petType,
                  subscribeId: subDetail.subscribeId
                }
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
