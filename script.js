// Check if the browser supports the Web Speech API
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const textArea = document.getElementById('text');

// Continuous listening and interim results
recognition.continuous = true;
recognition.interimResults = true;

let finalTranscript = ''; // Store the final transcript

recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
        } else {
            interimTranscript += event.results[i][0].transcript;
        }
    }

    // Append the final transcript without replacing manually entered text
    textArea.value = finalTranscript + interimTranscript;

    // Auto-scroll to the bottom of the textarea
    textArea.scrollTop = textArea.scrollHeight;
};

// Start speech recognition
startBtn.addEventListener('click', () => {
    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

// Stop speech recognition
stopBtn.addEventListener('click', () => {
    recognition.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

// Automatically restart recognition when it stops
recognition.onend = () => {
    if (!stopBtn.disabled) {
        recognition.start(); // Restart recognition if the user hasn't manually stopped it
    }
};

// Handle errors
recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};
