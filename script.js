function validarCep(valor)
{
    // obtém somente os números através da expressão regular
    let cep = valor.replace(/\D/gm,'');
    // expressão regular para validar o cep
    let regEx = /^[0-9]{8}$/;
    // verifica se o cep está no formato válido
    if (regEx.test(cep) === true)
    {
        consultarCep(cep);
    } else
    {
        alert('Cep em formato inválido!');
        limparFormulario();
    }
}

function validarCnpj(valor)
{
    // obtém somente os números
    let cnpj = valor.replace(/\D/gm,'');
    // expressão regular para validar o cnpj
    let regEx = /^[0-9]{14}$/;
    // verifica se o cep está no formato válido
    if (regEx.test(cnpj) === true)
    {
        consultarCnpj(cnpj);
    } else
    {
        alert('Cnpj em formato inválido!');
        limparFormulario();
    }
}

function limparFormulario()
{
    document.getElementById('cnpj').value = "";
    document.getElementById('nome').value = "";
    document.getElementById('cep').value = "";
    document.getElementById('logradouro').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('municipio').value = "";
    document.getElementById('uf').value = "";
    document.getElementById('ibge').value = "";
    document.getElementById('ddd').value = "";
    document.getElementById('telefone').value = "";
}

function escreverDadosCep(textoJson)
{
    // converte o texto JSON em objeto
    const jsonObj = JSON.parse(textoJson);

    // escreve os valores do objeto JSON no formulário
    if (!('erro' in jsonObj))
    {
        document.getElementById('logradouro').value = jsonObj.logradouro;
        document.getElementById('bairro').value = jsonObj.bairro;
        document.getElementById('municipio').value = jsonObj.localidade;
        document.getElementById('uf').value = jsonObj.uf;
        document.getElementById('ibge').value = jsonObj.ibge;
        document.getElementById('ddd').value = jsonObj.ddd;
    } else
    {
        // pesquisa retornou algum erro
        limparFormulario();
        alert('Cep não encontrado!');
    }
}

function consultarCep(valor)
{
    let baseUrl = 'https://viacep.com.br/ws/' + valor + '/json/';
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET',baseUrl,true);
    xhttp.setRequestHeader('Content-Type','text/plain');
    xhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhttp.send();

    xhttp.onload = function()
    {
        if (xhttp.readyState == 4 && xhttp.status == 200)
        {
            // sucesso
            let resposta = xhttp.responseText;
            escreverDadosCep(resposta);
            return;
        } else
        {
            // alerta porque não foi possível obter a consulta
            alert(xhttp.readyState + `\n` + xhttp.status + `\n` + xhttp.statusText);
            return;
        };
    }

    xhttp.onerror = function()
    {
        // alerta o erro
        alert('Erro: ' + xhttp);
        return;
    }

}

function escreverDadosCnpj(textoJson)
{
    // converte o texto JSON em objeto
    const jsonObj = JSON.parse(textoJson);
    console.log(jsonObj.cep);
    console.log(jsonObj.nome);
    console.log(jsonObj.abertura);
    // escreve os valores do objeto JSON no formulário
    if (jsonObj.status == 'OK')
    {
        document.getElementById('razao').value = jsonObj.nome;
        document.getElementById('abertura').value = jsonObj.abertura;
        document.getElementById('cep').value = jsonObj.cep.replace(/\D/gm,'');
        validarCep(jsonObj.cep);
    } else
    {
        // pesquisa retornou algum erro
        limparFormulario();
        alert(`ERRO: \n` + jsonObj.message);
    }
}

function consultarCnpj(valor)
{
    // PARA ATIVAR A DEMO DO CORS PARA CONSULTA DA API --> https://cors-anywhere.herokuapp.com/corsdemo
    let baseUrl = 'https://cors-anywhere.herokuapp.com/https://www.receitaws.com.br/v1/cnpj/' + valor;
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET',baseUrl,true);
    xhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhttp.setRequestHeader('Content-Type','text/plain');
    xhttp.send();

    xhttp.onload = function()
    {
        if (xhttp.readyState == 4 && xhttp.status == 200)
        {
            // sucesso
            let resposta = xhttp.responseText;
            escreverDadosCnpj(resposta);
            console.log(resposta);
            return;
        } else
        {
            // alerta porque não foi possível obter a consulta
            alert(xhttp.readyState + `\n` + xhttp.status + `\n` + xhttp.statusText);
            return;
        };
    }

    xhttp.onerror = function()
    {
        // alerta o erro
        alert('Erro: ' + xhttp.getAllResponseHeaders());
        return;
    }
}

function validarTelefone(valor)
{
    let regexTelefone = /^[0-9]{4,5}-[0-9]{4}$/;
    if (!(regexTelefone.test(valor) === true))
    {
        alert('Formato de telefone inválido!');
    }
}