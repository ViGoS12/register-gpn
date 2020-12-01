import { Component } from "react";

class InputComponent extends Component {
  setInvalid(inputField) {
    this.changeClass(inputField, "is-valid", "is-invalid");
  }

  setValid(inputField) {
    this.changeClass(inputField, "is-invalid", "is-valid");
  }

  setNeutral(inputField) {
    inputField.classList.remove("is-invalid");
    inputField.classList.remove("is-valid");
  }

  changeClass(element, oldClass, newClass) {
    try {
      element.classList.remove(oldClass);
      element.classList.add(newClass);
    } catch (e) {
      console.log("Exception [changeClass]", e);
    }
  }
}

export default InputComponent;
