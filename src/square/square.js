import React from 'react';
import './square.css';

export const Square = ({ onSquareClick, playerInput, isGameOver }) => {
    function onClick() {
        onSquareClick();
    }
    return <button className='square' onClick={onClick} disabled={isGameOver}>
        {playerInput}
    </button>
}