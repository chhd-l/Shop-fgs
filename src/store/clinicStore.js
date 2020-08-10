import { action, observable, computed, runInAction } from "mobx";
import store from 'storejs'

class ClinicStore {
  @observable linkClinicId = store.get(`rc-clinic-id-link`) || ''
  @observable linkClinicName = store.get(`rc-clinic-name-link`) || ''

  @observable selectClinicId = store.get(`rc-clinic-id-select`) || ''
  @observable selectClinicName = store.get(`rc-clinic-name-select`) || ''

  @observable defaultClinicId = store.get(`rc-clinic-id-default`) || ''
  @observable defaultClinicName = store.get(`rc-clinic-name-default`) || ''

  @observable clinicRecoCode = store.get(`rc-clinic-reco-code`) || ''

  @computed get clinicId () {
    return this.linkClinicId || this.selectClinicId || this.defaultClinicId
  }
  @computed get clinicName () {
    return this.linkClinicName || this.selectClinicName || this.defaultClinicName
  }

  @action.bound
  setLinkClinicId (data) {
    this.linkClinicId = data
    store.set(`rc-clinic-id-link`, data)
  }

  @action.bound
  setLinkClinicName (data) {
    this.linkClinicName = data
    store.set(`rc-clinic-name-link`, data)
  }

  @action.bound
  removeLinkClinicId () {
    this.linkClinicId = ''
    store.remove(`rc-clinic-id-link`)
  }

  @action.bound
  removeLinkClinicName () {
    this.linkClinicName = ''
    store.remove(`rc-clinic-name-link`)
  }

  @action.bound
  setSelectClinicId (data) {
    this.linkClinicId = data
    store.set(`rc-clinic-id-select`, data)
  }

  @action.bound
  setSelectClinicName (data) {
    this.linkClinicName = data
    store.set(`rc-clinic-name-select`, data)
  }

  @action.bound
  setDefaultClinicId (data) {
    this.linkClinicId = data
    store.set(`rc-clinic-id-default`, data)
  }

  @action.bound
  setDefaultClinicName (data) {
    this.linkClinicName = data
    store.set(`rc-clinic-name-default`, data)
  }

  @action.bound
  setClinicRecoCode (data) {
    this.clinicRecoCode = data
    store.set(`rc-clinic-reco-code`, data)
  }
}
export default ClinicStore;