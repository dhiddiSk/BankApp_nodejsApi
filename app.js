'use strict'

// Bank Accounts Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z'
  ]
}

account1.movementsDates.push()
const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z'
  ]
}

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z'
  ]
}

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z'
  ]
}

const accounts = [account1, account2, account3, account4]
let currentLoggedInUser
let sortMovementsState
let date

// FE Elements
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const labelTimer = document.querySelector('.timer')

const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')

const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')
const loginTimer = document.querySelector('.timer')

// Update the accounts Object with userNames

const accountUserNames = function (userAccounts) {
  userAccounts.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('')
  })
}

accountUserNames(accounts)

const userAccountBalance = function (transactions) {
  // total balance of user's account

  const balance = transactions.reduce(function (
    previous,
    current,
    index,
    array
  ) {
    const sum = previous + current

    return sum
  })

  return balance
}

// Total deposits
const totalDeposits = function (transactions) {
  const balance = transactions.reduce(function (
    previous,
    current,
    index,
    array
  ) {
    return current > 0 ? previous + current : previous
  },
  0)
  return balance
}

// Total withdrawls
const totalWithdrawls = function (transactions) {
  const balance = transactions.reduce(function (
    previous,
    current,
    index,
    array
  ) {
    return current < 0 ? previous + current : previous
  },
  0)
  return balance
}

const updateUserAccountMovements = function (
  currentLoggedInUser,
  sort = false
) {
  containerMovements.innerHTML = ''
  // sort the movements
  const movs = sort
    ? currentLoggedInUser.movements.slice().sort((a, b) => a - b)
    : currentLoggedInUser.movements

  // deposit or withdrawl
  movs.forEach(function (transaction, index) {
    // Since the array size of movements and dates are same, then use the index of the movements for fetching the date.

    const currentTransactionDate = currentLoggedInUser.movementsDates[index]
    date = new Date(currentTransactionDate)

    const type = transaction > 0 ? 'deposit' : 'withdrawal'
    const htmlElement = `
     <div class="movements__row">
     <div class="movements__type movements__type--${type}">${
      index + 1
    }${type}</div>
     <div class="movements__date">${date.getDate()}\\${
      date.getMonth() + 1
    }\\${date.getFullYear()}</div>
     <div class="movements__value">${transaction}€</div>
   </div>
   `
    containerMovements.insertAdjacentHTML('afterbegin', htmlElement)
  })

  // Update the user balance values
  labelBalance.textContent = `${userAccountBalance(movs)}€`
  labelSumIn.textContent = `${totalDeposits(movs)}€`
  labelSumOut.textContent = `${totalWithdrawls(movs)}€`
}

// Transfer money functionality
const transferMoney = function () {
  const reciverAccount = accounts.find(
    (acc1) =>
      acc1.userName === inputTransferTo.value &&
      acc1.userName !== currentLoggedInUser.userName
  )

  if (reciverAccount && inputTransferAmount.value > 0) {
    reciverAccount.movements.push(Number(inputTransferAmount.value))
  }
  currentLoggedInUser.movements.push(-Number(inputTransferAmount.value))
  currentLoggedInUser.movementsDates.push(new Date().toISOString())
  updateUserAccountMovements(currentLoggedInUser)
  inputTransferTo.value = ''
  inputTransferAmount.value = ''
}

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault()
  transferMoney()
})

// Request money functionality
const requestMoney = function () {
  if (Number(inputLoanAmount.value) > 0) {
    currentLoggedInUser.movements.push(Number(inputLoanAmount.value))
    currentLoggedInUser.movementsDates.push(new Date().toISOString())
    updateUserAccountMovements(currentLoggedInUser)
    inputLoanAmount.value = ''
  }
}

btnLoan.addEventListener('click', function (e) {
  e.preventDefault()
  requestMoney()
  currentLoggedInUser.movementsDates.push(date.toISOString())
})

const startLoginTimer = function () {
  const loggedInDate = new Date()
  document.querySelector('.date').textContent = `${loggedInDate.getDate()}\\${
    loggedInDate.getMonth() + 1
  }\\${loggedInDate.getFullYear()}`
  const startTime = loggedInDate.getMinutes()

  setInterval(() => {
    const timeDate = new Date()
    document.querySelector(
      '.logout-timer'
    ).textContent = `You will be logged out in 5 minutes, ${
      timeDate.getMinutes() - startTime
    }:${timeDate.getSeconds()}`
  }, 300000)

  setTimeout(() => {
    alert('Your logged in time expired')
    window.location.reload()
  }, 300000)
}

// Login implementation of the user
btnLogin.addEventListener('click', function (e) {
  e.preventDefault()
  currentLoggedInUser = accounts.find(
    (acc) => acc.userName === String(inputLoginUsername.value)
  )

  if (currentLoggedInUser?.pin === Number(inputLoginPin.value)) {
    // Update the user account with latest transactions data
    updateUserAccountMovements(currentLoggedInUser)

    const loginElement = document.querySelector('.login')
    const logoutElement = document.createElement('button')
    logoutElement.innerHTML = '<button id="logout">LOGOUT→</button>'
    loginElement.replaceWith(logoutElement)

    // Now user is allowed to view his/her account
    document.querySelector('.app').style.opacity = 100

    startLoginTimer()

    inputLoginUsername.value = ''
    inputLoginPin.value = ''
  } else {
    alert('Please enter valid credentials')
  }
})

sortMovementsState = false
btnSort.addEventListener('click', function (e) {
  e.preventDefault()
  updateUserAccountMovements(currentLoggedInUser, !sortMovementsState)
  sortMovementsState = !sortMovementsState
})

document.addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.id == 'logout') {
    // Do not allow the user to view his/her account
    window.location.reload()
  }
})
