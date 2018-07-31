import {PopupModal} from './PopupModal';
import confirm from './confirm';

/*
 * Open a popup dialoger,
 * popup call the same function confirm with different parameters
 * popup.info,popup.success,popup.error,popup.warning has some default parameters
 *
 * @modulename popup
 * @param {function} onOk : the function to be executed when click apply / OK ,required
 * @param {function} onCancel :the function to be executed when click cancel ,optional
 * @param {jsx} children : content to show when popup ,required
 * @param {string} title: popup title ,optional
 * @param {string} icon : popup title icon , famfamfamsilk icon name ,optional
 * @param {string} okText : the OK button text,optional
 * @param {string} cancelText :the cancel button text ,optional
 * @param {number} autoClose : the popup will close automaticly after the given time value ,ms, optional
 * @return {function}  the popup confirm with all those propperties
 */


let Popup = PopupModal;

Popup.open = function (props) {
   const config = {
      title: 'Confirm',
      icon: 'comment',
      okText: "Apply",
      cancelText: "Cancel",
      ...props,
   };
   return confirm(config);
};

export default Popup;
