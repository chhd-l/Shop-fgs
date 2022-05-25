import Vconsole from 'vconsole';

let vConsole;
if (process.env.NODE_ENV === 'production' && window.__.env.REACT_APP_VCONSOLE) {
  vConsole = new Vconsole();
}
export default vConsole;
