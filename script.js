const transactionsUl = document.querySelector('#transactions');

const dummyTransactions = [
    { id: 1, name: 'Bolo de Brigadeiro', amount: -20 },
    { id: 2, name: 'Saláio', amount: 300 },
    { id: 3, name: 'Torta de maçã', amount: -10 },
    { id: 4, name: 'Guitarra', amount: -200 },
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
    const income2 = transactionsAmounts
    .filter((value) => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);
    console.log(income2)
};
const init = () => {
  dummyTransactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
};
init();