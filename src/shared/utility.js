export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;

    if(!rules){
      return true;
    }

    if(rules.validation.required){
        isValid = value.trim() !== "" && isValid;
    }

    if(rules.validation.minLength){
      isValid = value.length >= rules.validation.minLength && isValid;
    }

    if(rules.validation.maxLength){
      isValid = value.length <= rules.validation.maxLength && isValid;
    }

    return isValid;
  }