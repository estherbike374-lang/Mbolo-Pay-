const amountInput = document.getElementById('amount');
const displayAmount = document.getElementById('display-amount');
const displayFee = document.getElementById('display-fee');
const displayNet = document.getElementById('display-net');

const FEE_RATE = 0.03; // Frais fixes à 3%

function updateCalculations() {
  const val = parseFloat(amountInput.value) || 0;
  const fee = val * FEE_RATE;
  const net = val - fee;

  displayAmount.textContent = `${val.toLocaleString('fr-FR')} FCFA`;
  displayFee.textContent = `-${fee.toLocaleString('fr-FR')} FCFA`;
  displayNet.textContent = `${net.toLocaleString('fr-FR')} FCFA`;
}

amountInput.addEventListener('input', updateCalculations);
updateCalculations();
