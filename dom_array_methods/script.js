const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

var firstNames = ['Rav', 'Eddie', 'Pieta', 'Parvati', 'Victor'];
var lastNames = ['Ferguson', 'Andrews', 'Robertson', 'Johnston', 'Chambers'];
let data = [];
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  //   // email iztdmqpviwfyiljcbr@ttirv.org
  //   // api key ad3cb44857fe4855bb605f5d212fe02a
  //   const res = await fetch("https://randommer.io/api/Name?nameType=fullname&quantity=20");
  //   const data = await res.json();
  //   console.log(data);
  //   const user = data.results[0];
  //   const newUser = {
  //     name: `${user.name.first} ${user.name.last}`,
  //     money: Math.floor(Math.random() * 1000000)
  //   };
  const user =
    firstNames[Math.floor(Math.random() * 5)] +
    ' ' +
    lastNames[Math.floor(Math.random() * 5)];
  const newUser = {
    name: user,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// Add new Obj to data arr
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear the main div
  main.innerHTML = `<h2><Strong>Person</Strong>Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement(`div`);
    element.classList.add(`person`);
    element.innerHTML = `<Strong>${item.name}</Strong>${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(num) {
  return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Double everyone's money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort the user by wealth
function sortByWealth() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Show only millionaires by filter
function showMillionaires() {
  data = data.filter((user) => user.money >= 1000000);
  updateDOM();
}

// Calculate entire wealth by reduce
function calculateTotal() {
  const total = data.reduce((acc, user) => acc + user.money, 0);
  const wealthEle = document.createElement(`div`);
  wealthEle.classList.add(`total`);
  wealthEle.innerHTML = `<Strong>Total Wealth</Strong> ${formatMoney(
    total
  )}`;
  main.appendChild(wealthEle);
}

//Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByWealth);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateTotal);
