# _Sudoku solver - versão JS_

  esse projeto não tem nenhuma pretenção de ser alguma coisa profissional, é um projetinho de um dia de um bot que resolve sudoku.

Eu tenho plena confiança de que esse algoritmo vai resolver qualquer sudoku, e caso você queira utiliza-lo (eu imagino que a unica coisa que você vai achar util vai ser o .js) o algoritmo funciona da seguinte forma:

1. Crie o sudoku numa matriz 9x9
2. Chame a função "possibilidadeDeNumero" e passe o sudoku (ela espera uma matriz), salve a variável
3. Chame a função "fazerSudoku", passando (sudoku, 0, possibilidades). O valor retornado é uma matriz 9x9 com o sudoku resolvido.

 A função que resolve o sudoku funciona através de callbacks recursivas, e pra cada callback ele cria uma nova matriz 9x9 com o sudoku, e um cubo 9x9x9 com as possibilidades, então essa função é bem gastona. Mas afim de não gastar toda a memória do mundo fazendo callbacks de modo cego eu fiz alguns checks importantes que ajudam a agilizar o processo. Essas funções técnicamente não são necessárias, mas fazem o processo ser muito mais rápido.

 ## Funções não críticas para o funcionamento:
 - unicaPossibilidade: recebe o sudoku e as possibilidades, se houver apenas uma possibilidade de número numa determinada casa ela preenche, existe uma variável interna chamada "mudouAlgo", ela serve pra iterar na função, ou seja, se mudou algo, ela retorna ela se chama, agora com valores atualizados(já que toda vez que o sudoku é atualizado as possibilidades mudam, pois existem novos números preenchidos). O efeito colateral disso é que ela sempre vai passar uma vez e não vai mudar nada. Sudokus mais fáceis normalmente são resolvidos por essa função antes mesmo de entrar no loop da callback.
 - sudokuPossivel: verifica se o sudoku ainda pode ser resolvido. É importante porque, no processo de callbacks, um valor errado pode fazer com que o sudoku não seja mais resolvivel, e salva um grande numero de tentativas e erros inúteis.
