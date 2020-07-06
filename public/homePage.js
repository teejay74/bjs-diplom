"use strict";
const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(checkLogout);
const checkLogout = (value) => {
  if (value.success) location.reload();
};
const checkCurrentUser = (value) => {
  if (value.success) ProfileWidget.showProfile(value.data);
};
ApiConnector.current(checkCurrentUser);

const ratesBoard = new RatesBoard();
const getRates = () => {
  ApiConnector.getStocks(checkStocks);
};
const checkStocks = (value) => {
  if (value.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(value.data);
  }
};
getRates();
setInterval(getRates, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) =>
  ApiConnector.addMoney(data, checkAddMoney);
const checkAddMoney = (value) => {
  if (value.success) {
    ProfileWidget.showProfile(value.data);
    moneyManager.setMessage(!value.success, "Пополнение счета прошло успешно!");
  } else {
    moneyManager.setMessage(!value.success, value.data);
  }
};

moneyManager.conversionMoneyCallback = (data) =>
  ApiConnector.convertMoney(data, checkConvertMoney);
const checkConvertMoney = (value) => {
  if (value.success) {
    ProfileWidget.showProfile(value.data);
    moneyManager.setMessage(!value.success, "Конвертация прошла успешно!");
  } else {
    moneyManager.setMessage(!value.success, value.data);
  }
};

moneyManager.sendMoneyCallback = (data) =>
  ApiConnector.transferMoney(data, checkTransferMoney);
const checkTransferMoney = (value) => {
  if (value.success) {
    ProfileWidget.showProfile(value.data);
    moneyManager.setMessage(!value.success, "Перевод сделан успешно!");
  } else {
    moneyManager.setMessage(!value.success, value.data);
  }
};

const favoritesWidget = new FavoritesWidget();
const checkGetFavorites = (value) => {
  if (value.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(value.data);
    moneyManager.updateUsersList(value.data);
  }
};
ApiConnector.getFavorites(checkGetFavorites);

favoritesWidget.addUserCallback = (data) =>
  ApiConnector.addUserToFavorites(data, checkAddUserToFavorites);
const checkAddUserToFavorites = (value) => {
  if (value.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(value.data);
    moneyManager.updateUsersList(value.data);
    favoritesWidget.setMessage(
      !value.success,
      "Пользователь добавлен успешно!"
    );
  } else {
    favoritesWidget.setMessage(!value.success, value.data);
  }
};

favoritesWidget.removeUserCallback = (data) =>
  ApiConnector.removeUserFromFavorites(data, checkRemoveUser);
const checkRemoveUser = (value) => {
  if (value.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(value.data);
    moneyManager.updateUsersList(value.data);
    favoritesWidget.setMessage(!value.success, "Пользователь удален!");
  } else {
    favoritesWidget.setMessage(!value.success, value.data);
  }
};
