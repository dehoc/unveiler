document.addEventListener('DOMContentLoaded', () => {
    const summarizeButton = document.getElementById('summarizeButton');
    const summaryOutput = document.getElementById('summaryOutput');

    chrome.runtime.onMessage.addListener(
      (md) => {
        summaryOutput.innerHTML = md;
        summarizeButton.style.display = 'none';
      }
    );
    
    summarizeButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['marked.js', 'content.js']
        });
      });
    });
  });
  