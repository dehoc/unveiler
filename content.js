// Function to extract text content from the webpage
function extractText() {
  console.debug();
  return document.body.innerText;
}

// Function to send text to Gemini for summarization
async function summarizeTextInGemini(text) {
  try {
    const result = await chrome.storage.sync.get('geminiKeyOption');
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${result.geminiKeyOption}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "contents": [{"parts":[
        {"text": "Summarize the text content provided including key details and insights about the topic. In the summary, first add a title and then include a brief 1-2 sentence to briefly summarize and explain the topics discussed in the article. Then, expand further on the content by using bullet points but don't exceed 8 bullet points."}, 
        {text}]}
    ]})
  });
 
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
