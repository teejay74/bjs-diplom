"use strict";
const userForm = new UserForm();
userForm.loginFormCallback = (data) => ApiConnector.login(data, checkLogin);
const checkLogin = (value) => {value.success ? location.reload() : userForm.setLoginErrorMessage(value.data);}
userForm.registerFormCallback = (data) => ApiConnector.register(data, checkRegister);
const checkRegister = (value) => {value.success ? location.reload() : userForm.setRegisterErrorMessage(value.data);}
