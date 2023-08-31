/* Creates a cyclotron (square matrix) filled with values from 1 */
function createCyclotron(size) {
  const cyclotron = new Array(size);
  for (let i = 0; i < size; i++) {
      cyclotron[i] = new Array(size).fill(1);
  }
  return cyclotron;
}

function acceleratingElectron(matrix) {
  const sizeLines = matrix.length;

  for (let i = 0; i < sizeLines; i++) {
    if (i === 0) {
      matrix[i].fill("e");
    } else {
      matrix[i][sizeLines - 1] = "e";
    }
  }
  return matrix;
}

function acceleratingNeutron(matrix) {
  const sizeLines = matrix.length;

  for (let i = 0; i < sizeLines; i++) {
    matrix[i].fill(i === 0 ? "n" : 1);
  }
  return matrix;
}

function acceleratingProton(matrix) {
  const sizeLines = matrix.length;
  
  const isBorder = (i, j) => i === 0 || i === sizeLines - 1 || j === 0 || j === sizeLines - 1;

  /* i= row
  j= colums */

  let lastOne = [-1, -1]; 
  let lastProton = [-1, -1];

  /*[-1, -1] [row, col] - common convention in many programming languages ​​to indicate that coordinates 
  have not yet been defined or that something has not been found.  */

  for (let i = 0; i < sizeLines; i++) {
    for (let j = 0; j < sizeLines; j++) {
      if (isBorder(i, j)) {
        matrix[i][j] = "p";
        lastProton = [i, j];
      } else if ((i === 1 || i === sizeLines - 2) && (j === 1 || j === sizeLines - 2)) {
        matrix[i][j] = 1;
        lastOne = [i, j];
      }
    }
  }

  const [lastOneRow, lastOneCol] = lastOne;
  const [lastProtonRow, lastProtonCol] = lastProton;

  if (matrix[sizeLines - 1][sizeLines - 1] === 1) {
    matrix[sizeLines - 1][sizeLines - 1] = "p";
    lastOne[0] = sizeLines - 1;
    lastOne[1] = sizeLines - 1;
  } else if (matrix[sizeLines - 1][sizeLines - 1] === "p" && matrix[sizeLines - 1][sizeLines - 2] === 1) {
    matrix[sizeLines - 1][sizeLines - 1] = 1;
    matrix[sizeLines - 1][sizeLines - 2] = "p";
    lastOne[0] = sizeLines - 1;
    lastOne[1] = sizeLines - 2;
  }

  if (lastOneRow !== -1 && lastOneCol !== -1) {
    matrix[lastOneRow][lastOneCol] = "p";
  }

  if (lastProtonRow !== -1 && lastProtonCol !== -1) {
    matrix[lastProtonRow][lastProtonCol] = 1;
  }

  return matrix;
}

/* Function to print cyclotron */
function displayCyclotronMatrix(matrix) {
  matrix.forEach(row => {
    console.log(row.join(', '));
  });
}


function cyclotron(particle, matrix) {
  const cyclotronMatrix = createCyclotron(matrix.length);

  switch (particle) {
    case "e": return acceleratingElectron(cyclotronMatrix);
    case "p": return acceleratingProton(cyclotronMatrix);
    case "n": return acceleratingNeutron(cyclotronMatrix);
    default: return matrix;
  }
}

const testCyclotron = (particle, size) => {
  const matrix = createCyclotron(size);
  const result = cyclotron(particle, matrix);
  console.log(result);
};

testCyclotron("e", 4);
testCyclotron("p", 4);
testCyclotron("p", 6);
testCyclotron("n", 4);
