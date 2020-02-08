function verificarPossibilidade(num) {
    let possibilidades = [];
    let linha = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (possivelColuna(i, j, num) && possivelLinha(i, j, num) && possivelQuadrado(i, j, num)) {
                linha.push(num);
            }
            else {
                linha.push(0);
            }
        }
    }
}
