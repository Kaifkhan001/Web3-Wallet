import { useEffect, useState } from "react";
import initDB, { getItem } from "../utils/DbInteration";
import { privateKey, publicKey } from "../utils/ConstValues";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
    const [DbPublicKey, setDbPublicKey] = useState('');
    const [hashedPrivateKey, setHashedPrivateKey] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);


   const loadKeys = async() => {
       try {
        const key = await getItem(publicKey) as string;
       setDbPublicKey(key);
       const privKey = await getItem(privateKey) as string;
       setHashedPrivateKey(privKey);
       console.log("Public key from the indexedDB:- ", key);
       console.log("Hashed Private key:- ", privKey);
       setIsLoading(false);
       } catch (error: unknown) {
        console.log("Some erorr got while fetching data from the db", error);
        if(error instanceof Error){
          setError(error.message.startsWith('No record found') ? null : error.message);
          toast.error(error.message);
        }else{
          console.log("Unexpected Error:-", error);
        }
        return;
       }finally{
        setIsLoading(false);
       }
     }
     useEffect(() => {
      initDB();
      loadKeys();
     }, []); 

     useEffect(() => {
        if(isLoading) return;
        if(error) {
            toast.error("Something went wrong, Please click retry");
            return;
        }

        if(DbPublicKey && hashedPrivateKey) navigate('/wallet');
        else navigate('/create-wallet');
     }, [isLoading, DbPublicKey, hashedPrivateKey, error]);
      
    
     
     if(error){
         return <div>
            <h5>Something went Wrong!!!</h5>
            <button onClick={loadKeys} className="bg-red-50 text-black px-2 py-1 rounded-xl">Retry</button>
        </div>
     }

    return (
        <div className="flex w-full min-h-screen items-center justify-center">
            {isLoading ? (
                <div className="flex items-center justify-center gap-2.5">
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="15" stroke="#007bff" stroke-width="3" fill="none" stroke-dasharray="23.56" stroke-dashoffset="11.78">
                <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="1s" repeatCount="indefinite" />
                </circle>
            </svg>
            Loading..
            </div>
            ) : "Redirecting...."}
        </div>
    )
}

export default Home
