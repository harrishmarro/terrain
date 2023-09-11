import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebase";

function Dummy() {
    const [imageUrls, setImageUrls] = useState([]);
    const [textUrl,setTextUrl]= useState('')
    const imagesListRef = ref(storage, "images/");
    const textListRef =ref(storage,"result");
    const [textContent, setTextContent] = useState(null);

    useEffect(() => {
      // Reference to your text file in Firebase Storage
      const textFileRef = ref(storage, "result/result.txt");
  
      // Get the download URL of the text file
      getDownloadURL(textFileRef)
        .then((url) => {
          // Fetch the content of the text file
          fetch(url)
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
              setTextContent(data);
            })
            .catch((error) => {
              console.error("Error fetching text file:", error);
            });
        })
        .catch((error) => {
          console.error("Error getting text file URL:", error);
        });
    }, []);

    useEffect(() => {
    listAll(imagesListRef).then((response) => {
      if (response.items.length>0) {
        const latestItem = response.items[0]; 
        getDownloadURL(latestItem).then((url) => {
          setImageUrls([url]);
        });
      }
    })
}, []);
  return (
    <div>
    <div className="h-screen bg-center bg-no-repeat bg-cover flex  w-screen h-screen bg-[url('https://cdn.discordapp.com/attachments/810493382480494632/1148606220488421376/RH-2.jpg')]">
             {imageUrls.map((url) => {
          return <img src={url} />;
        })}
      
    </div>
    </div>
  )
}

export default Dummy