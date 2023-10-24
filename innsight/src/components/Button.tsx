import React from 'react'
import { Spinner } from './Spinner'

interface ButtonInterface {
    text: string,
    onClick: (e:any) => void,
    isLoading: boolean,
    type: 'default' | 'outlined' | 'filter' | 'header'
}
export const Button: React.FC<ButtonInterface> = ({ text, onClick, isLoading, type }) => {
    const buttonStyle = type === "default"
        ? 'btn'
        : type === "outlined"
            ? 'btn-outlined'
            : type === "filter"
                ? 'btn-filter'
                : 'btn- header'

    return (
        <>
            {isLoading
                ? <button disabled={true} className='btn bg-gray-500 flex items-center gap-3'>
                    <Spinner/>
                    <p className='animate-pulse'>Loading...</p>
                </button>
                : <button className={buttonStyle} onClick={onClick}>
                    {text}
                </button>}
        </>
    )
}
