const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus')
const income2Display = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount') 

const dummyTransactions = [
    { id: 1, name: 'Bolo de Brigadeiro', amount: -20 },
    { id: 2, name: 'Salário', amount: 1500 },
    { id: 3, name: 'Torta de maçã x10', amount: -100 },
    { id: 4, name: 'Guitarra', amount: -200 },
    { id: 5, name: 'Bônus', amount: 300 },
]

const addTransactionIntoDOM = (transaction) => {
    const operator = transaction.amount < 0 ? "-" : "+";
    const CSSClass = transaction.amount < 0 ? "minus" : "plus";
    const amontWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement("li");

    li.innerHTML = `
         
        ${transaction.name} <span> ${operator}R$${amontWithoutOperator}</span><button class="delete-btn">x</button>
      `;
    li.classList.add(CSSClass);
    transactionsUl.append(li)
    {
        // <li class="minus">
        //     Salário <span>-$400</span><button class="delete-btn">x</button>
        // </li>
    }
};
const updateBalanceValues = () => {
    const transactionsAmounts = dummyTransactions.map(
      (transaction) => transaction.amount
    );

    const total = transactionsAmounts.reduce((acumulator, transaction) => acumulator + transaction, 0).toFixed(2);
    const income = transactionsAmounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);
    console.log(income)

    const total2 = transactionsAmounts.reduce((acumulator, transaction) => acumulator + transaction, 0).toFixed(2);
    const income2 = Math.abs(transactionsAmounts
    .filter((value) => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2);
    console.log(income2)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    income2Display.textContent = `R$ ${income2}`

};
const init = () => {
  dummyTransactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
};
init();

const generateID = ()=> Math.round(Math.random()*1000)

form.addEventListener('submit', event => {
  event.preventDefault()
  const transName = inputTransactionName.value.trim()
  const transAmount = inputTransactionAmount.value.trim()
  if(inputTransactionName.value.trim()==='' || inputTransactionAmount.value.trim() === ''){
    alert('Por gentileza preencha tanto o nome quanto o valor da transação!!!')
    return
   }
   const transaction = { id: generateID, name: transName, amount: transAmount }
})
