
export const RowImage: React.FC<{ imageAddress: string | null }> = ({ imageAddress }) => {
    return (
        <div className=" flex items-center justify-center relative overflow-hidden sm:w-18 sm:h-16 md:w-28 md:h-20 mx-auto ">
            {imageAddress
                ? (<img className="object-cover rounded-lg w-full h-full" src={imageAddress} />)
                : (<h4>Image not found.</h4>)
            }
        </div>)
}
