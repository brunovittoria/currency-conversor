
/* SELECIONAR ELEMENTOS */

// Selecionando input com o numero digitado
let valorDigitado = document.querySelector('#valorEmReal')

// Selecionar os elementos radios (criar um array deles)
let moedaSelecionada = document.getElementsByName('moedaEstrangeira')

let aviso = document.querySelector('#aviso')

// Selecionar os botoes
let btnConverter = document.querySelector('#btnConverter')
let btnLimpar = document.querySelector('#btnLimpar')

// Cotacoes do dia (POSTERIORMENTE PASSAR POR API)
let valorDoDolar     = valorUsdApi         /* apiUsd() */
let valorDoEuro      = 6.23
let valorDaLibra     = 7.26
let valorDoBitcoin   = 229762.85
let valorEmReal      = 0

let moedaEstrangeira = ''
let moedaConvertida = ''

// Transformando valores da API em JSON
function transJson(response) {
    return response.json()
}

// VALORES COM API 

let valorUsdApi = botaoConvert()

async function botaoConvert() {

    const dados = await fetch(`https://v6.exchangerate-api.com/v6/290988fdcfedb027156fa5a3/latest/USD`)
    .then(transJson)
    .then((valorAtualizado) => {

        const rate = valorAtualizado.conversion_rates.USD
        const cal = (rate * valorEmReal)
        valorConvertido.innerText = `USD$ ${cal.toFixed(2)}`
    } )

}




// Mensagem FORMATADA para exibir os VALORES MONETARIOS CONVERTIDOS
function mensagemFormatada(moedaConvertida) {

    isNaN(valorEmReal) ? valorEmReal = 0 : ''
    console.log("Moeda Convertida" + moedaConvertida)
    aviso.textContent = "O valor" + (valorEmReal).toLocaleString('pt-br', { style: 'currency', currency: 'BRL'}) + 
    "convertido em" + moedaEstrangeira + "é" + moedaConvertida

}

// Verificar se foi DIGITADO algum valor para poder converter
function bloquearBotao() {
    if(valorDigitado.value == 0 || valorDigitado == '' || valorDigitado == null) {
        btnConverter.setAttribute('disabled', 'disabled')
        btnConverter.style.background = '#ccc'
        btnConverter.style.cursor = 'not-allowed'
    }
}

// REATIVAR BOTAO
function ativarBotao() {

    if(valorDigitado.value > 0) {
        btnConverter.removeAttribute('disabled')
        btnConverter.style.background = '#ffc107'
        btnConverter.style.cursor = 'pointer'
    } else {
        console.log('Nao ativou')
    }

}

// Verificar qual BOTAO RADIO esta SELECIONADO como checked == true e pegar o TEXTO/VALUE dela
// Vincular a verificacao a um evento, click no botao CONVERTER
// Aqui se quissessemos ao inves de chamar um addEventListener, poderiamos ter inserido no botao do HTML uma funcao no ONCLICK
// Acredito que ao inves de usar o laço de repetiçao for , poderiamos usar o metodo MAP, também.


btnConverter.addEventListener('click', function() {
    // FAZER o parseFloat dos valores monetarios (converter String para Float)
    valorEmReal = parseFloat(valorDigitado.value)

    console.log('Escolhe a moeda estrangeira')
    for(let i = 0; i < moedaSelecionada.length; i++) {
        if(moedaSelecionada[i].checked) {
            moedaEstrangeira = moedaSelecionada[i].value  //Essa funçao diz que caso a moeda selecionada, na posiçao I estiver checkada, eu vou pegar o valor dela(O TEXTO INSERIDO)
            console.log(moedaEstrangeira)
        }
    }


 // CONVERSAO DE MOEDAS
 // Operaçao basica pra pegar moedaEstrangeira que foi SELECIONADA e dividir pelo valorEmReal
 // O melhor é usar switch pois ira depender tudo da MOEDA que foi SELECIONADA e para cada moeda tem o seu CASE

    switch(moedaEstrangeira) {

        case 'Dólar':
            moedaConvertida = valorEmReal / valorDoDolar
            mensagemFormatada(moedaConvertida.toLocaleString('en-US', { style: 'currency', currency: 'USD'}))
        break

        case 'Euro':
            moedaConvertida = valorEmReal / valorDoEuro
            mensagemFormatada(moedaConvertida.toLocaleString('de-DE', { style: 'currency', currency: 'EUR'}))
        break

        case 'Libra':
            moedaConvertida = valorEmReal / valorDaLibra
            mensagemFormatada(moedaConvertida.toLocaleString('en-GB', { style: 'currency', currency: 'GBP'}))
        break

        case 'Bitcoins':
            moedaConvertida = valorEmReal / valorDoBitcoin
            mensagemFormatada(parseFloat(moedaConvertida).toFixed(5)) //Usamos o parsefloat pra ficar com um numero INTEIRO e o toFixed pra limitar o n° de casas decimais do BTC
        break

        default:
            aviso.textContent = 'Escolha uma moeda estrangeira'
    }
    isNaN(moedaConvertida) ? moedaConvertida = 0 : '' // Uma pequena verificaçao para que caso a MOEDACONVERTIDA nao seja um valor ALFANUMERICO
})

btnLimpar.addEventListener('click', function() {
    valorDigitado.focus() // Coloca o foco no campo do NUMERO
    valorDigitado.value = '' //Apaga o que ta la dentro do campo value
    aviso.textContent = 'Digite o valor, escolha a moeda e converter' // RE-INSERE A MENSAGEM LA EMBAIXO
    moedaSelecionada[0].checked = false  //Aqui ira DESMARCAR todos os campos Marcados das moedas/radios
    moedaSelecionada[1].checked = false
    moedaSelecionada[2].checked = false
    moedaSelecionada[3].checked = false
})