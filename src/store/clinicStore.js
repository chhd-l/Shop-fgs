import { action, observable, computed, runInAction } from "mobx";

const localItemRoyal = window.__.localItemRoyal;

class ClinicStore {
  @observable linkClinicId = localItemRoyal.get(`rc-clinic-id-link`) || ''
  @observable linkClinicName = localItemRoyal.get(`rc-clinic-name-link`) || ''

  @observable selectClinicId = localItemRoyal.get(`rc-clinic-id-select`) || ''
  @observable selectClinicName = localItemRoyal.get(`rc-clinic-name-select`) || ''

  @observable defaultClinicId = localItemRoyal.get(`rc-clinic-id-default`) || ''
  @observable defaultClinicName = localItemRoyal.get(`rc-clinic-name-default`) || ''

  @observable clinicRecoCode = localItemRoyal.get(`rc-clinic-reco-code`) || ''

  @computed get clinicId () {
    return this.linkClinicId || this.selectClinicId || this.defaultClinicId
  }
  @computed get clinicName () {
    return this.linkClinicName || this.selectClinicName || this.defaultClinicName
  }

  @action.bound
  setLinkClinicId (data) {
    this.linkClinicId = data
    localItemRoyal.set(`rc-clinic-id-link`, data)
  }

  @action.bound
  setLinkClinicName (data) {
    this.linkClinicName = data
    localItemRoyal.set(`rc-clinic-name-link`, data)
  }

  @action.bound
  removeLinkClinicId () {
    this.linkClinicId = ''
    localItemRoyal.remove(`rc-clinic-id-link`)
  }

  @action.bound
  removeLinkClinicName () {
    this.linkClinicName = ''
    localItemRoyal.remove(`rc-clinic-name-link`)
  }

  @action.bound
  setSelectClinicId (data) {
    this.selectClinicId = data
    localItemRoyal.set(`rc-clinic-id-select`, data)
  }

  @action.bound
  setSelectClinicName (data) {
    this.selectClinicName = data
    localItemRoyal.set(`rc-clinic-name-select`, data)
  }

  @action.bound
  setDefaultClinicId (data) {
    this.defaultClinicId = data
    localItemRoyal.set(`rc-clinic-id-default`, data)
  }

  @action.bound
  setDefaultClinicName (data) {
    this.defaultClinicName = data
    localItemRoyal.set(`rc-clinic-name-default`, data)
  }

  @action.bound
  setClinicRecoCode (data) {
    this.clinicRecoCode = data
    localItemRoyal.set(`rc-clinic-reco-code`, data)
  }
}
export default ClinicStore;