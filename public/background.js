// background.js

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'productUrl') {
      // Log the received product URL
      console.log('Received product URL:', message.url);
  
      // Now, you can send this URL to your scraping API or perform any other actions
      // ...
    }
  });
  
   //close extension 
   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'closeExtension') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.remove(tabs[0].id);
      });
    }
  });