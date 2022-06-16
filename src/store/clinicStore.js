import { action, observable, computed, runInAction } from 'mobx';

const localItemRoyal = window.__.localItemRoyal;

class ClinicStore {
  //通过推荐链接进来的推荐者信息
  @observable linkClinicId = localItemRoyal.get(`rc-clinic-id-link`) || ''; //推荐者主键id
  @observable linkClinicRecommendationInfos =
    localItemRoyal.get(`rc-clinic-recommendationInfos`) || '';
  @observable linkClinicName = localItemRoyal.get(`rc-clinic-name-link`) || '';
  @observable linkClinicCode = localItemRoyal.get(`rc-clinic-code-link`) || ''; //recommendationCode

  //用户自己选择的诊所信息
  @observable selectClinicId = localItemRoyal.get(`rc-clinic-id-select`) || '';
  @observable selectClinicName =
    localItemRoyal.get(`rc-clinic-name-select`) || '';
  @observable selectClinicCode =
    localItemRoyal.get(`rc-clinic-code-select`) || ''; //recommendationCode

  //my account页面的默认clinic信息，通过登录接口获取后存入localStorage
  @observable defaultClinicId =
    localItemRoyal.get(`rc-clinic-id-default`) || '';
  @observable defaultClinicName =
    localItemRoyal.get(`rc-clinic-name-default`) || '';
  @observable defaultClinicCode =
    localItemRoyal.get(`rc-clinic-code-default`) || ''; //recommendationCode

  // 店铺是否能作为审核者
  @observable linkedAuditAuthorityFlag =
    localItemRoyal.get(`rc-linkedAuditAuthorityFlag`) || '';

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

  //linkClinicInfo赋值
  @action.bound
  setLinkClinicId(data) {
    this.linkClinicId = data;
    localItemRoyal.set(`rc-clinic-id-link`, data);
  }
  @action.bound
  setLinkClinicName(data) {
    this.linkClinicName = data;
    localItemRoyal.set(`rc-clinic-name-link`, data);
  }
  @action.bound
  setLinkClinicCode(data) {
    this.linkClinicCode = data;
    localItemRoyal.set(`rc-clinic-code-link`, data);
  }
  //清除推荐者linkClinic缓存
  @action.bound
  removeLinkClinicInfo() {
    this.linkClinicId = '';
    this.linkClinicName = '';
    this.linkClinicCode = '';
    localItemRoyal.remove(`rc-clinic-id-link`);
    localItemRoyal.remove(`rc-clinic-name-link`);
    localItemRoyal.remove(`rc-clinic-code-link`);
  }

  @action.bound
  setLinkClinicRecommendationInfos(data) {
    this.linkClinicRecommendationInfos = data;
    localItemRoyal.set(`rc-clinic-recommendationInfos`, data);
  }
  @action.bound
  removeLinkClinicRecommendationInfos() {
    this.linkClinicRecommendationInfos = '';
    localItemRoyal.remove(`rc-clinic-recommendationInfos`);
  }

  //selectClinicInfo赋值
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
  setSelectClinicCode(data) {
    this.selectClinicCode = data;
    localItemRoyal.set(`rc-clinic-code-select`, data);
  }
  @action.bound
  removeSelectClinicInfo() {
    this.selectClinicId = '';
    this.selectClinicName = '';
    this.selectClinicCode = '';
    localItemRoyal.remove(`rc-clinic-id-select`);
    localItemRoyal.remove(`rc-clinic-name-select`);
    localItemRoyal.remove(`rc-clinic-code-select`);
  }

  //defaultClinicInfo赋值
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
  setDefaultClinicCode(data) {
    this.defaultClinicCode = data;
    localItemRoyal.set(`rc-clinic-code-default`, data);
  }
  @action.bound
  removeDefaultClinicInfo() {
    this.defaultClinicId = '';
    this.defaultClinicName = '';
    this.defaultClinicCode = '';
    localItemRoyal.remove(`rc-clinic-id-default`);
    localItemRoyal.remove(`rc-clinic-name-default`);
    localItemRoyal.remove(`rc-clinic-code-default`);
  }
}
export default ClinicStore;
