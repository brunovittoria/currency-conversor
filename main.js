/* SELECIONAR ELEMENTOS */


// Selecionando input com o numero digitado
let valorDigitado = document.querySelector('#valorEmReal')

// Selecionar os elementos radios (criar um array deles)
let moedaSelecionada = document.getElementsByName('moedaEstrangeira')
let aviso = document.querySelector('#aviso')

// Selecionar os botoes
let btnConverter = document.querySelector('#btnConverter')
let btnLimpar = document.querySelector('#btnLimpar')

// Valores selecionados
let valorEmReal = 0

let moedaEstrangeira = ''
let moedaConvertida = ''



// PEGANDO DADOS DA API PARA CONVERTER

async function pegarDadosAPI() {
    await fetch('https://v6.exchangerate-api.com/v6/290988fdcfedb027156fa5a3/latest/USD')
    .then(response => response.json())
    .then(rates => {

        let { BRL, EUR, GBP, USD } = rates.conversion_rates

        btnConverter.addEventListener('click', () => {
            valorEmReal = parseFloat(valorDigitado.value)

            for(let i = 0; i < moedaSelecionada.length; i++) {
                if(moedaSelecionada[i].checked) {
                    moedaEstrangeira = moedaSelecionada[i].value
                }
            }

            switch(moedaEstrangeira) {

                case 'USD':
                    moedaConvertida = valorEmReal / BRL
                    mensagemFormatada(moedaConvertida.toLocaleString('en-US', {style: 'currency', currency: 'USD'}))
                break

                case 'EUR':
                    moedaConvertida = valorEmReal / (BRL/EUR)
                    mensagemFormatada(moedaConvertida.toLocaleString('de-DE', {style: 'currency', currency: 'EUR'}))
                break

                case 'GBP':
                    moedaConvertida = valorEmReal / (BRL/GBP)
                    mensagemFormatada(moedaConvertida.toLocaleString('en-GB', {style: 'currency', currency: 'GBP'}))
                break

                default:
                    aviso.textContent = 'Escolha uma moeda estrangeira'
            }
            isNaN(moedaConvertida) ? moedaConvertida = 0 : ''
        }) // Fim do escoltador BTNCONVERTER

    }) // Fim do .then(rates => { processar dados})
}

/* CHAMAR A API PRA PEGAR COTACOES */
pegarDadosAPI()


// Mensagem FORMATADA para exibir os VALORES MONETARIOS CONVERTIDOS
function mensagemFormatada(moedaConvertida) {
    isNaN(valorEmReal) ? valorEmReal = 0 : ''
    console.log("Moeda Convertida" + moedaConvertida)
    aviso.textContent = "O valor " + (valorEmReal).toLocaleString('pt-br', { style: 'currency', currency: 'BRL'}) + 
    " convertido em " + moedaEstrangeira + " é " + moedaConvertida
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


// Agora iremos deixar o campo de mensagem e todas opçoes zeradas pra que volte do 0
btnLimpar.addEventListener('click', function() {
    valorDigitado.focus() // Coloca o foco no campo do NUMERO
    valorDigitado.value = '' //Apaga o que ta la dentro do campo value
    aviso.textContent = 'Digite o valor, escolha a moeda e converter' // RE-INSERE A MENSAGEM LA EMBAIXO
    moedaSelecionada[0].checked = false  //Aqui ira DESMARCAR todos os campos Marcados das moedas/radios
    moedaSelecionada[1].checked = false
    moedaSelecionada[2].checked = false
    moedaSelecionada[3].checked = false
})