import React, { useState } from 'react';
import { Board } from '../board/board';
import './game.css';

export const Game = () => {
    const SIZE = 3;
    const [nextInput, setNextInput] = useState('X');
    const [state, setState] = useState(getInitialGameState());
    const [gameOver, setGameOver] = useState(false);
    const [gameStats, setGameStats] = useState(getInitialStats());
    const winX = new Array(SIZE).fill('X').join('');
    const winO = new Array(SIZE).fill('O').join('');

    function getInitialGameState() {
        return new Array(SIZE).fill(new Array(SIZE).fill(''));
    }
    function getInitialStats() {
        return {
            x: 0,
            o: 0
        }
    }

    function checkRow(gameState, rowNum) {
        const res = gameState[rowNum].join('');
        return res === winX || res === winO;
    }

    function checkColumn(gameState, colNum) {
        let res = '';
        for (let i = 0; i < gameState.length; i++) {
            res += gameState[i][colNum];
        }
        return res === winX || res === winO;
    }

    function checkDiagonal(gameState) {
        // check top-left to bottom-right diagonal
        let res = '';
        for (let i = 0; i < SIZE; i++) {
            res += gameState[i][i];
        }
        if (res === winX || res === winO) {
            return true;
        }
        // check top-right to bottom-left diagonal
        const arr = [];
        for (let i = 0; i < SIZE; i++) {
            arr.push(i);
        }
        const diagonalRes = generateDiagonalResultPositions(arr, gameState);
        return diagonalRes === winX || diagonalRes === winO;
    }

    function generateDiagonalResultPositions(arr, gameState) {
        const isEven = arr.length % 2 === 0;
        let res = '';
        let i, j;
        for (i = 0, j = arr.length - 1; i < j; i++, j--) {
            res += gameState[i][j];
            res += gameState[j][i];
        }
        if (!isEven) {
            res += gameState[i][i];
        }
        return res;
    }

    function isGameOver(gameState) {
        let isGameOver = false;
        for (let i = 0; i < gameState.length; i++) {
            if (checkRow(gameState, i)) {
                isGameOver = true;
                break;
            }
            if (checkColumn(gameState, i)) {
                isGameOver = true;
                break;
            }
        }
        if (!isGameOver) {
            isGameOver = checkDiagonal(gameState);
        }
        return isGameOver;
    }

    function onSquareClick(row, column) {
        if (state[row][column].length > 0) {
            return;
        }
        const newState = [...state].map(prevRow => [...prevRow]);
        newState[row][column] = nextInput;
        const isGameOverBool = isGameOver(newState);
        setGameOver(isGameOverBool)
        setState(newState);
        if (isGameOverBool) {
            setGameStats(prevStats => ({
                x: nextInput === 'X' ? prevStats.x + 1 : prevStats.x,
                o: nextInput === 'O' ? prevStats.o + 1 : prevStats.o,
            }))
        } else {
            setNextInput(prev => prev === 'X' ? 'O' : 'X')
        }
    }
    function resetGame() {
        setState(getInitialGameState());
        setGameOver(false);
        setGameStats(getInitialStats());
    }

    function playAgain() {
        setState(getInitialGameState());
        setGameOver(false);
    }

    return <div className='game'>
        <Board onSquareClick={onSquareClick} playerInput={nextInput} gameState={state} isGameOver={gameOver} />
        <div className='game-actions'>
            <button onClick={resetGame}>Reset</button>
            <button onClick={playAgain}>Play again</button>
            <p>Next Player : {nextInput}</p>
            {gameOver && <p>Winnner : <span className='bold'>{nextInput}</span></p>}
        </div>
        <div className='game-stats'>
            <p> Game Stats </p>
            <div className='stats-row'>
                <p className='bold'>X</p>
                <p className='bold'>O</p>
            </div>
            <div className='stats-row'>
                <p className='bold'>{gameStats.x}</p>
                <p className='bold'>{gameStats.o}</p>
            </div>
        </div>
    </div>
}