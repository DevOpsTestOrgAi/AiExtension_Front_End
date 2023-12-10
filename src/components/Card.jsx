import React, { useEffect } from 'react';
import card from '../images/cardV2.png';
import '../App.css';


const formatProductName = (productName) => {
  const paragraphStyle = {
    fontSize: '16px',
    color: '#333',
    margin: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  return (
    <p className='Mont' style={paragraphStyle}>
      {productName}
    </p>
  );
};

const Card = ({ product }) => {
  const { title, price, imageUrl, productUrl } = product;

  const handleMoreDetailsClick = () => {
    chrome.tabs.update({ url: productUrl });
  };
  

  return (
    <div style={{ marginBottom: '10px', position: 'relative', textAlign: 'right' }}>
      <img src={card} alt="Card" style={{ height: '115px', width: 'auto', marginBottom: '10px' }} draggable={false} />

      <div className='infoProduct' style={{ position: 'absolute', top: '50%', right: '1%', transform: 'translate(0, -55%)', alignItems: 'center', textAlign: 'left', backgroundColor: '', width: "303px", display: 'flex' }}>

        <div style={{ borderRadius: '25px', overflow: 'hidden' }}>
          <img
            src={imageUrl}
            alt="product"
            style={{ height: '115px', width: '115px', marginRight: '10px', borderRadius: '25px' }}
            draggable={false}
          />
        </div>

        <div style={{ backgroundColor: "", width: "160px" }}>
          {formatProductName(title)}
          <p className='MontB' style={{ fontSize: '20px', color: '#000', margin: '0px 0px 7px 0px', fontWeight: 'bold' }}>{price}</p>
          <button className='MoreBtn MontB' onClick={handleMoreDetailsClick}>
            More Details
            <span style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '8px solid white', marginRight: '5px', }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;



// import React from 'react';
// import card from '../images/card.png';
// import product from '../images/product.jpg';
// import '../App.css';

// const formatProductName = (productName) => {
//   const paragraphStyle = {
//     fontSize: '16px',
//     color: '#333',
//     margin: '0',
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap',
//   };

//   return (
//     <p className='Mont' style={paragraphStyle}>
//       {productName}
//     </p>
//   );
// };

// const Card = () => {
//   const productName = 'Anycast M2 2CORE Very Long Product Name';
//   const productPrice = '120 Dhs';

//   return (
//     <div style={{ marginBottom: '10px', position: 'relative', textAlign: 'right' }}>
//       <img src={card} alt="Card" style={{ height: '115px', width: 'auto', marginBottom: '10px' }} draggable={false} />

//       <div className='infoProduct' style={{ position: 'absolute', top: '50%', right: '1%', transform: 'translate(0, -55%)', alignItems: 'center', textAlign: 'left', backgroundColor: '', width: "303px", display: 'flex' }}>

//         <div style={{ borderRadius: '25px', overflow: 'hidden' }}>
//           <img
//             src={product}
//             alt="product"
//             style={{ height: '115px', width: '115px', marginRight: '10px', borderRadius: '25px' }}
//             draggable={false}
//           />
//         </div>

//         <div style={{ backgroundColor: "", width: "160px" }}>
//           {formatProductName(productName)}
//           <p className='MontB' style={{ fontSize: '20px', color: '#000', margin: '0px 0px 7px 0px', fontWeight: 'bold' }}>{productPrice}</p>

//           <button className='MoreBtn MontB'>
//             More Details
//             <span style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '8px solid white', marginRight: '5px', }} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
