// background.js

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'productUrl') {
    // Fetch data from the API using the product URL
    fetch(`http://20.252.40.243/api/v1/suggestions?url=${encodeURIComponent(message.url)}`)
      .then((response) => response.json())
      .then((json) => {
        // Send the data back to the content script
        chrome.tabs.sendMessage(sender.tab.id, { type: 'productData', data: json });
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }
});


// // Listen for messages from the content script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === 'productUrl') {
//     // Fetch data from the API using the product URL
//     fetch(`http://20.252.40.243/api/v1/suggestions?url=${encodeURIComponent(message.url)}`)
//       .then((response) => response.json())
//       .then((json) => {
//         // Send the data back to the content script
//         chrome.tabs.sendMessage(sender.tab.id, { type: 'productData', data: json });
//       })
//       .catch((error) => {
//         console.error('Error fetching data from API:', error);
//       });
//   }
// });


// // Listen for messages from the content script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'productUrl') {
//       // Log the received product URL
//       console.log('Received product URL:', message.url);
  
//       // Now, you can send this URL to your scraping API or perform any other actions
//       // ...
//     }
//   });
  
   //close extension 
   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'closeExtension') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.remove(tabs[0].id);
      });
    }
  });