# Evaluate a News Article with NLP

This project is part of the Udacity Front-End Web Developer Nanodegree.

It is a web tool that allows users to analyze the sentiment of a news article or blog post by submitting a URL. The application extracts the article content, sends it to an NLP API, and displays the results on the page.

## 🛠 Technologies Used

-   Webpack 5
-   Babel
-   Express
-   Node.js
-   Sass
-   Jest
-   Service Workers

## 🚀 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/MarceloPerezIzco/evaluate-news-nlp.git
cd evaluate-news-nlp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run build-dev
npm run start
```

Visit `http://localhost:3000` in your browser.

### 4. Run tests

```bash
npm run test
```

## 🌐 API

This project uses the Udacity NLP API hosted on AWS:

```
https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer
```

The backend extracts article content from the submitted URL and sends only the first 200 characters to the API.

## 📦 Build for Production

```bash
npm run build-prod
```

## 📝 License

This project is for educational purposes only.
