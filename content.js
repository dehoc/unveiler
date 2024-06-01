// Function to extract text content from the webpage
function extractText() {
  console.debug();
  return document.body.innerText;
}

// Function to send text to Gemini for summarization
async function summarizeTextInGemini(text) {
  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=INSERT GEMINI API KEY HERE', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "contents": [{"parts":[
      {"text": "Summarize the following text content using bullet points. Summarize the key elements, and provide insight on the topics discussed in the article. Keep the entire response no more than 500 words long."}, 
      {text}]}
    ]})
  });
 
  try {
    const data = await response.json();
    return data.candidates[0].content.parts.map(p => p.text).join(" ");
  } catch (e) {
    return e.toString();
  }
}

// Main execution
summarizeTextInGemini(extractText()).then(summary => {
  const md = marked.parse(summary);
  chrome.runtime.sendMessage(md); // Send the md to popup script.
});
