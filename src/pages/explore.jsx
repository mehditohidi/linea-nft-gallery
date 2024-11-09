import { useState, useEffect, useRef } from 'react';
import NftCard from '../components/nftcard';
import { fetchNFTs } from '../utils/fetchNFTs';

const Explore = () => {
    const [owner, setOwner] = useState("");
    const [contractAddress, setContractAddress] = useState("");
    const [NFTs, setNFTs] = useState("");
    const [showPopup, setShowPopup] = useState(false);  // State to manage popup visibility
    const nftSectionRef = useRef(null);


    const address = "0x6e78b133945b3c1862E7C61a7c984E2c06350388";

    // Copy to clipboard function
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("Copied to clipboard!"))
            .catch((err) => alert("Failed to copy!"));
    };

    // Scroll to the NFT section when NFTs are loaded
    useEffect(() => {
        if (NFTs && nftSectionRef.current) {
            nftSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [NFTs]);

    return (
        <div>
            <header className='py-24 mb-12 w-full alchemy relative'>
                {/* Logo Section */}
                <div className="absolute top-4 left-4">
                    <img src="/logo.png" alt="Gallery Logo" className="h-16 w-auto" />
                </div>

                {/* Coffee Logo - Click to Show Popup */}
                <div className="absolute bottom-4 right-4 cursor-pointer" onClick={() => setShowPopup(true)}>
                    <img src="/buymeacoffee.png" alt="Buy Me a Coffee" className="h-16 w-auto" />
                </div>

                {/* Main Header Content */}
                <div className="flex flex-col items-center mb-12">
                    <div className='mb-16 text-white text-center'>
                        <h1 className='text-5xl font-bold font-body mb-2 headerTxt'>
                            Explore NFTs On Linea
                        </h1>
                        <p>The easiest way to locate your desired NFTs on Linea Network.</p>
                        <p>Build On Linea :)</p>
                    </div>
                    <div className='flex flex-col items-center justify-center mb-4 w-5/6 gap-y-2'>
                        <input
                            className="border rounded-sm focus:outline-none py-2 px-3 w-full text-center"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            placeholder='Enter Your Address'
                        />
                    </div>
                    <div className='w-5/6 flex justify-center'>
                        <button
                            className='py-3 bg-purple-500 text-white rounded-sm w-full hover:bg-purple-800'
                            onClick={() => { fetchNFTs(owner, contractAddress, setNFTs) }}
                        >
                            Search
                        </button>
                    </div>
                    <div className="createdBy mt-20 text-white">
                        Developed By <a className='text-blue-200' href='https://x.com/mehditohidi' target='_blank' rel="noopener noreferrer">themeht</a> for Build On Linea
                    </div>
                    <div className="createdBy mt-2 text-white">Github: <a className='text-blue-200' href='https://github.com/mehditohidi' target='_blank' rel="noopener noreferrer">mehditohidi</a></div>
                    <div className="createdBy mt-2 text-white">Website: <a className='text-blue-200' href='https://mehditohidi.com' target='_blank' rel="noopener noreferrer">mehditohidi.com</a></div>
                    <div className="createdBy mt-2 text-white">Linkedin: <a className='text-blue-200' href='https://linkedin.com/in/mehditohidi' target='_blank' rel="noopener noreferrer">mehditohidi</a></div>
                </div>
            </header>

            {/* Popup for "Buy me a Coffee" */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2 className="text-lg font-bold text-center text-white">If you enjoyed, buy me a coffee with Linea!</h2>
                        <p
                            className="text-center text-white p-2 text-sm cursor-pointer"
                            onClick={() => copyToClipboard(address)} 
                        >
                            {address}
                        </p>
                        <button
                            className="mt-4 px-4 py-2 bg-purple-500 w-3/4 text-white rounded hover:bg-purple-700"
                            onClick={() => setShowPopup(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <section className='flex flex-wrap justify-center' ref={nftSectionRef}>
                {NFTs ? NFTs.map(NFT => (
                    <NftCard key={NFT.id.tokenId} image={NFT.media[0].gateway} id={NFT.id.tokenId} title={NFT.title} address={NFT.contract.address} description={NFT.description} attributes={NFT.metadata.attributes} />
                )) : <div className='text-white'>No NFTs Yet ! :(</div>}
            </section>
        </div>
    );
};

export default Explore;
