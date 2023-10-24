
export const Head: React.FC<{ headers: string[] }> = ({ headers }) => {


    const editTableHeader = (header:string):string => {
        const lowerCase = header.toLowerCase();
        const firstLetter = lowerCase.charAt(0);
        const capitalizedFirstLetter = firstLetter.toUpperCase();
        const remainingLetters = lowerCase.slice(1);
        return capitalizedFirstLetter + remainingLetters
    }

    return (
        <thead className='border-b border-zinc-800 table-header-group'>
            <tr>
                {headers.map((item, index) => (
                    <th className="px-4 py-6 text-center dark:text-white font-medium" key={index}>{editTableHeader(item)}</th>
                ))}
            </tr>
        </thead>
    )
}
