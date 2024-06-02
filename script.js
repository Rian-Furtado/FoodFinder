var links = new Array(5);
links[0] = "paginas_norte/norte.html";
links[1] = "paginas_nordeste/nordeste.html";
links[2] = "paginas_centroOeste/centroOeste.html";
links[3] = "paginas__sul/sul.html";
links[4] = "paginas__sudeste/sudeste.html";

function aleatorio() {
    var numero = Math.floor(Math.random() * links.length);
    location.href = links[numero];
}


let rodape = document.querySelector("footer#footer--norte")

function verde() {
    document.body.style.backgroundColor = '#24F27B'
    rodape.style.backgroundColor = '#24F27B'
}

function laranja() {
    document.body.style.backgroundColor = 'rgb(255, 172, 84)'
    rodape.style.backgroundColor = 'rgb(255, 172, 84)'
}

function amarelo() {
    document.body.style.backgroundColor = '#D2FF00'
    rodape.style.backgroundColor = '#D2FF00'
}

function lilas() {
    document.body.style.backgroundColor = '#FACAFF'
    rodape.style.backgroundColor = '#FACAFF'
}

function azul() {
    document.body.style.backgroundColor = '#8CDDFF'
    rodape.style.backgroundColor = '#8CDDFF'
}

function branco() {
    document.body.style.backgroundColor = '#FFFFFF'
}

function cinza() {
    rodape.style.backgroundColor = "#F2F2F2"
}

