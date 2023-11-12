import { RowTools } from "~/components/tables/RowTools"
import { AddCabinModalForm } from "~/components/forms/AddCabinModalForm"
import Table from "~/components/tables/Table"
import { RowImage } from "~/components/tables/RowImage"
import { ToolOption } from "~/components/tables/ToolOption"
import { BiTrash } from "react-icons/bi"
import { TableFooter } from "~/components/tables/TableFooter"
import { EditCabinModalForm } from "~/components/forms/EditCabinModalForm"
import Filters from "~/components/filters/Filters"
import { useCabins } from "~/hooks/useCabins"
import { useGPT } from "~/hooks/useGPT"
import { Button } from "~/components/Button"
import { TableRow } from "~/types/table.d"
import { Cabin } from "~/types/cabins.d"
import { useCallback } from "react"

const Cabins = () => {

  const { isCabinsLoading, deleteFn, tableData, pages, currPage,cabins }
    = useCabins()

  const { createNewCabinsByAI, isAICabinsLoading } = useGPT();
  
  const pageDataToJSXRows = useCallback((pageData: Cabin[]) => {
    const rows: TableRow[] = [];

    pageData?.map(cabin => {
      rows.push({
        cells: [
          (<RowImage imageAddress={cabin.image} />),
          cabin.name, (<p>Fits up for <strong>{cabin.maxCapacity}</strong> guests.</p>),
          `$${cabin.regularPrice}`, (<p className="dark:text-green-300 text-green-500">${cabin.discount}</p>),
          (<RowTools>
            <ToolOption onClick={() => { }}><EditCabinModalForm cabin={cabin} /></ToolOption>
            <ToolOption onClick={() => deleteFn(cabin.id!)}><BiTrash /> Delete</ToolOption>
          </RowTools>)]
      })
    });

    return (
      <tbody>
        {rows.map(({ cells }, indexA) => (
          <tr className='dark:hover:bg-zinc-900/50 hover:bg-zinc-100' key={indexA}>
            {cells.map((cell, indexB) => (
              <td className='border-t dark:border-zinc-800 border-zinc-300 p-1' key={indexB + 100}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    )
  },[pages,currPage])


  return (
    <div className="page">
      <div className="page-header">
        <h1>Cabins</h1>
        <div className="flex items-center gap-2 flex-wrap px-2 sm:mx-auto lg:mx-0">
          <Filters>
            <Filters.FilterItem type="btn" innerText="All" />
            <Filters.FilterItem type="btn" innerText="No discount" />
            <Filters.FilterItem type="btn" innerText="With discount" />
            <Filters.FilterItem type="selectBox" innerText="Sort by" options={[
              {
                value: 'priceHigh',
                text: "Sort by price ↑"
              },
              {
                value: "priceLow",
                text: "Sort by price ↓"
              }
            ]} />
          </Filters>
          <AddCabinModalForm />
          <Button text="Create cabins by GPT & DALL-E" type="default" isLoading={isAICabinsLoading} onClick={()=>createNewCabinsByAI(cabins!)} />
        </div>
      </div>

      <Table isLoading={isCabinsLoading}>
        <Table.Head headers={tableData.headers} />
        <Table.Body renderRows={() => pageDataToJSXRows(pages[currPage])} />
      </Table>
      <TableFooter rows={tableData.rows} currPage={currPage} pages={pages} />
    </div>
  )
}

export default Cabins;