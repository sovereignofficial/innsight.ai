import { createContext } from "react";
import { FilterItem } from "./FilterItem";
import { FiltersType } from "~/types/filters.d";

const FilterContext = createContext({});

const Filters: FiltersType = ({ children }) => {

    return <FilterContext.Provider value={{}}>
        <div className={`flex justify-start items-center h-full py-1 `}>
            <div className="flex items-center ">
                {children}
            </div>
        </div>
    </FilterContext.Provider>
}

Filters.FilterItem = FilterItem

export default Filters