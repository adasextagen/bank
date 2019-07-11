/*
- EL usuario debe poder visualizar su informacion personal y los datos de sus tarjetas de crédito, mostrando una a la vez y permitiendole cambiar entre ellas

- para cada tarjeta se debe mostrar la fecha de vencimiento, la deduda en cada moneda existente y ofrecer el pago en una moneda elejida segun las cuentas de la persona.
  - Si la persona tiene cuenta en pesos se le debe ofrecer pagar toda su deuda en esa moneda, convirtiendo el valor el valor de     cualquier deuda en otra moneda a pesos y sumandolo al total a pagar.
  - Si la persona tiene cuenta en dolares hay que hace lo mismo en el punto anterior pero convirtiendo todo a dolares. 

- la persona debe poder elegir una opcion de monto a pagar entre total o pago minimo (tiene pago minimo). en caso de hacer el pago minimo hay que mostrar el saldo restante.

tip: las opcionnes de moneda a pagar y monto de pago podrian mostrarse como selectes independientes en los que le sumamos diferentes options segun las condiciones y las opciones conn las que el usuario pueda contar. 
*/


let data = {
  user:'Calixta Ochoa',
  hasPesosAccount: true,
  hasDollarsAccount: true,
  cards:[
    {
      brand:'Visa',
      pesosDebt: 25689,
      dollarsDebt:58.50,
      minimunPayment: 1800,
      expirationDate: '24/07/2019'
    },
    {
      brand:'Amex',
      pesosDebt: 1850,
      dollarsDebt:0,
      minimunPayment: 800,
      expirationDate: '22/07/2019'
    },
    {
      brand:'Master',
      pesosDebt: 0,
      dollarsDebt:117.25,
      minimunPayment: 1500,
      expirationDate: '23/07/2019'
    }
  ],
  dollarExchange:43.50
}

let currentCard = data.cards[0].brand

const initialize = () => {
  printInitialData()
  printCurrentCard()
  paymentOptions()
  payAction()

}


const printInitialData = () => {
  let h1 = document.getElementById('greet')
  let select = document.getElementById('selectCard')
  select.innerHTML = ''
  h1.innerText = `Hola ${data.user}`

  data.cards.forEach( card => {
    let option = document.createElement('option')
    option.innerText = card.brand
    option.value = card.brand
    option.selected = card.brand === currentCard ? true : false 
    select.appendChild(option)
  })
}

const printCurrentCard = () => {
  let container = document.getElementById('payment')
  container.innerHTML = ''
  let card = data.cards.find( 
    e => e.brand === currentCard
  )
  let ul = document.createElement('ul')    
  let li = document.createElement('li')
  let pesosDebt = document.createElement('p')
  let dollarDebt = document.createElement('p')
  let minimunPayment = document.createElement('p')
  let expirationDate = document.createElement('p')
  let totalPesos = document.createElement('p')
  let totalDollars = document.createElement('p')

  pesosDebt.innerText = `Su deuda en pesos es: ${card.pesosDebt} ARS`
  dollarDebt.innerText = `Su deuda en dolares es: ${card.dollarsDebt} USD`
  minimunPayment.innerText = `El pago minimo es: ${card.minimunPayment} ARS`
  expirationDate.innerText = `Fecha de vencimiento: ${card.expirationDate}`
 
  if (card.pesosDebt>0){
    totalPesos.innerText = `El pago total en Pesos es: ${Math.round(card.pesosDebt + (card.dollarsDebt * data.dollarExchange))} ARS`}
  else {
        totalPesos.innerText = null
      }

  if (card.dollarsDebt>0){
    totalDollars.innerText = `El pago total en Dolares es: ${Math.round(card.dollarsDebt + (card.pesosDebt / data.dollarExchange))} USD`}
  else {
        totalDollars.innerText = null
      }

    
  li.appendChild(pesosDebt)
  li.appendChild(dollarDebt)
  li.appendChild(minimunPayment)
  li.appendChild(expirationDate)

  if (data.hasPesosAccount === true && data.hasDollarsAccount === true){
  li.appendChild(totalPesos)
  li.appendChild(totalDollars)}
   else if (data.hasDollarsAccount)
   { li.appendChild(totalDollars) }
    else {
    li.appendChild(totalPesos)
    }
 

  ul.appendChild(li)
  container.appendChild(ul)


  

}
let paymentDefault = data.cards[0].minimunPayment
const paymentOptions = () => {
  
  let containerSelect = document.getElementById('selectPay')
  containerSelect.innerHTML = '' 


  let card = data.cards.find( 
    e => e.brand === currentCard
  )
  

  let selectPayment = document.createElement('select')

  
  let optionPayPesos =document.createElement('option')
  let optionPayDollar =document.createElement('option')
  let optionPayMin =document.createElement('option')
 
  
  optionPayPesos.innerText = `Elijo pagar en pesos ${Math.round(card.pesosDebt + (card.dollarsDebt * data.dollarExchange))} ARS`
  optionPayPesos.value = 'pesos'
  optionPayDollar.innerText = `Elijo pagar en dolares ${Math.round(card.dollarsDebt + (card.pesosDebt / data.dollarExchange))} USD`
  optionPayDollar.value = 'dollar'
  optionPayMin.innerText = `Elijo para el pago minimo en pesos de ${card.minimunPayment} quedando un remanente de ${Math.round((card.pesosDebt + (card.dollarsDebt * data.dollarExchange)) - card.minimunPayment )}`
  optionPayMin.value = 'min'
  optionPayMin.selected = card.minimunPayment  
  

  if (data.hasPesosAccount === true && data.hasDollarsAccount === true){
    selectPayment.appendChild(optionPayPesos)
    selectPayment.appendChild(optionPayDollar)}
  else if (data.hasDollarsAccount)
   { selectPayment.appendChild(optionPayDollar) }
    else {
      selectPayment.appendChild(optionPayPesos)
    }

    selectPayment.appendChild(optionPayMin)
  containerSelect.appendChild(selectPayment)
 
}





const changeCard = () => {
  currentCard = event.target.value
  console.log(event.target.value)
  initialize()
}


const payAction = () => {  
  paymentDefault= event.target.value

}