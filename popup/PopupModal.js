import React from "react";
import Modal from "react-modal";
import "./Popup.scss";

/*
 * the popup dialoger core,
 * this module use the Modal library
 * the modal need a div appending to DOM to be rendered there
 * more read the https://www.npmjs.com/package/react-modal
 *
 */


let ModalContainer = document.createElement("div");
Modal.setAppElement(ModalContainer);

class PopupModal extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         modalIsOpen: true
      };
   }

   modalStyle = {
      content: {
         top: "50%",
         left: "50%",
         right: "auto",
         bottom: "auto",
         width: "400px",
         minWidth: "400px",
         minHeight: "140px",
         height: "auto",
         marginRight: "-50%",
         padding: "0",
         border: "0 solid #fff",
         borderRadius: "5px",
         transform: "translate(-50%, -50%)",
         boxShadow: "0 5px 20px rgba(0, 0, 0, .5)",
      }
   };

   handleCancel = (e) => {
      const onCancel = this.props.onCancel;
      onCancel && onCancel(e);
      this.closeModal();
   };

   handleOk = (e) => {
      const onOk = this.props.onOk;
      onOk && onOk(e) && this.closeModal();

   };

   openModal = () => {
      this.setState({modalIsOpen: true});
   };

   afterOpenModal = () => {
   };

   closeModal = () => {
      this.setState({modalIsOpen: false});
   };

   componentDidMount() {
   }

   componentWillReceiveProps(props) {
      props instanceof Object && props.hasOwnProperty("modalIsOpen") && this.setState({modalIsOpen: props.modalIsOpen});
   }

   render() {
      let content = this.modalStyle.content;
      content = {...content, ...this.props.style};
      const {icon, title, children, autoClose} = this.props;


      return (
         <Modal
            autoFocus={false}
            style={{content}}
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
         >
            <div className="dialog-container">
               <div className="dialog-header">
                  <span className={"famfamfam-silk " + (icon ? icon : "" )}></span>
                  <a>{title}</a>
               </div>
               <div className="dialog-content">
                  {children}
               </div>
               <div className="dialog-bottombar">
                  <a
                     className="dialog-bottombar-button"
                     onClick={this.handleCancel}>
                     {this.props.cancelText}
                  </a>
                  <a
                     className="dialog-bottombar-button"
                     onClick={this.handleOk}
                  >
                     {this.props.okText}
                  </a>
               </div>
            </div>
         </Modal>
      );
   }
}

export {PopupModal, ModalContainer} ;
