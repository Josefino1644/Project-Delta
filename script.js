const transactionUl = document.querySelector("#transactions");
const incomeDisplay = document.querySelector('#money-plus')
const despDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount') 
console.log(form)

const localStorageTransactions = JSON.parse(localStorage
  .getItem('transactions'))

let transactions = localStorage
  .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
  transactions = transactions.filter(transaction => transaction.id !== ID)

  init()
}

const addTransactionIntoDOM = (transaction) => {
  const operator = transaction.amount < 0 ? "-" : "+";
  const CSSClass = transaction.amount < 0 ? "minus" : "plus";
  const amountWithoutOperator = Math.abs(transaction.amount);
  const li = document.createElement("li");

  li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name}
        <span> ${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onclick = "removeTransaction(${transaction.id})">
            x
        </button>
  `

  transactionUl.append(li);
  {
    // <li class="minus">
    //     Salário <span>-$400</span><button class="delete-btn">x</button>
    // </li>
  }
};

const updateBalanceValues = () => {
    const transactionsAmounts = transactions.map(
      (transaction) => transaction.amount
    );
    const total = transactionsAmounts.reduce((acumulator, transaction) => acumulator + transaction, 0).toFixed(2);
    const income = transactionsAmounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);
    // console.log(income)

    
    const desp = Math.abs (transactionsAmounts
    .filter((value) => value < 0 )
    .reduce((accumulator, value)=> accumulator + value,0))
    .toFixed(2);

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    despDisplay.textContent = `R$ ${desp}`
  };
  
  const upDateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

const init = () => {
  transactionUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
};

init();

const generateID = ()=> Math.round(Math.random()*1000)

form.addEventListener('submit', event => {
  event.preventDefault()
  const transName = inputTransactionName.value.trim()
  const transAmount = inputTransactionAmount.value.trim()
  if(transName==='' || transAmount === ''){
   alert('Por gentileza preencha tanto o nome quanto o valor da transação!!!')
   return
  }
  const transaction = { 
    id: generateID(), 
    name: transName, 
    amount: Number (transAmount) }


   transactions.push(transaction)
    init()

    upDateLocalStorage()

    inputTransactionName.value=''
    inputTransactionAmount.value= ''
})
