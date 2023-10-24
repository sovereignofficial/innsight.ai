import  { ReactNode, useEffect, useRef, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'

export const RowTools: React.FC<{ children:ReactNode }> = ({ children }) => {
    const toolRef = useRef<any>();
    const [selectOpen, setSelectOpen] = useState(false);

    useEffect(()=>{
        const handleClickOutside = (event:React.MouseEvent<Document>) => {
            if (!toolRef.current || toolRef.current.contains(event.target as Node) ) {
              return;
            }
            setSelectOpen(false);
          };
      
          document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
          document.addEventListener('touchstart', handleClickOutside as unknown as EventListener );
      
          return () => {
            document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
            document.removeEventListener('touchstart', handleClickOutside as unknown as EventListener);
          };
    },[])


    return (
        <div className="text-end  space-y-4 relative">
            <button onClick={() => setSelectOpen(!selectOpen)}><BiDotsVerticalRounded size={20} /></button>
            {selectOpen && (
                <div ref={toolRef} className='tools'>
                    {children}
                </div>
            )}
        </div>
    )
}
