import Table from "~/components/tables/Table"
import { TableFooter } from "~/components/tables/TableFooter"
import { useGuest } from "~/hooks/useGuests"
import { RowTools } from "~/components/tables/RowTools"
import { ToolOption } from "~/components/tables/ToolOption"
import { BiTrash } from "react-icons/bi"
import { useGPT } from "~/hooks/useGPT"
import { Button } from "~/components/Button"
import Filters from "~/components/filters/Filters"
import { FilterItem } from "~/components/filters/FilterItem"
import { EditGuestModalForm } from "~/components/forms/EditGuestModalForm"
import { Guest } from "~/types/guests.d"
import { TableRow } from "~/types/table.d"
import { useCallback } from "react"

export const Guests: React.FC = () => {
  const { isGuestsLoading, tableData, pages, currPage, isUpdGuestLoading, updateGuestFn, deleteGuestFn } = useGuest()
  const { createNewGuestsByAI, isTempGuestsLoading } = useGPT();


 const pageDataToJSXRows = useCallback(function(pageData: Guest[]) {
  const rows: TableRow[] = [];
  pageData?.map(item => {
    rows.push({
      cells: [
        (<div>
          <p >{item.fullName}</p>
        </div>),
        (<div>
          {item.email}
        </div>),
        (<div>
          {item.nationality}
        </div>),
        (<div>
          {item.nationalID}
        </div>),
        (<div className="mx-auto w-20 h-10 aspect-square relative overflow-hidden rounded-md">
          <img className="w-full h-full object-cover" src={`${item.countryFlag}`} />
        </div>),
        (<RowTools>
          <ToolOption onClick={() => { }}><EditGuestModalForm guest={item} isLoading={isUpdGuestLoading} updateGuest={updateGuestFn} /></ToolOption>
          <ToolOption onClick={() => { deleteGuestFn(item.id) }}><BiTrash />Delete</ToolOption>
        </RowTools>)
      ]
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
      <div className="page-header" >
        <h1>Guests</h1>
        <div className="flex items-center gap-2">
          <Filters>
            <FilterItem type="searchInput" innerText="Search for a guest" />
          </Filters>
          <Button onClick={createNewGuestsByAI} type="default" isLoading={isTempGuestsLoading} text="Create guests by GPT" />
        </div>
      </div>

      <Table isLoading={isGuestsLoading}>
        <Table.Head headers={tableData.headers} />
        <Table.Body renderRows={() => pageDataToJSXRows(pages[currPage])} />
      </Table>
      <TableFooter rows={tableData.rows} currPage={currPage} pages={pages} />
    </div>
  )
}
