// contentScript.js

let hasSentRequest = false;

// Function to send the product URL to the background script
const sendProductUrlToBackground = (productUrl) => {
  // Send a message to the background script only if the request has not been sent
  if (!hasSentRequest) {
    // Set the flag to true to indicate that the request has been sent
    hasSentRequest = true;
    // Send the product URL to the background script
    chrome.runtime.sendMessage({ type: 'productUrl', url: productUrl });
  }
};

// Function to check if the current URL matches the product pattern
const isProductUrl = (url) => {
  // Modify this regular expression to match the URL pattern of your products
  const productUrlPattern = /^https:\/\/www\.jumia\.ma\/.*\.html$/;
  return productUrlPattern.test(url);
};

// Function to handle URL changes
const handleUrlChange = () => {
  // Get the current URL of the page
  const currentUrl = window.location.href;

  // Check if the current URL is a product URL
  if (isProductUrl(currentUrl)) {
    // Send the product URL to the background script
    sendProductUrlToBackground(currentUrl);
  } else {
    // Reset the flag if the user navigates away from the product page
    hasSentRequest = false;
  }
};

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'productData') {
    // Send the product data to the React app component
    chrome.runtime.sendMessage({ type: 'productData', data: message.data });
  }
});

// Set up a mutation observer to detect changes in the URL
const observer = new MutationObserver(() => {
  handleUrlChange();
});

// Observe changes in the <body> element, which can indicate URL changes in some cases
observer.observe(document.body, { subtree: true, childList: true });

// Initial check for the URL when the content script is injected
handleUrlChange();



// // contentScript.js

// // Function to check if the current URL matches the product pattern
// const isProductUrl = (url) => {
//   // Modify this regular expression to match the URL pattern of your products
//   const productUrlPattern = /^https:\/\/www\.jumia\.ma\/.*\.html$/;
//   return productUrlPattern.test(url);
// };

// // Function to handle URL changes
// const handleUrlChange = () => {
//   // Get the current URL of the page
//   const currentUrl = window.location.href;

//   // Check if the current URL is a product URL
//   if (isProductUrl(currentUrl)) {
//     // Send the product URL to the background script
//     chrome.runtime.sendMessage({ type: 'productUrl', url: currentUrl });
//   }
// };

// // Listen for messages from the background script
// chrome.runtime.onMessage.addListener((message) => {
//   if (message.type === 'productData') {
//     // Send the product data to the React app component
//     chrome.runtime.sendMessage({ type: 'productData', data: message.data });
//   }
// });

// // Set up a mutation observer to detect changes in the URL
// const observer = new MutationObserver(() => {
//   handleUrlChange();
// });

// // Observe changes in the <body> element, which can indicate URL changes in some cases
// observer.observe(document.body, { subtree: true, childList: true });

// // Initial check for the URL when the content script is injected
// handleUrlChange();

