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
            brand:"VISA",
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
        option.selected = card.brand ===currentCard
        select.appendChild(option)  
    })
}

const printCurrentCard =()=>{
    const container = document.getElementById("currentCard")
    container.innerHTML = ""
    const card = data.cards.find(card=>card.brand===currentCard)

    const titleBlock = document.createElement("div")
    titleBlock.id = "titleBlock"
    container.appendChild(titleBlock)
        
    const title = document.createElement("h3")
    title.innerText =card.brand
    titleBlock.appendChild(title)
    
    const date = document.createElement("P")
    date.innerText = `VENCE ${card.expirationDate}`
    titleBlock.appendChild(date)
    
    const debtBlock = document.createElement ("div")
    debtBlock.id = "debtBlock"
    container.appendChild(debtBlock)
    
    const debtTitle = document.createElement ("h3")
    debtTitle.innerText = "Saldo a pagar" 
    debtBlock.appendChild(debtTitle)

    if (card.pesosDebt) {
        const debtPesos = document.createElement("p")
        debtPesos.innerText = `$ ${card.pesosDebt}`
        debtBlock.appendChild(debtPesos)
    }

    if (card.dollarsDebt) {
        const debtDollars = document.createElement("p")
        debtDollars.innerText = `U$D ${card.dollarsDebt}`
        debtBlock.appendChild(debtDollars) 
    }  
}

let currency = data.hasPesosAccount?"pesos":"dólares" 
const changeCurrency =()=> {
    currency=event.target.value
    initialize()    
}

const selectCurrency = ()=>{     
    const select = document.getElementById("selectCurrency")
    select.innerHTML=""

    const card = data.cards.find(card=>card.brand===currentCard)
        
    if (data.hasPesosAccount && card.pesosDebt) { 
        const option = document.createElement("option")
        option.innerText = "Pagar en pesos"
        option.value = "pesos"
        option.selected = "pesos" ===currency
        select.appendChild(option)
    }
    
    if (data.hasDollarsAccount && card.dollarsDebt) {
        const option = document.createElement("option")
        option.innerText = "Pagar en dólares"
        option.value = "dólares"
        option.selected = "dólares" ===currency
        select.appendChild(option) 
    }
}

let paymentSelection = "total" 
const changePaymentSelection =()=> {
    paymentSelection=event.target.value
    initialize()    
}

const payment = () => {
    const select = document.getElementById("payment")
    select.innerHTML = ""

    const currentCurrency = document.getElementById ("selectCurrency")
    const card = data.cards.find(card=>card.brand===currentCard)

    if (currentCurrency.value ==="pesos") {
        const total = document.createElement("option")
        total.innerText = `AR$ ${card.pesosDebt+card.dollarsDebt*data.dollarExchange} (pago total)`
        total.value = "total"
        total.selected = "total" === paymentSelection
        select.appendChild(total)
        
        const minimum = document.createElement("option")
        minimum.innerText = `AR$ ${card.minimumPayment} (pago mínimo)`
        minimum.value = "minimum"
        minimum.selected = "minimum" === paymentSelection
        select.appendChild(minimum)

        const other = document.createElement("option")
        other.innerText = `Ingrese valor`
        other.value = "other"
        other.selected = "other" === paymentSelection
        select.appendChild(other)
    } 
    
    if (currentCurrency.value ==="dólares") { 
        const total = document.createElement("option")
        const aux1 = card.pesosDebt/data.dollarExchange+card.dollarsDebt
        total.innerText = `USD ${aux1.toFixed(2)} (pago total)`
        total.value = "total"
        total.selected = "total" === paymentSelection
        select.appendChild(total)
        
        const minimum = document.createElement("option")
        const aux2 =card.minimumPayment/data.dollarExchange
        minimum.innerText = `USD ${aux2.toFixed(2)} (pago mínimo)`
        minimum.value = "minimum"
        minimum.selected = "minimum" === paymentSelection
        select.appendChild(minimum)

        const other = document.createElement("option")
        other.innerText = `Ingrese valor`
        other.value = "other"
        other.selected = "other" === paymentSelection
        select.appendChild(other)
    }
}

const remainingDebt = () => {
    const container = document.getElementById("remainingDebt")
    const card = data.cards.find(card=>card.brand===currentCard)
        
    switch (paymentSelection) {
        case "total":
            container.innerText = `No quedará deuda pendiente.`;
        break;
        case "minimum":
            if (currency==="pesos") {
                container.innerText = `Su saldo remanente será de AR$ ${card.pesosDebt+card.dollarsDebt*data.dollarExchange-card.minimumPayment}`
            }
            if (currency==="dólares") {
                const aux = card.pesosDebt/data.dollarExchange+card.dollarsDebt-card.minimumPayment/data.dollarExchange
                container.innerText = `Su saldo remanente será de USD ${aux.toFixed(2)}`
            }
        break;
        case "other":
            container.innerText = "ya veremos";
        break;
        }
}

// (PUNTO 1)
window.localStorage.setItem("usuario", "Calixta")// así guardo algo
//ejemplo de uso
const printUserName = () => {
    let title = document.getElementById("user")
    title.innerText = window.localStorage.getItem("usuario") // así lo recupero
}

//(PUNTO 2)
let datos = [
    { id:'0001', name: "Tarta de jamón y queso", type: "principal", price:100, promo:"1" },
	{ id:'0002', name: "Ensalada caprese" , type: "principal", price:100, promo:"2" },
	{ id:'0003', name: "Milanesa" , type: "principal", price:100, promo:"3" },
]

    // { id:'0004', name: "Ensalada mixta", type: "guarnicion", price:100, promo:"1" },
	// { id:'0005', name: "Papas fritas", type: "guarnicion", price:100, promo:"2" },
	// { id:'0006', name: "Puré de zapallo", type: "guarnicion", price:100, promo:"3" },
	// { id:'0007', name: "Flan con crema", type: "postre", price:100, promo:"1" },
	// { id:'0008', name: "Queso y dulce", type: "postre", price:100, promo:"2" },
    // { id:'0009', name: "Mousse de chocolate", type: "postre", price:100, promo:"3" },
    // { id:'0010', name: "Coca Cola", type: "bebida", price:100, promo:"1" },
    // { id:'0011', name: "Fanta", type: "bebida", price:100, promo:"2" },
    // { id:'0012', name: "Fanta Light", type: "bebida", price:100, promo:"3" }

const checkExistingData = () => {
    const aux = window.localStorage.getItem("platos") //si no hay nada, será undefined 
    // datos = aux ? aux : datos //si es undefined, esta condición es falsa y no se modifican los datos
    //no obstante, hasta acá me devuelve texto, no un array, entonces lo tengo que volver a transformar
    datos = aux ? JSON.parse (aux) : datos // esto convierte mi texto de nuevo en mi tipo de dato
}
checkExistingData() // no la pongo asociada a ningún evento, porque quiero que se ejecute enseguida.

const newPlate = (plate) => {
    datos.push(plate)
    // window.localStorage.setItem("platos", datos) si lo guardo así, guarda [objetc OBJECT] cualquier cosa, para evitarlo
    let parsedData = JSON.stringify(datos) // esto convierte mi objeto en texto y lo guardo en una variable
    window.localStorage.setItem("platos", parsedData)

}

//si refresco la página y reimprimo datos, no estará el nuevo plato. 
//Me gustaría que cada vez que agrego un plato, persista => lo guardo en local storage

const initialize = ()=>{
    printInitialData()
    printCurrentCard()
    selectCurrency()
    payment()
    printUserName()
}
