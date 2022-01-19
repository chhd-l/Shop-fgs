import Vconsole from 'vconsole';

let vConsole;
if (window.__.env.REACT_APP_VCONSOLE) {
  vConsole = new Vconsole();
}
export default vConsole;
