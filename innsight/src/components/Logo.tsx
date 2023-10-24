import { useReduxSelector } from "~/hooks/reduxHooks"

export const Logo:React.FC<{size:8 | 40}> = ({size}) => {
  const { theme } = useReduxSelector(st => st.appReducer)
  const dynamicSize = size === 8 ? `w-8 h-8 ` : 'w-40 h-40 '
  return (
    <div className={`${dynamicSize} aspect-square flex items-center justify-center`}>
      <img className="w-full h-full object-cover" src={theme === 'dark' ? 'logoLight.png' : 'logo.png'} />
    </div>
  )
}
