function transJson(response){
    return response.json() 
}



let valorUSD = botaoCarregar() // Valor da variavel chamar uma funcao assincrona com a atualizacao do valor do API


 async function botaoCarregar(){

    const dados = await fetch(`https://v6.exchangerate-api.com/v6/290988fdcfedb027156fa5a3/latest/USD`)

      .then(transJson)
      .then((exibir) => {
       
        const inputOne = document.querySelector('#valor')
        const valor = inputOne.value
        const input = parseFloat(valor)

        const rate = exibir.conversion_rates.BRL
        const cal = (rate * input)
        valorConvertido.innerText = `BRL$ ${cal.toFixed(2)}`
        //console.log(cal)

    })
      .catch('')

}