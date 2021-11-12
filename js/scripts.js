class Calculator{

    constructor(){
        this.upperValue = document.querySelector('#upper-number')
        this.resultValue = document.querySelector('#result-number')
        this.reset = 0

    }
    checkLastDigit(input, upperValue, reg){
        if((
            !reg.test(input) &&
            !reg.test(upperValue.substr(upperValue.length - 1))
        )){
            return true
        } else{
            return false
        }
    }

    btnPress() {
        let input = this.textContent
        let upperValue =  calc.upperValue.textContent
        //verificar se só tem números
        var reg = new RegExp('^\\d+$')

        // se precisar resetar, limpa o display
        if(calc.reset && reg.test(input)){
            upperValue = '0'
        }

        // limpa o reset
        calc.reset = 0

        // ativa método de limpar o display
        if(input == 'AC') {

            calc.clearScreen()

        } else if(input == '='){

            calc.resolution()

        } else {
            // checa se precisa adicionar ou nao
            if(calc.checkLastDigit(input, upperValue, reg)){
                return false
            }
            // adiciona espaços aos operadores
            if(!reg.test(input)){
                input = ` ${input} `
            }
            
            if(upperValue == "0"){
                if(reg.test(input)){
                    calc.upperValue.textContent = input
                }
            }
            else{
                calc.upperValue.textContent += input
            }
        }
    }

    clearScreen(){
        this.upperValue.textContent = '0'
        this.resultValue.textContent = '0'
    }

    refreshValues(total){
        this.resultValue.textContent = total
        this.upperValue.textContent = total
    }

    sum(n1,n2){
        return parseFloat(n1) + parseFloat(n2)
    }

    subtraction(n1,n2){
        return parseFloat(n1) - parseFloat(n2)
    }

    multiplication(n1,n2){
        return parseFloat(n1) * parseFloat(n2)
    }

    division(n1,n2){
        return parseFloat(n1) / parseFloat(n2)
    }

    // resolve a operação
    resolution(){

        // explode uma string em um array
        let upperValueArray = (this.upperValue.textContent).split(" ")
        // resultado da operação
        let result = 0

        for(let i = 0; i<=upperValueArray.length; i++){

            let operation = 0
            let actualItem = upperValueArray[i]

            //faz a multiplicação
            if(actualItem == "*"){
                result = calc.multiplication((upperValueArray[i-1]), (upperValueArray[i+1]))
                operation = 1
            //faz a divisão
            } else if(actualItem == "/"){
                result = calc.division((upperValueArray[i-1]), (upperValueArray[i+1]))
                operation = 1
            //checa se o array ainda tem multiplicação e divisão a ser feita
            } else if(!upperValueArray.includes('*') && !upperValueArray.includes('/')){
                //faz a soma
                if(actualItem == "+"){
                    result = calc.sum((upperValueArray[i-1]), (upperValueArray[i+1]))
                    operation = 1
                //faz a subtração
                } else if(actualItem == "-"){
                    result = calc.subtraction((upperValueArray[i-1]), (upperValueArray[i+1]))
                    operation = 1
                }
            }

            //atualiza valores do array para proxima iteração
            if(operation){
                //indice anterior no resultado da operação
                upperValueArray[i - 1] = result
                //remove os itens já utilizados para a operação
                upperValueArray.splice(i, 2)
                //atualiza o valor do índice
                i = 0
            }

        }

        if(result){
            calc.reset = 1
        }

        // atualiza os resultados
        calc.refreshValues(result)

    }
}


//start obj
let calc = new Calculator

 //start btns
let buttons = document.querySelectorAll('.btn')
 
//map all buttons
for(let i=0; buttons.length > i;i++){
    buttons[i].addEventListener('click', calc.btnPress)
}
