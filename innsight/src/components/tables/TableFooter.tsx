import { useReduxDispatch } from '~/hooks/reduxHooks'
import { nextPage, previousPage } from '~/redux/slices/tableSlice';
import { TableFooterInterface } from '~/types/table.d';

export const TableFooter: React.FC<TableFooterInterface> = ({ rows, pages, currPage }) => {
    const dispatch = useReduxDispatch();

    return (
        <div className='w-11/12 mx-auto rounded-xl p-4 dark:bg-secondary dark:shadow-none shadow-md flex justify-between items-center' >
            <p><strong>{rows?.length}</strong> results found. Showing <strong>{currPage}</strong> to {pages.length === 0 ? 0 : pages?.length - 1}.</p>
            <div className="flex gap-2 items-center ">
                <button disabled={currPage === 0} onClick={() => dispatch(previousPage())} className="btn-outlined">Previous</button>
                <button disabled={currPage === pages?.length - 1} onClick={() => dispatch(nextPage())} className="btn">Next</button>
            </div>
        </div>
    )
}
