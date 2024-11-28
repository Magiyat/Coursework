interface SudokuGrid {
  error: boolean;
  value: number | undefined;
  disabled: boolean;
}
interface Position {
  row: number;
  col: number;
}

interface ValidateSudoku {
  positionX: number;
  positionY: number;
  sudoku: SudokuGrid[][];
  value: number | undefined;
}

interface Difficulty {
  min: number;
  max: number;
}

export const validateSudoku = ({ sudoku, positionX, positionY, value }: ValidateSudoku): any => {
  // Clear errors
  sudoku.forEach(row => row.forEach(cell => (cell.error = false)));

  sudoku[positionY][positionX] = {
    ...sudoku[positionY][positionX],
    value,
  };

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = sudoku[row][col].value;

      if (value !== undefined) {
        for (let i = col + 1; i < 9; i++) {
          if (value === sudoku[row][i].value) {
            sudoku[row][col].error = true;
            sudoku[row][i].error = true;
          }
        }
      }
    }
  }

  // Validate columns
  for (let col = 0; col < 9; col++) {
    for (let row = 0; row < 9; row++) {
      const value = sudoku[row][col].value;

      if (value !== undefined) {
        for (let i = row + 1; i < 9; i++) {
          if (value === sudoku[i][col].value) {
            sudoku[row][col].error = true;
            sudoku[i][col].error = true;
          }
        }
      }
    }
  }

  for (let matrixRow = 0; matrixRow < 3; matrixRow++) {
    for (let matrixCol = 0; matrixCol < 3; matrixCol++) {
      for (let i = matrixRow * 3; i < matrixRow * 3 + 3; i++) {
        for (let j = matrixCol * 3; j < matrixCol * 3 + 3; j++) {
          const value = sudoku[i][j].value;

          if (value !== undefined) {
            for (let x = matrixRow * 3; x < matrixRow * 3 + 3; x++) {
              for (let y = matrixCol * 3; y < matrixCol * 3 + 3; y++) {
                if (value === sudoku[x][y].value && (i !== x || j !== y)) {
                  sudoku[i][j].error = true;
                  sudoku[x][y].error = true;
                }
              }
            }
          }
        }
      }
    }
  }

  return [...sudoku];
};

export const isSudokuSolved = (grid: SudokuGrid[][]) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col].value === undefined || grid[row][col].error) {
        return false;
      }
    }
  }

  return true;
};
const GRID_SIZE = 9;

// Создаёт пустую доску.
function createEmptyBoard(): SudokuGrid[][] {
  const board: SudokuGrid[][] = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    board[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      board[i][j] = { value: undefined, error: false, disabled: false };
    }
  }
  return board;
}

// Перемешивает массив чисел.
function shuffleArray(): number[] {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = numbers.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
  }
  return numbers;
}

// Проверяет, можно ли вставить значение в заданную позицию.
function isValid(board: SudokuGrid[][], row: number, col: number, value: number): boolean {
  // Проверка строки
  for (let i = 0; i < GRID_SIZE; i++) {
    if (board[row][i].value === value) return false;
  }

  // Проверка столбца
  for (let i = 0; i < GRID_SIZE; i++) {
    if (board[i][col].value === value) return false;
  }

  // Проверка 3x3 матрицы
  const boxStartRow = Math.floor(row / 3) * 3;
  const boxStartCol = Math.floor(col / 3) * 3;
  for (let i = boxStartRow; i < boxStartRow + 3; i++) {
    for (let j = boxStartCol; j < boxStartCol + 3; j++) {
      if (board[i][j].value === value) return false;
    }
  }

  return true;
}

// Находит первую пустую ячейку.
function findEmpty(board: SudokuGrid[][]): Position | null {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col].value === undefined) {
        return { row, col };
      }
    }
  }
  return null;
}

// Заполняет доску числами (Backtracking).
function fillBoard(board: SudokuGrid[][]): boolean {
  const emptyCell = findEmpty(board);
  if (!emptyCell) return true;

  const { row, col } = emptyCell;
  const numbers = shuffleArray();

  for (const num of numbers) {
    if (isValid(board, row, col, num)) {
      board[row][col].value = num;

      if (fillBoard(board)) return true;

      board[row][col].value = undefined;
    }
  }

  return false;
}

// Удаляет числа из заполненной доски, создавая головоломку.
function clearCells(board: SudokuGrid[][], difficulty: Difficulty): SudokuGrid[][] {
  const clearedBoard = board.map(row => row.map(cell => ({ ...cell })));
  const emptyCellsCount = Math.floor(Math.random() * (difficulty.max - difficulty.min)) + difficulty.min;

  for (let i = 0; i < emptyCellsCount; i++) {
    let row, col;

    do {
      row = Math.floor(Math.random() * GRID_SIZE);
      col = Math.floor(Math.random() * GRID_SIZE);
    } while (clearedBoard[row][col].value === undefined);

    clearedBoard[row][col].value = undefined;
    clearedBoard[row][col].disabled = false;
  }

  return clearedBoard;
}

// Генерирует судоку доску.
export function generateSudoku(difficulty: Difficulty): SudokuGrid[][] {
  const board = createEmptyBoard();
  fillBoard(board);
  return clearCells(board, difficulty);
}

export const generateSudokuGrid = (difficulty: Difficulty): SudokuGrid[][] => {
  return generateSudoku(difficulty);
};
//
// const solveSudoku = (grid: SudokuGrid[][]) => {
//   const findEmpty = () => {
//     for (let row = 0; row < 9; row++) {
//       for (let col = 0; col < 9; col++) {
//         if (grid[row][col].value === undefined) {
//           return [row, col];
//         }
//       }
//     }
//     return null;
//   };
//
//   const validateValue = (value: number, row: number, col: number) => {
//     for (let i = 0; i < 9; i++) {
//       if (i !== col && grid[row][i].value === value) {
//         return false;
//       }
//     }
//     for (let i = 0; i < 9; i++) {
//       if (i !== row && grid[i][col].value === value) {
//         return false;
//       }
//     }
//
//     // Validate 3x3 matrix
//     const matrixRow = Math.floor(row / 3) * 3;
//     const matrixCol = Math.floor(col / 3) * 3;
//
//     for (let i = matrixRow; i < matrixRow + 3; i++) {
//       for (let j = matrixCol; j < matrixCol + 3; j++) {
//         if (i !== row && j !== col && grid[i][j].value === value) {
//           return false;
//         }
//       }
//     }
//
//     return true;
//   };
//
//   const backtrack = () => {
//     const empty = findEmpty();
//     if (empty === null) {
//       return true;
//     }
//
//     const [row, col] = empty;
//
//     for (let value = 1; value <= 9; value++) {
//       if (validateValue(value, row, col)) {
//         grid[row][col].value = value;
//         grid[row][col].disabled = true;
//
//         if (backtrack()) {
//           return true;
//         }
//
//         grid[row][col].value = undefined;
//       }
//     }
//
//     return false;
//   };
//
//   backtrack();
//
//   return grid;
// };
//
//
//
// export const generateSudokuGrid = (grid: SudokuGrid[][], difficulty: Difficulty): any => {
//   for (let row = 0; row < 9; row++) {
//     grid[row] = [];
//
//     for (let col = 0; col < 9; col++) {
//       grid[row][col] = { value: undefined, error: false, disabled: false };
//     }
//   }
//
//   solveSudoku(grid);
//
//   const emptyCells = Math.floor(Math.random() * (difficulty.max - difficulty.min)) + difficulty.min;
//
//   for (let i = 0; i < emptyCells; i++) {
//     let row, col;
//
//     do {
//       row = Math.floor(Math.random() * 9);
//       col = Math.floor(Math.random() * 9);
//     } while (grid[row][col].value === undefined);
//
//     grid[row][col].value = undefined;
//     grid[row][col].disabled = false;
//   }
//
//   return [...grid];
// };
