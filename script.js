const amountInput = document.getElementById('amount');
const amountLabel = document.getElementById('amount-label');
const infoNote = document.getElementById('info-note');

const displayAmount = document.getElementById('display-amount');
const displayFee = document.getElementById('display-fee');
const displayNet = document.getElementById('display-net');
const displayMad = document.getElementById('display-mad');

const tabSend = document.getElementById('tab-send');
const tabReceive = document.getElementById('tab-receive');

const FEE_RATE = 0.03;       // Frais de 3%
const EXCHANGE_RATE = 60;     // Taux : 1 MAD = 60 FCFA
let currentMode = 'send';     // 'send' ou 'receive'

function calculate() {
  const inputVal = parseFloat(amountInput.value) || 0;
  let sendAmount = 0;
  let fee = 0;
  let netFcfa = 0;

  if (currentMode === 'send') {
    // L'utilisateur entre le montant envoyé
    sendAmount = inputVal;
    fee = sendAmount * FEE_RATE;
    netFcfa = sendAmount - fee;
  } else {
    // L'utilisateur entre le montant qu'il veut recevoir net
    netFcfa = inputVal;
    sendAmount = netFcfa / (1 - FEE_RATE);
    fee = sendAmount - netFcfa;
  }

  const netMad = netFcfa / EXCHANGE_RATE;

  displayAmount.textContent = `${Math.round(sendAmount).toLocaleString('fr-FR')} FCFA`;
  displayFee.textContent = `-${Math.round(fee).toLocaleString('fr-FR')} FCFA`;
  displayNet.textContent = `${Math.round(netFcfa).toLocaleString('fr-FR')} FCFA`;
  displayMad.textContent = `${netMad.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MAD`;
}

// Gestion des clics sur les onglets
tabSend.addEventListener('click', () => {
  currentMode = 'send';
  tabSend.classList.add('active');
  tabReceive.classList.remove('active');
  amountLabel.textContent = "Montant envoyé (FCFA)";
  infoNote.textContent = "Les frais sont déduits du montant envoyé.";
  calculate();
});

tabReceive.addEventListener('click', () => {
  currentMode = 'receive';
  tabReceive.classList.add('active');
  tabSend.classList.remove('active');
  amountLabel.textContent = "Montant souhaité à la réception (FCFA)";
  infoNote.textContent = "Les frais sont ajoutés pour garantir le montant net.";
  calculate();
});

amountInput.addEventListener('input', calculate);
calculate();
