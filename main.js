/*
1.- El usuario quiere ver su info personal y los datos de sus tarjetas mostrando 1 a la vez y pudiendo cambiar 
entre ellas.
Datelli: Las funciones tiene que estar preparadas para bancarse cualquier cosa dentro de un modelo de datos.
Requiere validar muchas cosas, pues haré un solo conjunto de funciones para las 3 tarjetas.
Otro datelli: Necesitaría saber qué tarjeta es la que estoy mostrando ahora. Eso lo almaceno en algún lado

2.- Para cada tarjeta, mostrar fecha de vencimiento, deuda en cada moneda y ofrecer el pago en la moneda elegida según 
las cuentas disponibles. Obviamente si el saldo está en todo pesos o en todo dólares, debe poder convertir y pagar
si tiene cuenta pesos y dólares, y tiene deuda en pesos y en dólares, en cualquiera de las
dos monedas. 

3.- La persona debe poder elegir pago total, mínimo u otro monto. En caso de no hacer pago total, debe mostrar 
el saldo restante.
*/

let data = {
    user: "Calixta Ochoa",
    hasPesosAccount:true,
    hasDollarsAccount:true,
    cards: [
        {
            brand:"Visa",
            pesosDebt:25689,
            dollarsDebt:58.50,
            minimumPayment:1800,
            expirationDate:"24/07/2019"
        },
        {
            brand:"Master",
            pesosDebt:0,
            dollarsDebt:117.25,
            minimumPayment:1500,
            expirationDate:"23/07/2019"
        },
        {
            brand:"Amex",
            pesosDebt:1850,
            dollarsDebt:0,
            minimumPayment:800,
            expirationDate:"22/07/2019"
        }
    ],
    dollarExchange:43.50
}

let currentCard = data.cards[0].brand 

const changeCard =()=> {
//los selects tienen asociado un evento onchange, que puedo aprovechar para vincular otras acciones
    currentCard=event.target.value
    initialize()    
}

const printInitialData = ()=>{
    const h1 = document.getElementById("greet")
    h1.innerText = `Bienvenida, ${data.user}`
    
    const select = document.getElementById("selectCard")
    select.innerHTML=""
    
    data.cards.forEach(card=> {
        const option = document.createElement("option")
        option.innerText = card.brand
        option.value = card.brand
        option.selected = card.brand ===currentCard?true:false //esto es otra propiedad de la option
        //selected es un booleano que indica si la opción está seleccionada.
        //y yo le estoy diciendo que la seleccionada es la que marqué como favorita.
        //NO HACE FALTA LA PARTE ?TRUE:FALSE, PORQUE ES COMO AUTOMÁGICO
        select.appendChild(option)  
         
    })
}

const printCurrentCard =()=>{
    const container = document.getElementById("currentCard")
    container.innerHTML = ""
    const card = data.cards.find(card=>card.brand===currentCard)
    
    const titleBlock = document.createElement("div")
    titleBlock.id="titleBlock"
    container.appendChild(titleBlock)

    const title = document.createElement("h3")
    title.innerText =card.brand
    titleBlock.appendChild(title)
    
    const date = document.createElement("em")
    date.innerText = `Vencimiento: ${card.expirationDate}`
    titleBlock.appendChild(date)
    
    if (card.pesosDebt) {
        const debtPesos = document.createElement("p")
        debtPesos.innerText = `Deuda en pesos: ${card.pesosDebt}`
        container.appendChild(debtPesos)
    }

    if (card.dollarsDebt) {
        const debtDollars = document.createElement("p")
        debtDollars.innerText = `Deuda en dólares: ${card.dollarsDebt}`
        container.appendChild(debtDollars) 
    }  
    
    container.appendChild(selectCurrency(card))
    payment()
}

const selectCurrency = ({pesosDebt,dollarsDebt})=>{ // como lo voy a meter adentro de otra función, la paso por parámetro y no tengo que buscar de nuevo
    // let {pesosDebt,dollarsDebt} = card //entiendo que cad es un objeto y me interesan ciertas propiedades 
    //es el mismo concepto de destructuración. Lo hago al tomar el parámetro y así uso solo lo que me interesa, 
    // o bien lo hago inline
    
    const select = document.createElement("select")
    select.id="selectCurrency"
            
    if (data.hasPesosAccount && pesosDebt) { 
        const option = document.createElement("option")
        option.innerText = "Pagar en pesos"
        option.value = "pesos"
        select.appendChild(option)
    }
    
    if (data.hasDollarsAccount && dollarsDebt) {
        const option = document.createElement("option")
        option.innerText = "Pagar en dólares"
        option.value = "dólares"
        select.appendChild(option) 
    }
    
    return select
}

const payment = () => {
    // const select = document.createElement ("select")
    const currency = document.getElementById("selectCurrency").value

    if (currency==="pesos") {console.log("hola")} 
    if (currency==="dólares") {console.log("chau")}
}

// console.log(selectCurrency.value)
// let currency = "pesos"
// console.log(currency)

// const changeCurrency =()=> {
//         currency =event.target.value
//         console.log(currency)
//         initialize()    
//     }

// const pay = ({pesosDebt,dollarsDebt}) => {
//     const pesos = pesosDebt + data.dollarExchange*dollarsDebt
//     console.log (pesos)
// }




const initialize = ()=>{
    printInitialData()
    printCurrentCard()
}