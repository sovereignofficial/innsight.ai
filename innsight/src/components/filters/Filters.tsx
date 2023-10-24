import { createContext } from "react";
import { FilterItem } from "./FilterItem";
import { FiltersType } from "~/types/filters.d";

const FilterContext = createContext({});

const Filters: FiltersType = ({ children }) => {

    return <FilterContext.Provider value={{}}>
        <div className={`flex justify-start items-center h-full `}>
            <div className="flex items-center flex-wrap">
                {children}
            </div>
        </div>
    </FilterContext.Provider>
}

Filters.FilterItem = FilterItem

export default Filters