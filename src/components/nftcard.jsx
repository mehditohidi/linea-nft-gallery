const NftCard = ({ image, id, title, address, description, attributes }) => {
    return (
        <div className="w-full sm:w-1/5 mr-2 mb-4 bg-slate-100 rounded-md border border-white overflow-hidden">
            <img className="w-full max-h-[300px] rounded-t-md border border-yellow-700" key={id} src={image} alt={title}></img>
            <div className="p-2">
                <div className="flex mb-2">
                    <div className="flex-grow">
                        <h3 className="text-lg">{title}</h3>
                        <p>{`${id.slice(0, 4)}...${id.slice(id.length - 4)}`}</p>
                    </div>
                    <div className="flex mr-2 max-w-[150px]">
                        <a 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-700 text-sm truncate" 
                            href={`https://etherscan.io/token/${address}`}
                        >
                            {`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}
                        </a>
                    </div>
                </div>
                <p>{description ? description.slice(0, 150) : "No Description"}</p>
            </div>
            <div className="flex flex-wrap justify-center items-center p-2">
                {attributes?.length > 0 && attributes.map((attribute, index) => (
                    <div key={index} className="w-1/2 mb-1 flex flex-col items-start">
                        <p className="font-bold">{attribute.trait_type}:</p>
                        <p className="text-sm">{attribute.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NftCard;
