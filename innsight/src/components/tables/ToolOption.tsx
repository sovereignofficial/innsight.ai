
export const ToolOption:React.FC<{onClick:()=>void,children:React.ReactNode}> = ({onClick,children}) => {
  return (
    <div className='tool-option'>
        <button onClick={onClick} className='tool-btn'>
            {children}
        </button>
    </div>
  )
}
