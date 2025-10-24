import { useEffect } from 'react'
import encryptKey, { decryptKey } from '../utils/encryptKey';

const Test = () => {
  const key = "mynameiskaifkhan";
  const password = "#Kaifkhan1345$";

  useEffect(() => {
   (async() => {
   const encryptedval = await encryptKey(key, password);
   console.log("Encrypted val:- ", encryptedval);

   const decryptedVal = await decryptKey(encryptedval, password);
   console.log("Decrypted value:- ", decryptedVal);
   })()
  }, [])
  
  return (
    <div>
      {JSON.stringify('Something')}
    </div>
  )
}

export default Test
