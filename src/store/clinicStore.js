import { action, observable, computed, runInAction } from 'mobx';

const localItemRoyal = window.__.localItemRoyal;

class ClinicStore {
  //通过推荐链接进来的推荐者信息
  @observable linkClinicId = localItemRoyal.get(`rc-clinic-id-link`) || ''; //推荐者主键id
  @observable linkClinicRecommendationInfos =
    localItemRoyal.get(`rc-clinic-recommendationInfos`) || '';
  @observable linkClinicName = localItemRoyal.get(`rc-clinic-name-link`) || '';

  //用户自己选择的诊所信息
  @observable selectClinicId = localItemRoyal.get(`rc-clinic-id-select`) || '';
  @observable selectClinicName =
    localItemRoyal.get(`rc-clinic-name-select`) || '';

  //my account页面的默认clinic信息，通过登录接口获取后存入localStorage
  @observable defaultClinicId =
    localItemRoyal.get(`rc-clinic-id-default`) || '';
  @observable defaultClinicName =
    localItemRoyal.get(`rc-clinic-name-default`) || '';

  // 店铺是否能作为审核者
  @observable linkedAuditAuthorityFlag =
    localItemRoyal.get(`rc-linkedAuditAuthorityFlag`) || '';

  @observable clinicRecoCode = localItemRoyal.get(`rc-clinic-reco-code`) || '';

  @computed get clinicId() {
    return this.selectClinicId || this.linkClinicId || this.defaultClinicId;
  }
  @computed get clinicRecommendationInfos() {
    return this.linkClinicRecommendationInfos;
  }
  @computed get clinicName() {
    return (
      this.selectClinicName || this.linkClinicName || this.defaultClinicName
    );
  }

  @action.bound
  setAuditAuthority(data) {
    this.linkedAuditAuthorityFlag = data;
    localItemRoyal.set(`rc-linkedAuditAuthorityFlag`, data);
  }

  @action.bound
  removeAuditAuthority(data) {
    this.linkedAuditAuthorityFlag = '';
    localItemRoyal.remove(`rc-linkedAuditAuthorityFlag`);
  }

  @action.bound
  setLinkClinicId(data) {
    this.linkClinicId = data;
    localItemRoyal.set(`rc-clinic-id-link`, data);
  }
  @action.bound
  setLinkClinicRecommendationInfos(data) {
    this.linkClinicRecommendationInfos = data;
    localItemRoyal.set(`rc-clinic-recommendationInfos`, data);
  }

  @action.bound
  setLinkClinicName(data) {
    this.linkClinicName = data;
    localItemRoyal.set(`rc-clinic-name-link`, data);
  }

  @action.bound
  removeLinkClinicId() {
    this.linkClinicId = '';
    localItemRoyal.remove(`rc-clinic-id-link`);
  }
  @action.bound
  removeLinkClinicRecommendationInfos() {
    this.linkClinicRecommendationInfos = '';
    localItemRoyal.remove(`rc-clinic-recommendationInfos`);
  }

  @action.bound
  removeLinkClinicName() {
    this.linkClinicName = '';
    localItemRoyal.remove(`rc-clinic-name-link`);
  }

  @action.bound
  setSelectClinicId(data) {
    this.selectClinicId = data;
    localItemRoyal.set(`rc-clinic-id-select`, data);
  }

  @action.bound
  setSelectClinicName(data) {
    this.selectClinicName = data;
    localItemRoyal.set(`rc-clinic-name-select`, data);
  }

  @action.bound
  setDefaultClinicId(data) {
    this.defaultClinicId = data;
    localItemRoyal.set(`rc-clinic-id-default`, data);
  }

  @action.bound
  setDefaultClinicName(data) {
    this.defaultClinicName = data;
    localItemRoyal.set(`rc-clinic-name-default`, data);
  }

  @action.bound
  setClinicRecoCode(data) {
    this.clinicRecoCode = data;
    localItemRoyal.set(`rc-clinic-reco-code`, data);
  }
}
export default ClinicStore;
