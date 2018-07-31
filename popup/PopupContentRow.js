import React from "react";
import getUUID from "../../common/Util/getUUID";
import "./Popup.scss";

/*
 * the popup dialoger content,
 * the content use  bootstrap container-fluid to contain its children of rows
 * each row contains a label and a input/select/paintext
 *
 * @modulename PopupContentRow
 * @param {string} contentType :input , select or paintext
 * @param {string} name : a name that will be used as inner & outer state name ,and label/input/select's ID
 * @param {string} labelName :a name displayed at the left
 * @param {string} inputType: text, password ,button ,chexkbox etc, if the content is input
 * @param {Array}  optionsArr : the select option array ,each element is an Object with property of value & content
 * @return {jsx}  PopupContentRow module
 */


class PopupContentRow extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         [props.name]: props.defaultValue || ""
      };
   }

   changeHandler = (evt) => {
      this.setState({
         [evt.target.name]: evt.target.value
      });
      this.props.changeHandler(evt);
   };


   render() {

      const {contentType, name, inputType, autoFocus, labelName, optionsArr = [], plainText} = this.props;
      const rowID = "" + name + getUUID();

      let inputContent = (
         <div className="col-xs-6">
            <input
               autoFocus={autoFocus || false}
               type={inputType}
               id={rowID}
               name={name}
               value={this.state[name]}
               onChange={this.changeHandler}
            />
         </div>
      );

      let selectContent = (
         <div className="col-xs-6">
            <select name={name} value={this.state[name]} onChange={this.changeHandler}>
               {
                  optionsArr.map((optionObj, index) =>
                     <option key={rowID + index} value={optionObj.value}>{optionObj.content}</option>
                  )
               }
            </select>
         </div>
      );

      let htmlContent = plainText;

      let content = (() => {
         switch (contentType) {
            case "input":
               return inputContent;
            case "select":
               return selectContent;
            case "plaintext":
               return htmlContent;
            default :
               return inputContent;
         }
      })(contentType);

      return (

         <div className="row popup-row">
            <div className="col-xs-6">
               <label htmlFor={rowID}>{labelName + ":"}</label>
            </div>
            {content}
         </div>
      );
   }
}

export default PopupContentRow;