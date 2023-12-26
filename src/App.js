import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './images/logo.png';
import close from './images/close.png';
import Card from './components/Card';
import loader from './images/loader3.gif';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('AscPrice');

  useEffect(() => {
    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'productData') {
        // Handle the product data
        console.log('Product Data from Content Script:', message.data);

        // Sort the products based on the selected filter
        const sortedProducts = sortProducts(message.data, selectedFilter);

        // Update the state or perform any other action
        setProducts(sortedProducts);
        setLoading(false);
      }
    });
  }, [selectedFilter]);

  // Function to close the extension window
  const handleExtensionClose = () => {
    window.close();
  };

  // Function to sort products based on the selected filter
  const sortProducts = (products, filter) => {
    return products.slice().sort((a, b) => {
      if (filter === 'AscPrice') {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (filter === 'DecPrice') {
        return parseFloat(b.price) - parseFloat(a.price);
      }
      return 0;
    });
  };

  // Function to handle filter change
  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setSelectedFilter(newFilter);

    // Sort the products based on the new filter
    const sortedProducts = sortProducts(products, newFilter);

    // Update the state with the sorted products
    setProducts(sortedProducts);
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
          <select value={selectedFilter} onChange={handleFilterChange}>
            <option value="AscPrice">Ascending price</option>
            <option value="DecPrice">Decreasing price</option>
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
              <Card key={index} product={product} setLoading={setLoading}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;



// import React, { useEffect, useState } from 'react';
// import './App.css';
// import logo from './images/logo.png';
// import close from './images/close.png';
// import Card from './components/Card';
// import loader from './images/loader3.gif';
// function App() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

  
//   useEffect(() => {
//     // Listen for messages from the content script
//     chrome.runtime.onMessage.addListener((message) => {
//       if (message.type === 'productData') {
//         // Handle the product data
//         console.log('Product Data from Content Script:', message.data);
//         // Update the state or perform any other action
//         setProducts(message.data);
//         setLoading(false);
//       }
//     });
//   }, []);

  



//  // Function to close the extension window
//  const handleExtensionClose = () => {
//   window.close();
// };
//   return (
//     <div className="App" style={{ width: '400px', height: '590px', paddingTop: '10px', backgroundColor: '#1f2937' }}>

//   <div className="logo&X" style={{ paddingLeft: '20px', paddingRight: '20px', marginTop: '10px', marginRight: '26px', marginLeft: '26px', height: '10vh', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '20px' }}>
//         <img src={logo} alt="Logo" style={{ height: '40px', width: 'auto' }} draggable={false} />
//         <a href="#" onClick={handleExtensionClose}>
//           <img src={close} alt="Close" style={{ height: '20px', width: 'auto', cursor: 'pointer' }} draggable={false} />
//         </a>
//       </div>

//       <div style={{ paddingLeft: '20px', paddingRight: '20px', marginTop: '26px', marginRight: '26px', marginLeft: '26px', height: '60px', backgroundColor: '#6300ff', borderRadius: '20px 20px 0px 0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
//         <text className="MontM" style={{ fontSize: '19px', color: '#fff' }}>Featured Deals</text>
//         <div className="dropdown">
//           <select>
//             <option value="AscPrice">Ascending price</option>
//             <option value="DecPrice">Decreasing price</option>
//           </select>
//         </div>
//       </div>

//       <div className="products scrollbar scrollbar-indigo bordered-indigo" style={{ paddingTop: '10px', marginRight: '26px', marginLeft: '26px', height: '67vh', backgroundColor: '#fff', borderRadius: '0px 0px 13px 20px', position: 'relative' }}>
//         {loading && (
//           <div style={{ position: 'absolute', top: '50%', left: '50%', width: '300px', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#666' }}>
//             <img src={loader} style={{ height: '90px', width: 'auto' }} alt="Loader" />
//             <p className='Mont' style={{ fontSize: '19px', margin: '0', padding: '0 10px' }}>Please wait, loading...</p>
//           </div>
//         )}

//         {!loading && (
//           <div className="" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>
//             {products.map((product, index) => (
//               <Card key={index} product={product} setLoading={setLoading}/>
//             ))}
            
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;


