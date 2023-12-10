import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './images/logo.png';
import close from './images/close.png';
import Card from './components/Card';
import loader from './images/loader3.gif';
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'productData') {
        // Handle the product data
        console.log('Product Data from Content Script:', message.data);
        // Update the state or perform any other action
        setProducts(message.data);
        setLoading(false);
      }
    });
  }, []);

  // useEffect(() => {
  //   fetch('http://20.252.40.243/api/v1/suggestions?url=https://www.jumia.ma/lenovo-ensemble-clavier-azerty-et-souris-3-boutons-1000-dpi-usb-40954991.html')
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setProducts(json);
  //       setLoading(false);
  //       console.log('API Response:', json);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //       setLoading(false);
  //     });
  // }, []);



 // Function to close the extension window
 const handleExtensionClose = () => {
  window.close();
};
  return (
    <div className="App" style={{ width: '400px', height: '590px', paddingTop: '10px', backgroundColor: '#1f2937' }}>
      <div className="logo&X" style={{ paddingLeft: '20px', paddingRight: '20px', marginTop: '10px', marginRight: '26px', marginLeft: '26px', height: '10vh', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '20px' }}>
        <img src={logo} alt="Logo" style={{ height: '40px', width: 'auto' }} draggable={false} />
        <a href="#" onClick={handleExtensionClose}>
          <img src={close} alt="Close" style={{ height: '20px', width: 'auto', cursor: 'pointer' }} draggable={false} />
        </a>
      </div>

      <div style={{ paddingLeft: '20px', paddingRight: '20px', marginTop: '26px', marginRight: '26px', marginLeft: '26px', height: '60px', backgroundColor: '#6300ff', borderRadius: '20px 20px 0px 0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
        <text className="MontM" style={{ fontSize: '19px', color: '#fff' }}>Featured Deals</text>
        <div className="dropdown">
          <select>
            <option value="price">Price</option>
            <option value="review">Review</option>
          </select>
        </div>
      </div>

      <div className="products scrollbar scrollbar-indigo bordered-indigo" style={{ paddingTop: '10px', marginRight: '26px', marginLeft: '26px', height: '67vh', backgroundColor: '#fff', borderRadius: '0px 0px 13px 20px', position: 'relative' }}>
        {loading && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '300px', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#666' }}>
            <img src={loader} style={{ height: '90px', width: 'auto' }} alt="Loader" />
            <p className='Mont' style={{ fontSize: '19px', margin: '0', padding: '0 10px' }}>Please wait, loading...</p>
          </div>
        )}

        {!loading && (
          <div className="" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>
            {products.map((product, index) => (
              <Card key={index} product={product} />
            ))}
            
          </div>
        )}
      </div>
    </div>
  );
}

export default App;



{/* {products.map((productGroup, groupIndex) => (
              <div key={groupIndex}>
                {productGroup.products.map((product, index) => (
                  <Card key={index} product={product} />
                ))}
              </div>
            ))} */}
            
