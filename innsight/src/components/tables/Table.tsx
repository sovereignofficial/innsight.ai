import { createContext, useState } from "react";
import { LoadingPage } from "../LoadingPage";
import { Head } from "./TableHead";
import { Body } from "./TableBody";
import { TableFooter } from "./TableFooter";
import { TableContextInterface, TableRow, TableComponent } from "~/types/table.d";


export const TableContext = createContext<TableContextInterface>({
    headers: [],
    rows: [],
    isLoading: false,
    setHeaders: null,
    setRows: null
});

const Table: TableComponent = ({ children, isLoading }) => {
    const [headers, setHeaders] = useState<string[]>([]);
    const [rows, setRows] = useState<TableRow[]>([]);
    return (
        <TableContext.Provider value={{ headers, rows, isLoading, setHeaders, setRows }}>
            <div className="w-full sm:max-w-[370px] lg:max-w-full overflow-x-scroll  rounded-xl dark:bg-secondary dark:shadow-none shadow-lg mx-auto relative p-1 ">
                {isLoading && <LoadingPage />}
                <table className='min-h-[400px] w-full table-auto'>
                    {children}
                </table>
            </div>

        </TableContext.Provider>
    )
}

Table.Head = Head;
Table.Body = Body;
Table.Footer = TableFooter;

export default Table;