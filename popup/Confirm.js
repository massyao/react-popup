import React from 'react';
import ReactDOM from 'react-dom';
import {PopupModal, ModalContainer} from './PopupModal';


/*
 * the popup dialoger core caller,
 * this function willreceive some props to open certain type of Moadl
 * details at Module popup's comment
 */

export default function confirm(config) {

   document.body.appendChild(ModalContainer);

   render({...config, modalIsOpen: true, close});

   return {
      destroy: close,
   };

   function close(...args) {
      if (!!ReactDOM.createPortal) {
         render({...config, close, modalIsOpen: false, afterClose: destroy.bind(this, ...args)});
      } else {
         destroy(...args);
      }
   }

   function destroy(...args) {
      const unmountResult = ReactDOM.unmountComponentAtNode(ModalContainer);
      if (unmountResult && ModalContainer.parentNode) {
         ModalContainer.parentNode.removeChild(ModalContainer);
      }
      const triggerCancel = args && args.length &&
         args.some(param => param && param.triggerCancel);
      if (config.onCancel && triggerCancel) {
         config.onCancel(...args);
      }
   }

   function render(props) {
      ReactDOM.render(<PopupModal {...props} />, ModalContainer);
   }

}
