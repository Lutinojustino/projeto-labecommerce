const numberDev = +process.argv[2];

const numberMaquina = Math.floor(Math.random() * 10);
const numberGame = numberDev + numberMaquina;

const verificao =
  numberGame % 2 === 0
    ? `Você escolheu ${numberDev} e o computador escolheu ${numberMaquina}. O resultado foi ${numberGame}. Você ganhou!`
    : `Você escolheu ${numberDev} e o computador escolheu ${numberMaquina}. O resultado foi ${numberGame}. Você perdeu!`;

console.log(`${verificao}`);
