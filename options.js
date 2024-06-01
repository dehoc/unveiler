document.addEventListener('DOMContentLoaded', function() {
  // Load saved options
  chrome.storage.sync.get('geminiKeyOption', function(data) {
      if (data.geminiKeyOption) {
          document.getElementById('gemini-key-option').value = data.geminiKeyOption;
      }
  });

  // Save options when the form is submitted
  document.getElementById('options-form').addEventListener('submit', function(event) {
      event.preventDefault();
      const geminiKeyOption = document.getElementById('gemini-key-option').value;
      chrome.storage.sync.set({ geminiKeyOption }, function() {
          alert('Options saved.');
      });
  });
});
