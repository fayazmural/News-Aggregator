# News Aggregator App

The News Aggregator App is a React-based web application that fetches and displays news from multiple sources, including News.org, The New York Times, and The Guardian. Users can search for news articles, filter by categories, and personalize their news feed based on their preferences.

---

## Features

- Fetch news from multiple APIs: News.org, The New York Times, and The Guardian.
- Search functionality to find articles by keywords.
- Category and source-based filtering.
- Personalization support with saved preferences for categories and sources.
- Modern UI with responsive design.

---

## How to Build and Run

### 1. **Build for Development**

To build the development image, use the following command:

```bash
docker build --target development -t news-aggregator:dev .
```

To run the development server:

```bash
docker run -p 5173:5173 news-aggregator:dev
```

### 2. **Build for Production**

To build the production image, use this command:

```bash
docker build --target production -t news-aggregator:prod .
```

To run the production app with Nginx:

```bash
docker run -p 80:80 news-aggregator:prod
```

## Screenshots

![News-1](https://github.com/user-attachments/assets/838025c4-04a8-4233-89cf-3b13a49fcf3e)

---
![News-2](https://github.com/user-attachments/assets/31228910-eec2-4521-bd77-8676f608ffd7)

---
![News-3](https://github.com/user-attachments/assets/0cc113b6-e9dc-4527-b074-4ec73376b280)

---
![Screenshot (117)](https://github.com/user-attachments/assets/d701f080-c0c0-4b73-89da-fe1b1f3d90f8)

---
![Screenshot (118)](https://github.com/user-attachments/assets/1fa7c1da-5dee-426b-9462-5764d8ec768c)







