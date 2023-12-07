// contentScript.js

// Function to send the product URL to the background script
const sendProductUrlToBackground = (productUrl) => {
  // Send a message to the background script
  chrome.runtime.sendMessage({ type: 'productUrl', url: productUrl });
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
  }
};

// Set up an interval to continuously check for URL changes
const checkUrlInterval = setInterval(() => {
  handleUrlChange();
}, 1000); // Check every second (adjust the interval as needed)

// Stop checking for URL changes when the extension popup is closed
window.addEventListener('beforeunload', () => {
  chrome.runtime.sendMessage({ type: 'closeExtension' });
  clearInterval(checkUrlInterval);
});

// Initial check for the URL when the content script is injected
handleUrlChange();

