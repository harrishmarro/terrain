import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,

} from "firebase/storage";
import { storage } from "../firebase";
import Dummy from "./Dummy";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const[redirect,setRediect]= useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
    setRediect(true);
    
  };
  return (
    <div>
      {redirect ? (
        <Dummy/>
      ):
      <div className="h-screen bg-center bg-no-repeat bg-cover flex  w-screen h-screen bg-[url('https://cdn.discordapp.com/attachments/810493382480494632/1148606220488421376/RH-2.jpg')]">
              <div className='w-full bg-cover bg-center flex-center flex-row bg-transparent max-w-md m-auto backdrop-blur-md bg-white/20 rounded-lg drop-shadow-2xl py-10 px-16'>
              <h1 className='text-3xl text-black  font-medium mt-5 mb-6 text-center'>
                      Terrain Recoginition
              </h1>
                  <form>
                      <div>
                          <label htmlFor='Input File' className='text-black'>Input File</label>
                              <input
                              type="file"
                              onChange={(event) => {
                                setImageUpload(event.target.files[0]);
                              }}
                              className={'w-full p-2 text-primary rounded-md outline-none border-2 border-indigo-600 text-sm transition duration-150 ease-in-out mb-4'}
                              placeholder='file'  required
                              />
                    </div>
                  </form>
                      <div className='flex justify-center items-center mt-6'>
                        <button
                          onClick={uploadFile}
                              className={`bg-blue-700 cursor-pointer py-2 px-16 text-l text-black rounded focus:outline-none `}
                          >
                              Recogonize
                          </button>
                      </div>
              </div>
          </div>
       }
              
    </div>    
    );
};


export default App;