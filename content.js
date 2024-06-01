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
      {"text": "Summarize the text content provided including key details and insights about the topic. In this summary, first include a brief 1-2 sentence summary briefly summarizing and explaining the topics discussed in the article. Then, expand further on these ideas by using bullet points."}, 
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
