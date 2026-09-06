const amountInput = document.getElementById('amount');
const amountLabel = document.getElementById('amount-label');
const inputCurrency = document.getElementById('input-currency');
const inputFlag = document.getElementById('input-flag');
const infoNote = document.getElementById('info-note');
const subTitle = document.getElementById('sub-title');

const displayAmount = document.getElementById('display-amount');
const displayFee = document.getElementById('display-fee');
const displayNet = document.getElementById('display-net');
const displayConverted = document.getElementById('display-converted');

const flagSend = document.getElementById('flag-send');
const flagNet = document.getElementById('flag-net');
const flagReceive = document.getElementById('flag-receive');

const tabSend = document.getElementById('tab-send');
const tabReceive = document.getElementById('tab-receive');

const swapBtn = document.getElementById('swap-btn');
const fromFlag = document.getElementById('from-flag');
const toFlag = document.getElementById('to-flag');
const fromCountry = document.getElementById('from-country');
const toCountry = document.getElementById('to-country');

const FEE_RATE = 0.03;       // Frais de 3%
const EXCHANGE_RATE = 60;     // Taux : 1 DH = 60 FCFA

let currentMode = 'send';
let direction = 'GA_MA';

function calculate() {
  const inputVal = parseFloat(amountInput.value) || 0;
  let sendAmount = 0;
  let fee = 0;
  let netSendCurrency = 0;
  let convertedAmount = 0;

  const sendCurrency = direction === 'GA_MA' ? 'FCFA' : 'DH';
  const receiveCurrency = direction === 'GA_MA' ? 'DH' : 'FCFA';

  if (currentMode === 'send') {
    sendAmount = inputVal;
    fee = sendAmount * FEE_RATE;
    netSendCurrency = sendAmount - fee;
  } else {
    netSendCurrency = inputVal;
    sendAmount = netSendCurrency / (1 - FEE_RATE);
    fee = sendAmount - netSendCurrency;
  }

  if (direction === 'GA_MA') {
    convertedAmount = netSendCurrency / EXCHANGE_RATE;
  } else {
    convertedAmount = netSendCurrency * EXCHANGE_RATE;
  }

  const decimalsSend = sendCurrency === 'DH' ? 2 : 0;
  const decimalsReceive = receiveCurrency === 'DH' ? 2 : 0;

  displayAmount.textContent = `${sendAmount.toLocaleString('fr-FR', { minimumFractionDigits: decimalsSend, maximumFractionDigits: decimalsSend })} ${sendCurrency}`;
  displayFee.textContent = `-${fee.toLocaleString('fr-FR', { minimumFractionDigits: decimalsSend, maximumFractionDigits: decimalsSend })} ${sendCurrency}`;
  displayNet.textContent = `${netSendCurrency.toLocaleString('fr-FR', { minimumFractionDigits: decimalsSend, maximumFractionDigits: decimalsSend })} ${sendCurrency}`;
  
  // Affichage en DH (Dirhams)
  displayConverted.textContent = `${convertedAmount.toLocaleString('fr-FR', { minimumFractionDigits: decimalsReceive, maximumFractionDigits: decimalsReceive })} ${receiveCurrency}`;
}

function updateUI() {
  const sendCurrency = direction === 'GA_MA' ? 'FCFA' : 'DH';
  const sendFlagEmoji = direction === 'GA_MA' ? '🇬🇦' : '🇲🇦';
  const receiveFlagEmoji = direction === 'GA_MA' ? '🇲🇦' : '🇬🇦';

  inputCurrency.textContent = sendCurrency;
  inputFlag.textContent = sendFlagEmoji;
  flagSend.textContent = sendFlagEmoji;
  flagNet.textContent = sendFlagEmoji;
  flagReceive.textContent = receiveFlagEmoji;

  if (direction === 'GA_MA') {
    fromFlag.textContent = '🇬🇦';
    fromCountry.textContent = 'Gabon';
    toFlag.textContent = '🇲🇦';
    toCountry.textContent = 'Maroc';
    subTitle.textContent = 'Simulateur Gabon ➔ Maroc';
  } else {
    fromFlag.textContent = '🇲🇦';
    fromCountry.textContent = 'Maroc';
    toFlag.textContent = '🇬🇦';
    toCountry.textContent = 'Gabon';
    subTitle.textContent = 'Simulateur Maroc ➔ Gabon';
  }

  if (currentMode === 'send') {
    amountLabel.textContent = `Montant envoyé (${sendCurrency})`;
    infoNote.textContent = 'Les frais sont déduits du montant envoyé.';
  } else {
    amountLabel.textContent = `Montant souhaité à la réception (${sendCurrency})`;
    infoNote.textContent = 'Les frais sont ajoutés pour garantir le montant net.';
  }

  calculate();
}

swapBtn.addEventListener('click', () => {
  direction = direction === 'GA_MA' ? 'MA_GA' : 'GA_MA';
  if (direction === 'MA_GA' && amountInput.value == 26000) {
    amountInput.value = 400;
  } else if (direction === 'GA_MA' && amountInput.value == 400) {
    amountInput.value = 26000;
  }
  updateUI();
});

tabSend.addEventListener('click', () => {
  currentMode = 'send';
  tabSend.classList.add('active');
  tabReceive.classList.remove('active');
  updateUI();
});

tabReceive.addEventListener('click', () => {
  currentMode = 'receive';
  tabReceive.classList.add('active');
  tabSend.classList.remove('active');
  updateUI();
});

amountInput.addEventListener('input', calculate);
updateUI();
