import { ChangeEvent, memo, useCallback } from 'react'
import { useReduxDispatch, useReduxSelector } from '~/hooks/reduxHooks'
import { changeFilterMethod, filterTable, searchTableData } from '~/redux/slices/filterSlice'
import { useNavigate } from 'react-router-dom'
import { resetTablePage } from '~/redux/slices/tableSlice'
import { FilterItemInterface } from '~/types/filters.d'

export const FilterItem: React.FC<FilterItemInterface> = memo(({ value, type, innerText, options }) => {
    const { filterMethod } = useReduxSelector(st => st.filterReducer);
    const { data: tableData } = useReduxSelector(st => st.tableReducer);
    const dispatch = useReduxDispatch();
    const navigate = useNavigate()

    const handleChangeFilter = useCallback(() => {
        value && navigate(`?last=${value}`)
        dispatch(changeFilterMethod(innerText))
        dispatch(filterTable(tableData.rows));
    },[filterMethod,value,tableData.rows,innerText])

    const executeSearchAlgorithm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const searchQuery = e.target.value;
        dispatch(searchTableData({ data: tableData.rows, searchQuery }));
        dispatch(resetTablePage());
    },[tableData.rows])

    const handleSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeFilterMethod(e.target.value));
        dispatch(filterTable(tableData.rows));
    },[tableData.rows])

    return (
        <div>
            {
                type === "btn"
                    ? (
                        <button onClick={handleChangeFilter} className={filterMethod === innerText ? "!bg-primary-500 text-white btn-filter " : 'btn-filter'}>{innerText}</button>
                    )
                    : type === "searchInput"
                        ? (
                            <input type='text' placeholder={`${innerText}`} onChange={executeSearchAlgorithm} maxLength={60} className='form-input' />
                        )
                        : (
                            <select
                                onChange={(e) => handleSelect(e)}
                                className='mx-2 outline-none  px-4 py-1 font-medium  dark:bg-secondary dark:shadow-none shadow-md '
                                value={filterMethod}>
                                <option value={innerText}>{innerText}</option>
                                {options && options.map(({ value, text }, index) => (
                                    <option key={index} value={value}>{text}</option>
                                ))}
                            </select>
                        )
            }
        </div>
    )
})

