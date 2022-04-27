import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from "./components/Carousel/Carousel"
import './App.css';

function App() {
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [isdata, setData] = useState({});
 
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError(false);
      axios.get("http://localhost:8080/ViewImage")
        .then(res => { // then print response status
          if(res.data.success === true){
            setData(res.data.listall);
            setLoading(true);
          }
        })
    } catch (error) { setError(true); }
  };

return (<>
    {isError && <div>Something went wrong ...</div>}
    <div className="banners">
          {isLoading === false ? (
            <div>Loading ...</div>
          ) : ( <>
             
        <Carousel show={3} >
         {isdata.map((item, index) => (
            <div  key={item.id} >
              <div className="carousel__sec">
                <img className="image-card" src={item.image} style={{width: '100%'}}/>
                <h2> {item.title} </h2>
              </div>
           </div>
          ))}  
        </Carousel>
              
        </> )}
    </div>

    {/* Json output */}
    <pre>{JSON.stringify(isdata, null, 2)} </pre>

    
</>
  );
}
export default App;