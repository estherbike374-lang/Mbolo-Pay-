const amountInput = document.getElementById('amount');
const displayAmount = document.getElementById('display-amount');
const displayFee = document.getElementById('display-fee');
const displayNet = document.getElementById('display-net');
const displayMad = document.getElementById('display-mad');

const FEE_RATE = 0.03;       // Frais de 3%
const EXCHANGE_RATE = 60;     // Taux d'échange : 1 MAD = 60 FCFA (à ajuster si besoin)

function updateCalculations() {
  const val = parseFloat(amountInput.value) || 0;
  const fee = val * FEE_RATE;
  const netFcfa = val - fee;
  const netMad = netFcfa / EXCHANGE_RATE;

  displayAmount.textContent = `${val.toLocaleString('fr-FR')} FCFA`;
  displayFee.textContent = `-${fee.toLocaleString('fr-FR')} FCFA`;
  displayNet.textContent = `${netFcfa.toLocaleString('fr-FR')} FCFA`;
  displayMad.textContent = `${netMad.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MAD`;
}

amountInput.addEventListener('input', updateCalculations);
updateCalculations();
