# Language Learning Adventure Game 🎮🌍
Language Learning Adventure Game is an engaging and interactive application designed to make learning foreign languages fun and immersive. The app is a "choose your adventure" game where players navigate through chapters by making decisions based on spoken dialogue, improving their listening and speaking skills along the way.

## Key Features
<ins>Interactive Storyline </ins>: Dive into an adventurous story where your choices shape the journey. Each chapter presents different scenarios to enhance your language comprehension.
<ins>Speech Recognition </ins>:	 Players select their responses by speaking aloud, pressing the microphone icon to record their pronunciation.
<ins>Real-Time Feedback </ins>: The app evaluates your pronunciation, allowing you to progress to the next chapter if it's correct.
<ins>Practice Mode </ins>: Replay any question to perfect your pronunciation before moving forward.
<ins>Immersive Audio Experience <ins>: Hear questions and responses in the target language, improving your listening skills while engaging in the story.

## How It Works
<ins>Choose Your Path</ins>: Listen to the dialogue and choose your response by tapping on the desired option.
<ins>Speak to Progress</ins>: Hold the microphone icon and say your chosen response aloud.
<ins>Feedback and Practice</ins>: If your pronunciation is correct, proceed to the next chapter. Otherwise, practice and retry until you're ready to continue.
<ins>Learn as You Play</ins>: The more you play, the more your language skills improve in a natural, context-based manner.

Embark on your language learning journey, where every choice you make helps you master a new language! 🌟


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
