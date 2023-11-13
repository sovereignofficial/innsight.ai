
export const RowImage: React.FC<{ imageAddress: string | null }> = ({ imageAddress }) => {
    return (
        <div className=" flex items-center justify-center relative overflow-hidden sm:w-24 sm:h-16 lg:w-28 lg:h-20 mx-auto ">
            {imageAddress
                ? (<img className="object-cover rounded-lg w-full h-full" src={imageAddress} />)
                : (<h4>Image not found.</h4>)
            }
        </div>)
}
