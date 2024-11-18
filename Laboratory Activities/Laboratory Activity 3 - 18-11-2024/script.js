const inputBox = document.querySelector(".text-input");
const wordCountDisplay = document.querySelector(".wordcount-text");
const sentenceCountDisplay = document.querySelector(".sentencecount-text");
const softTypeAudio = document.querySelector(".soft-type-sound");
const loudTypeAudio = document.querySelector(".loud-type-sound");
const animatedText = document.querySelector('.animated-text');

function countWords(text) {
  let words = text.trim().split(/\s+/);
  words = words.filter((word) => word.trim().length > 0);

  return words.length;
}

function countSentences(text) {
  let sentences = text.trim().split(/[.?!]\s*/);
  sentences = sentences.filter((sentence) => sentence.trim().length > 0);

  return sentences.length;
}

function updateWordCount(count) {
  if (wordCountDisplay.textContent == count) {
    return;
  }

  wordCountDisplay.textContent = count;
  wordCountDisplay.classList.add('combo-animation');

  setTimeout(() => {
    wordCountDisplay.classList.remove('combo-animation');
  }, 200);

}

function updateSentenceCount(count) {
  if (sentenceCountDisplay.textContent == count) {
    return;
  }

  sentenceCountDisplay.textContent = count;
  sentenceCountDisplay.classList.add('combo-animation');

  setTimeout(() => {
    sentenceCountDisplay.classList.remove('combo-animation');
  }, 200);

}

function updateResults(text) {
  const wordCount = countWords(text);
  const sentenceCount = countSentences(text);

  updateWordCount(wordCount);
  updateSentenceCount(sentenceCount);
}

function playTypingSound(key) {
  let clone;

  if (key.length == 1 && /[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]/.test(key)) {
    clone = softTypeAudio;
    clone.currentTime = 0.05;
    clone.volume = 0.7;
  } else {
    clone = loudTypeAudio;
    clone.currentTime = 0;
    clone.volume = 1;
  }

  clone.play();
}

function playTextAnimation() {
  const text = animatedText.textContent;
  animatedText.innerHTML = ''; 

  text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.animation = `bounce 400ms ease forwards`;
      span.style.animationDelay = `${index * 60}ms`;
      animatedText.appendChild(span);
  });
}

inputBox.oninput = (event) => {
  const content = event.target.value;
  updateResults(content);
};

inputBox.onkeydown = (event) => {
  playTypingSound(event.key);
}

playTextAnimation();
setInterval(playTextAnimation, 8000);