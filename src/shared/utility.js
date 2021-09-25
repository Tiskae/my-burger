export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};

export const checkValidity = (value, rules) => {
    // if (!rules) return;
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== "" && isValid;
    }

    if (rules.isEmail) {
        const pattern =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.minLength) {
        isValid = value.trim().length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.trim().length <= rules.maxLength && isValid;
    }

    return isValid;
};
