import { memo } from "react"

export const Body: React.FC<{ renderRows: () => JSX.Element }> = memo(
    ({ renderRows }) => {
        return (
            <>
                {renderRows()}
            </>
        )
    }
)