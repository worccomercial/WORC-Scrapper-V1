function limpaDadosCep()
{
    document.getElementById('cep').value = "";
    document.getElementById('logradouro').value = "";
    document.getElementById('numero').value = "";
    document.getElementById('complemento').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('localidade').value = "";
    document.getElementById('uf').value = "";
    document.getElementById('ibge').value = "";
    document.getElementById('ddd').value = "";
}

function retornoViaCep(conteudo)
{
    // verifica se retornou se retornou erro
    if (!('erro' in conteudo))
    {
        // atualiza campos com os valores do callback, no caso
        // as IDs dos campos possuem o mesmo nome das chaves do json
        for (const campo in conteudo)
        {
            let campoAux = document.querySelector(`#${campo}`)
            if (campoAux)
            {
                campoAux.value = conteudo[campo].toUpperCase();
            }
        } 
    } else
    {
        // informa o erro
        alert('CEP não entrado!');
    }
}

function validarCep(valor) 
{
    // obtém somente os números através da expressão regular
    let cep = valor.replace(/\D/gm,'');
    // expressão regular para validar o cep
    let regEx = /^[0-9]{8}$/;
    // verifica se o cep está no formato válido
    if (regEx.test(cep))
    {
        consultarCep(cep);
    } else
    {
        alert('Cep em formato inválido!');
        limpaDadosCep();
    }
}

function consultarCep(cep)
{
    // cria um elemento javascript
    let script = document.createElement('script');
    // sincroniza com o callback
    script.src = `https://viacep.com.br/ws/${cep}/json/?callback=retornoViaCep`;
    // insere script no documento e carrega o conteúdo
    document.body.appendChild(script);
}