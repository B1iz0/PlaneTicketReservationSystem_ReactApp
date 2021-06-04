const checkEmail = (email) => {
    let result = {
        isNotValid: true,
        errorMessage: '',
    };
    if (email === '') {
        result.isNotValid = true;
        result.errorMessage = 'Email is required.';
        return result;
    }
    if (email === 'admin') {
        result.isNotValid = false;
        return result;
    }
    if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)) {
        result.isNotValid = false;
        return result;
    }
    result.isNotValid = true;
    result.errorMessage = 'Incorrect entry.';
    return result;
}

const checkPassword = (password) => {
    let result = {
        isNotValid: true,
        errorMessage: '',
    };
    if (password === ''){
        result.isNotValid = true;
        result.errorMessage = 'Password is required.';
        return result;
    }
    if (/(?=.*[0-9])(?=.*[a-zA-Z]){6,}/.test(password)) {
        result.isNotValid = false;
        return result;
    } else {
        result.isNotValid = true;
        result.errorMessage = 'At least 6 characters (both Latin letter and digit).';
        return result;
    }
}

const checkRepeatedPassword = (repeatedPassword, password) => {
    let result = {
        isNotValid: true,
        errorMessage: '',
    };
    if (repeatedPassword !== password){
        result.isNotValid = true;
        result.errorMessage = 'Password do not match.';
        return result;
    }
    result.isNotValid = false;
    return result;
}

const checkFirstName = (firstName) => {
    let result = {
        isNotValid: true,
        errorMessage: '',
    };
    if (firstName === ''){
        result.isNotValid = true;
        result.errorMessage = 'First name is required.';
        return result;
    }
    result.isNotValid = false;
    return result;
}

const checkLastName = (lastName) => {
    let result = {
        isNotValid: true,
        errorMessage: '',
    };
    if (lastName === ''){
        result.isNotValid = true;
        result.errorMessage = 'Last name is required.';
        return result;
    }
    result.isNotValid = false;
    return result;
}

export { checkEmail, checkPassword, checkFirstName, checkLastName, checkRepeatedPassword }