// utils/validators.js

export const isRequired = (value) =>
    value ? '' : 'This field is required';

export const isValidEmail = (value) =>
    /^\S+@\S+\.\S+$/.test(value) ? '' : 'Invalid email address';

export const isNumber = (value) =>
    value && !isNaN(value) ? '' : 'Please enter a valid number';

export const minLength = (len) => (value) =>
    value.length >= len ? '' : `Minimum ${len} characters required`;

export const maxLength = (len) => (value) =>
    value.length <= len ? '' : `Maximum ${len} characters allowed`;

// Phone validation
export const isValidPhone = (value) => {
    if (!value) return '';
    const regex = /^[0-9]{7,15}$/;
    if (!regex.test(value)) {
        return 'Please enter a valid phone number (7-15 digits)';
    }
    return '';
};

// Country code validation
export const isValidCountryCode = (value) => {
    if (!value) return '';
    const regex = /^\+[0-9]{1,4}$/;
    if (!regex.test(value)) {
        return 'Country code must start with + and have 1-4 digits';
    }
    return '';
};

// You can also chain multiple validators if needed:
export const combineValidators =
    (...validators) =>
        (value) =>
            validators.map((fn) => fn(value)).find((msg) => msg !== '');

// Helper function to get nested value from object using dot notation
const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
};

const validateField = (fieldName, value, validatorMapp) => {
    const validator = validatorMapp[fieldName];
    if (!validator) return '';
    return validator(value);
};
export const validate = (formData, validatorMapp) => {
    const errors = {};
    
    // Iterate over all validator keys (including nested paths like "ppmAnalysis.pt")
    Object.keys(validatorMapp).forEach((fieldPath) => {
        const value = getNestedValue(formData, fieldPath);
        const error = validateField(fieldPath, value, validatorMapp);
        if (error) errors[fieldPath] = error;
    });
    
    return errors;
};
