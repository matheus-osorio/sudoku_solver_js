function gerarCopiaSudoku(sudoku){
    let resultado = []
    sudoku.forEach(linha => linha.forEach(casa => resultado.push(casa)))
    return vetorParaMatriz(resultado)
}

function vetorParaMatriz(vetor){
    let matriz = []
    let linha = []
    for(let i=0;i<9;i++){
        linha = []
        for(let j=0;j<9;j++){
            linha.push(vetor[i*9 + j])
        }
        matriz.push(linha)
    }
    return matriz
}


function fazerSudoku(sudoku, casaAtual, possibilidade){
    
    const x = Math.floor(casaAtual/9)
    const y = casaAtual%9
    let retorno = null
    if(casaAtual>80){return sudoku}
    if(sudoku[x][y]!=0){return fazerSudoku(sudoku,casaAtual+1,possibilidade)}
    if(!sudokuPossivel(sudoku,possibilidade)){return null}
    let copia = gerarCopiaSudoku(sudoku)
    for(let i = 0;i < 9;i++){
        if(possibilidade[i][x][y]){
            copia[x][y] = i+1
            retorno = fazerSudoku(copia,casaAtual + 1, possibilidadeDeNumero(copia))
            if(retorno != null){
                return retorno
            }
        }
    }

    return null
}

function linhaPossivel(numero, x, sudoku){
    for(let i=0;i<9;i++){
        if(sudoku[x][i] == numero){
            return false
        }
    }
    return true
}

function colunaPossivel(numero, y, sudoku){
    for(let i=0;i<9;i++){
        if(sudoku[i][y] == numero){
            return false
        }
    }
    return true
}

function caixaPossivel(numero,x,y,sudoku){
    let inicioX = x - x%3
    let inicioY = y - y%3

    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(sudoku[inicioX + i][inicioY+j] == numero){
                return false
            }
        }
    }

    return true
}

function numeroPossivel(numero, x, y, sudoku){
    if(sudoku[x][y] != 0){return false}

    if(linhaPossivel(numero,x,sudoku) && colunaPossivel(numero, y, sudoku) && caixaPossivel(numero,x,y,sudoku)){
        return true
    }

    return false
}

function atualizarPossibilidades(num,x,y,possibilidade){
    const inicioX = x - x%3
    const inicioY = y - y%3

    for(let i=0;i<9;i++){
        possibilidade[num][x][i] = false
        possibilidade[num][i][y] = false
        possibilidade[i][x][y] = false
    }

    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            possibilidade[num][i+inicioX][j+inicioY] = false
        }
    }

    return possibilidade
}

function unicaPossibilidade(sudoku,possibilidade){
    let ultimaCasa = 0
    let mudouAlgo = false
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(sudoku[i][j] == 0){
                for(let k=0;k<9;k++){
                    if(possibilidade[k][i][j]){
                        if(ultimaCasa==0){
                            ultimaCasa = k+1
                        }
                        else if(ultimaCasa > 0){
                            ultimaCasa = -1
                        }
                    }
                }
                if(ultimaCasa>0){
                    sudoku[i][j] = ultimaCasa
                    possibilidade = atualizarPossibilidades(ultimaCasa-1,i,j,possibilidade)
                    mudouAlgo = true
                }
                ultimaCasa = 0
            }
        }
    }
    return mudouAlgo ? unicaPossibilidade(sudoku,possibilidade) : sudoku
}

function sudokuPossivel(sudoku, possibilidade){
    let retorno = 0
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(sudoku[i][j]==0){
                for(let k=0;k<9;k++){
                    retorno += possibilidade[k][i][j] ? 1:0
                }
                if(!retorno){return false}
                retorno = 0
            }
        }
            
    }         
    return true
}
    

function possibilidadeDeNumero(sudoku){
    let possibilidades = []
    let linha = []
    for(let i=1;i<=9;i++){
        linha = []
        for(let j=0;j<81;j++){
            linha.push(numeroPossivel(i,Math.floor(j/9),j%9,sudoku))
        }
        possibilidades.push(vetorParaMatriz(linha))
    }
    return possibilidades
}
