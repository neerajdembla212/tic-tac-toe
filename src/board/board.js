import React from 'react';
import { Square } from '../square/square';
import './board.css';

export const Board = ({ onSquareClick, gameState, isGameOver }) => {

    return <div className='board'>
        {
            gameState.map((row, i) => <div key={`row-${i}`} className="row">
                {row.map((col, j) => <Square key={`${i}-${j}`} onSquareClick={onSquareClick.bind(null, i, j)} playerInput={col} isGameOver={isGameOver}/>)}
            </div>
            )
        }
    </div>
}