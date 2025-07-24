const prompt = require("prompt-sync")()
const fs = require("fs") //fs: file system (pacote com métodos para manipular arquivos)

const livros = []
const categorias = []
const autores = []
const numeroDePaginas = []
const ano = []
const avaliacoes = []
const fotos = []

function titulo(texto) {
    console.log()
    console.log(texto.toUpperCase())
    console.log("=".repeat(40))
    console.log()
}

function inclusao() {
    titulo("Inclusão de livro")    

    // lê as variáveis
    const nomeLivro             = prompt("Nome do Livro: ")
    const categoria             = prompt("Categoria.....: ")
    const autor                 = prompt("Autor..: ")
    const numeroDePaginasPrompt = Number(prompt("Número de Páginas......: "))
    const anoPrompt             = Number(prompt("Ano de Publicação...: "))
    const avaliacao             = prompt("Sua avalição:")
    const foto                  = prompt("URL da Foto...: ")

    // acrescenta aos vetores 
    livros.push(nomeLivro)
    categorias.push(categoria)
    autores.push(autor)
    numeroDePaginas.push(numeroDePaginasPrompt)
    ano.push(anoPrompt)
    avaliacoes.push(avaliacao)
    fotos.push(foto)

    // mensagem
    console.log("Ok! Livro cadastrado com sucesso")
}

function listagem() {
    titulo("Lista dos Livros")

    console.log(" Número Nome..........: Categoria...: Autor...........: Número de Páginas....: Avaliação da leitura...: Ano....: Foto...:")
    console.log("------------------------------------------------------------------------------------------------------------------------------------")

    for (let i = 0; i < livros.length; i++) {
        console.log(`${String(i+1).padStart(2)} ${livros[i].padEnd(20)} ${categorias[i].padEnd(15)} ${autores[i].padEnd(20)} ${String(numeroDePaginas[i]).padEnd(20)} ${String(avaliacoes[i]).padEnd(20)} ${String(ano[i]).padEnd(10)} ${fotos[i]}`)
    }

    console.log("----------------------------------------------------------------------------------------------------------------------------------------")
}

function ListagemPorCategoria() {
    titulo("Pesquisa por categoria")
   

    const categoria = prompt("Categoria:").toUpperCase()

    console.log(" Número Nome..........: Categoria...: Autor...........: Número de Páginas....: Avaliação da leitura...: Ano....: Foto...:")
    console.log("------------------------------------------------------------------------------------------------------------------------------------")

    let existe = 0 

    for (let i = 0; i < livros.length; i++) {
        if(categorias[i].toUpperCase() == categoria){
            console.log(`${String(i+1).padStart(2)} ${livros[i].padEnd(20)} ${categorias[i].padEnd(15)} ${autores[i].padEnd(20)} ${String(numeroDePaginas[i]).padEnd(20)} ${avaliacoes[i].padEnd(20)} ${String(ano[i]).padEnd(10)} ${fotos[i]}`)
            existe = existe + 1
        }
        
    }

    if(existe == 0){
        console.log("*Obs.: Não há essa categoria")
    }

    console.log("------------------------------------------------------------------------------------------------------------------------------------")
}
function gravaProdutos(){
    const produtos =[]

    for(let i =0; i < livros.length; i++){
        produtos.push(livros[i] + ";" + categorias[i] +";" + autores[i]+ ";" + numeroDePaginas[i] + ";" + ano[i] + ";" + avaliacoes[i] + ";" + fotos[i])
    }
// salva os dados em um arquivo texto
    fs.writeFileSync("produtos.txt", produtos.join("\n"))

    console.log("Ok! Lista de Livros salva com sucesso")
}
// função que carregada a lista de produtos salva no arquivo
function carregaProdutos(){
    if(fs.existsSync("produtos.txt")){
        //lê os dados e atribui para um vetor, separando por /n
        const produtos = fs. readFileSync("produtos.txt", "utf-8").split("\n")
        //percorre todas as linhas e divide ops elementos para os vetores corretos
        for(let i = 0; i< produtos.length; i++){
            const partes = produtos[i].split(";")

            livros.push(partes[0])
            categorias.push(partes[1])
            autores.push(partes[2])
            numeroDePaginas.push(Number(partes[3]))
            ano.push(Number(partes[4]))
            avaliacoes.push(partes[5])
            fotos.push(partes[6])
        }
    }
}

function pesquisaAutor() {
    titulo("Pesquisa por Autor")   

    const nomeAutor = prompt("Digite o nome do autor: ")
    let encontrou = false

    for (let i = 0; i < autores.length; i++) {
        if (autores[i].toLowerCase() === nomeAutor.toLowerCase()) {
            console.log("-".repeat(40))
            console.log(`Livro...............: ${livros[i]}`)
            console.log(`Categoria...........: ${categorias[i]}`)
            console.log(`Autor...............: ${autores[i]}`)
            console.log(`Número de Páginas...: ${numeroDePaginas[i]}`)
            console.log(`Ano de Publicação...: ${ano[i]}`)
            console.log(`Avaliação...: ${avaliacoes[i]}`)      
            console.log("-".repeat(40))
            encontrou = true
        }
    }

    if (!encontrou) {
        console.log("Autor não encontrado na base de dados.")
    }
}
function listaWebCategoria() {
    const categoriaPesquisa = prompt("Digite a categoria para filtrar: ")
    let encontrou = false

    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].toUpperCase() === categoriaPesquisa.toUpperCase()) {
            console.log("-".repeat(40))
            console.log(`Livro...............: ${livros[i]}`)
            console.log(`Categoria...........: ${categorias[i]}`)
            console.log(`Autor...............: ${autores[i]}`)
            console.log(`Número de Páginas...: ${numeroDePaginas[i]}`)
            console.log(`Ano de Publicação...: ${ano[i]}`)
            console.log(`Avaliação...: ${avaliacoes[i]}`)
            console.log("-".repeat(40))
            encontrou = true
        }
    }

    if (!encontrou) {
        console.log("Categoria não encontrada na base de dados.")
    }
}

function pesquisaAno() {
    const inicio = Number(prompt("Ano inicial: "))
    const fim = Number(prompt("Ano final..: "))
    console.log(`Livros publicados entre ${inicio} e ${fim}:\n`)

    for (let i = 0; i < ano.length; i++) {
        if (ano[i] >= inicio && ano[i] <= fim) {
            console.log(`Livro: ${livros[i]}, Autor: ${autores[i]}, Ano: ${ano[i]}`)
        }
    }
}

function alteracao() {
    listagem()
    const num = String(prompt("Qual número do livro para alterar a avaliação?"))

    if(num == 0 || num > livros.length) {
        console.log("Nenhum livro encontrado...")
        return
    }

    const novaAvaliacao = Number(prompt("Digite a nova avaliação (0 a 5): "))
    if(novaAvaliacao < 0 || novaAvaliacao > 5) {
        console.log("Avaliação inválida.")
        return
    }

    avaliacoes[num-1] = novaAvaliacao
    console.log("Avaliação alterada com sucesso.")
    gravaProdutos()
}

function exclusao() {

    listagem()

    console.log()
    const num = Number(prompt("Qual número do livro para excluir?"))

    if(num == 0 || num > livros.length) {
        console.log("Nenhum livro excluído...")
        return
    }

    //excluir os elementos dos vetores
    livros.splice(num-1,1)
    categorias.splice(num-1,1)
    autores.splice(num-1,1)
    numeroDePaginas.splice(num-1,1)
    ano.splice(num-1,1)
    avaliacoes.splice(num-1,1)
    fotos.splice(num-1,1)

    console.log("Ok. Produto removido com sucesso")
}

function listaWeb () {
    let conteudo = `
    <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Livros</title>
    <link rel="icon" type="image/x-icon" href="book-rem.png">
    <img src="book-rem.png" alt="Livro" style="width: 50px; height: 50px; position: absolute; top: 20px; right: 20px;">
    <style>
        body{
            font-family: Arial, Helvetica, sans-serif; margin: 20px; background: #833AB4;
background: linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%);
        }
        h1{ color: rgb(51, 14, 73);}
        table{ width: 100%; border-collapse: collapse; background-color: aliceblue; box-shadow: 1px 1px 6px #999; border-radius: 8px; overflow: hidden;
        }
        th,td{
            padding: 12px; border-bottom: 1px solid #999; text-align: center; font-size: 20px; color: #333;
        }
        th {
            background-color:  #a87ea1;;
        }
        img { max-width: 100px; max-height: 120px; border-radius: 10px;}
        tr:hover { background-color: #d1a7d1;} 
    </style>
</head>
<body>
    <h1>Minha Biblioteca de Livros Lidos</h1>
    <table>
        <thead>
            <tr>
                <th>Nome do Livro</th>
                <th>Categoria</th>
                <th>Autor</th>
                <th>Número de Páginas</th>
                <th>Ano de Publicação</th>
                <th>Avaliação da Leitura</th>
                <th>Foto da capa</th>
            </tr>
        </thead>
        <tbody>`

    for (let i = 0; i < livros.length; i++) {
        conteudo += `
            <tr><td>${livros[i]}</td>
                <td>${categorias[i]}</td>
                <td>${autores[i]}</td>
                <td>${numeroDePaginas[i]}</td>
                <td>${ano[i]}</td>
                <td>${avaliacoes[i]} estrela(s)</td>
                <td><img src="${fotos[i]}" alt="Capa do Livro"></td>
            </tr>        
        `
    }    
    conteudo +=
    `    
        </tbody>
    </table>
</body>
</html>
`
    fs.writeFileSync("listaLivro.html", conteudo)
    console.log("Lista de Livros salva com sucesso em listaLivro.html")
}


function listaWebFiltroAutor (nomeAutor) {
    let conteudo = `
    <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Livros</title>
    <link rel="icon" type="image/x-icon" href="book-rem.png">
    <img src="book-rem.png" alt="Livro" style="width: 50px; height: 50px; position: absolute; top: 20px; right: 20px;">
    <style>
        body{
            font-family: Arial, Helvetica, sans-serif; margin: 20px; background: #EEAECA;
background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%);
        }
        h1{ color: rgb(58, 16, 82);}
        table{ width: 100%; border-collapse: collapse; background-color: aliceblue; box-shadow: 1px 1px 6px #999; border-radius: 8px; overflow: hidden;
        }
        th,td{
            padding: 12px; border-bottom: 1px solid #999; text-align: center; font-size: 20px; color: #333;
        }
        th {
            background-color:  #a87ea1;;
        }
        img { max-width: 100px; max-height: 120px; border-radius: 10px;}
        tr:hover { background-color: #d1a7d1;} 
    </style>
</head>
<body>
    <h1>Minha Biblioteca de Livros Lidos</h1>
    <table>
        <thead>
            <tr>
                <th>Nome do Livro</th>
                <th>Categoria</th>
                <th>Autor</th>
                <th>Número de Páginas</th>
                <th>Ano de Publicação</th>
                <th>Avaliação da Leitura</th>
                <th>Foto da capa</th>
            </tr>
        </thead>
        <tbody>`

    for (let i = 0; i < livros.length; i++) {

        if(autores[i].toLowerCase().includes(nomeAutor.toLowerCase())) {
            // Se o autor contém o nome do autor, adiciona à lista

            conteudo += `
            <tr><td>${livros[i]}</td>
                <td>${categorias[i]}</td>
                <td>${autores[i]}</td>
                <td>${numeroDePaginas[i]}</td>
                <td>${ano[i]}</td>
                <td>${avaliacoes[i]} estrela(s)</td>
                <td><img src="${fotos[i]}" alt="Capa do Livro"></td>
            </tr>        
        `
        }
    }
    
    conteudo +=
    `    
        </tbody>
    </table>
</body>
</html>
`
    fs.writeFileSync("listaLivro.html", conteudo)
    console.log("Lista de Livros salva com sucesso em listaLivro.html")
}

//------------------------------------------------------------------------

// chama a função que carrega a lista de produtos
carregaProdutos()

menuPrincipal:
do {
   titulo("Minha biblioteca de Livros")
   console.log("1.  Inclusão de Livro")
   console.log("2.  Listagem de Livros")
   console.log("3.  Pesquisa por Autor")
   console.log("4.  Pesquisa por Ano")
   console.log("5.  Lista Web")
   console.log("6.  Listagem por Categoria")
   console.log("7.  Lista Web com filtro por Autor")
   console.log("8.  Alterar Avaliação")
   console.log("9.  Excluir livro do Catálogo")
   console.log("10. Finalizar")

   const opcao = Number(prompt("Opção: "))
//    if (opcao == 1) {
//       inclusao()
//    } else if (opcao == 2) {
//       listagem()
//    } ...
    switch (opcao) {
        case 1: {
            inclusao()
            break
        }    
        case 2: {
            listagem()
            break        
        }    
        case 3: {
            pesquisaAutor()
            break        
        }    
        case 4: {
            pesquisaAno()
            break        
        }    
        case 5: {
            listaWeb()
            break        
        }    
        case 6: {
            listaWebCategoria()
            break        
        }    
        case 7: {
            const nomeAutor = prompt("Digite o nome do autor para filtrar: ")
            listaWebFiltroAutor(nomeAutor)
            break        
        }    
        case 8: {
            alteracao()
            break        
        }    
        case 9: {
            exclusao()
            break        
        }    
        case 10: {
            break menuPrincipal           
        }
              
           
    }
} while (true)
// chama a função que grava os produtos em um arquivo
gravaProdutos()

console.log("-".repeat(40))
console.log("Fim do Programa...")