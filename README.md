# 🎧 Spectranaut

**Spectranaut** is an interactive audio visualization tool that transforms any audio file into a live spectrogram. With a variety of color themes and support for local file uploads, Spectranaut brings sound to life—visually.

## 🎙️ What’s New?

Spectranaut now supports **AI-powered speech-to-text transcription**, using Whisper from Hugging Face. Upload a spoken audio file (or select from existing list) and get an instant transcript. Perfect for analyzing speech, podcasts, lectures, or lyrics.


## What is a Spectogram?

A **Spectrogram** is a visual representation of the frequencies present in a sound over time. It displays frequency on the vertical axis, time on the horizontal axis, and the intensity (amplitude) of each frequency is represented by color or brightness.

## 🚀 Spectranaut Features

- 🔊 Upload or select built-in audio files to visualize.
- 🎨 Choose from a variety of dynamic color themes.
- 🎥 Real-time spectrogram visualization.
- 🧠 Learn how audio frequencies evolve over time.
- 🖱️ Click-to-play/pause interface.
- 🌈 HSLA-based theming for smooth visual gradients.
- 🤖 One-click AI-powered speech to text transcription.
- 💾 Save transcripts.

## 🚀 Live Demo

[Check out the live version of Spectranaut here.](https://spectronaut.netlify.app/)

## 🛠 Tech Stack

- React + TypeScript
- Web Audio API
- Tailwind CSS
- Canvas API


## 📝 How to Run the App Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Bgogoi123/audio-visualization.git

   ```

2. Install dependencies:

   ```bash
   cd audio-visualizer
   npm i
   ```

3. Create your Hugging Face token:

   - Go to https://huggingface.co/
   - Click on your profile icon (top right),
   - Select the option Access Tokens,
   - Confirm your identity by entering your Hugging Face account password,
   - Click on Create new token,
   - Set the token type to 'Write',
   - Enter a token name,
   - Click 'Create token',
   - Copy the value of the token and paste it in your .env file.

4. Environment Variables:

   Create a `.env` file in root directory and add your Hugging Face token as:
   ```bash
   VITE_HUGGING_FACE_TOKEN="your_hugging_face_token"
   ```

5. Run the Development Server:

   ```bash
   npm run dev
   ```

6. Open your browser and go to http://localhost:5173

## 🤖 Inspiration

**Spectrograms** Turn Sound Into Stunning, Flowing Visuals: a concept that instantly captivated me. The way frequencies transform into waves of color sparked my curiosity and inspired me to build **Spectranaut**: a tool to explore and appreciate the beauty of sound in motion.

## 📚 References

- [MDN Web Docs: Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Spectrogram - Wikipedia](https://en.wikipedia.org/wiki/Spectrogram)
- [Understanding HSLA Colors](https://colortutorial.design/hsb.html)
- [Article: Visualizing Audio as a Waveform in React](https://dev.to/ssk14/visualizing-audio-as-a-waveform-in-react-o67)
- [Spectogram Playground](https://musiclab.chromeexperiments.com/spectrogram/)
- [Whisper](https://huggingface.co/openai/whisper-large-v3)
- [HF Inference Provider](https://huggingface.co/docs/inference-providers/providers/hf-inference)
- [HF Inference API](https://huggingface.co/docs/huggingface_hub/v0.13.2/en/guides/inference)
