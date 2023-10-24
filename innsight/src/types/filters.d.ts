export type FilterInputs = "btn" | "selectBox" | 'searchInput'

export interface OptionInterface{
    value:string,
    text:string,
}


export interface FilterItemInterface{
    value?:string | number
    type:FilterInputs,
    innerText:string,
    options?:OptionInterface[]
}



export type FiltersType = React.FC<{children:ReactNode}> & {
    FilterItem:React.FC<FilterItemInterface>
}

export enum FilterKey{
    NoDiscount = 'No discount',
    WithDiscount = 'With discount',
    PriceHigh = 'priceHigh',
    PriceLow  = 'priceLow',
    UNCONFIRMED = 'Unconfirmed',
    CHECKEDIN = 'Checked in',
    CHECKEDOUT = 'Checked out',
    DateNew = 'dateNew',
    DateOld = 'dateOld',
 }