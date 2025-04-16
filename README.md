# Cocktail Kungen App – API Project

Cocktail Kungen is a React-based web app with a custom MongoDB + Express backend hosted on Render. The design is responsive and optimized for both desktop and mobile devices. The app allows users to:

- Search cocktails by name or ingredient  
- Get a random drink  
- Get all drinks  
- Add and delete drinks  
- Save favorites (locally stored)

The backend uses Express, MongoDB Atlas, and Mongoose. The frontend is deployed on Netlify, and the backend is deployed on Render.

---

## API Integration

Instead of using a public API like in the earlier group version of this project, I built my own custom backend from scratch using Express and MongoDB Atlas. The React frontend communicates with the backend through RESTful endpoints:

- `GET /api/cocktails` – fetch all cocktails or filter by name or ingredient  
- `GET /api/cocktails/random` – fetch a single random cocktail  
- `POST /api/cocktails` – add a new cocktail  
- `DELETE /api/cocktails/:id` – delete a cocktail by ID

The API returns standard HTTP response status codes to indicate the result of each request:

- 200 OK – Successful GET or DELETE request

- 201 Created – Cocktail added successfully via POST

- 400 Bad Request – Missing or invalid data in the request

- 404 Not Found – No matching cocktail found for the query

- 500 Internal Server Error – Something went wrong on the server

All data is stored in my own MongoDB Atlas database, so every drink added is saved permanently. The connection is handled via fetch calls in a separate `api.js` file to keep things clean and organized. The API is stateless and fully decoupled from the frontend.

---

## Live Demo

- **Frontend:** https://cocktail-kungen-app.netlify.app  
- **Backend API:** https://cocktail-kungen-app.onrender.com/api/cocktails

*Note: It can take up to 1 minute to load due to Render free-tier cold start.*

---

## How to Run

### Local Setup

1. Clone the repository:  
   `git clone https://github.com/alexandra-riva/api-project`

2. In `/server`, create a `.env` file and place the connection string provided in the submission form.

3. In `/server`, run: 

- npm install 
- node server.js

4. In the project root, run:

- npm install
- npm start

5. Open the app in your browser: `http://localhost:3000`  
Local API will run at: `http://localhost:5050`

---

### Production - No setup needed

To test the app live simply visit:

- Frontend: https://cocktail-kungen-app.netlify.app
- Backend API: https://cocktail-kungen-app.onrender.com/api/cocktails

---

## A11y and SEO

To make the app accessible, I used semantic HTML (`<main>`, `<section>`, `<footer>`, etc.) and clear ARIA labels.

All form inputs have proper labels, and everything is fully keyboard navigable.

For screen readers, inputs and buttons are labeled with ARIA where needed.

Visually, the layout has good structure and contrast.

SEO improvements include meta tags like `description`, `robots`, and Open Graph for social previews and `<title>` is dynamically set.

Lighthouse SEO score: **100**

---

## Tracking

Google Analytics 4 is used to track how users interact with the site — mostly page views and general traffic. 

The tracking script is added as an async tag in `index.html`.

No personal data is collected — this setup respects GDPR and is just for basic usage insights and to understand how the app is used.

- Measurement ID: `G-0PYH9X33HF`  
- The tracking is setup for the deployed frontend: https://cocktail-kungen-app.netlify.app

---

## Security

Even though this is a learning project, I added some basic protection:

### 1. NoSQL Injection  

To avoid unwanted code or weird inputs being sent to the database, I made sure user input is only used safely inside regular expressions, found in server.js like this: query.name = { $regex: new RegExp(name, "i") };

This way, the input is treated as simple search text and can’t break anything or mess with the query logic.

### 2. CORS Misconfiguration 

To limit who can access the backend, I used CORS to only allow requests from: 'http://localhost:3000', 'https://cocktail-kungen-app.netlify.app'

This means only my frontend (on Netlify) and local development environment can talk to the API. If someone tries to call it from another site, the request will be blocked. This is a simple but effective way to protect the API from being misused by other people’s websites. It’s a simple way to prevent random websites from accessing the API. 

There’s no login, user accounts, or any kind of verification. That means anyone who knows the API routes could technically add or delete drinks. This isn’t ideal, but for a personal learning project it’s okay. In a real-world app, I’d definitely add authentication, user roles, and stricter validation — but the goal here was to understand and implement the basics first.

---

## Performance Optimization

### Results:

- Performance: 48 (impacted by Render cold starts and testing setup)

- Accessibility: 90

- Best Practices: 75

- SEO: 100

### Improvements for future deployments:

- Host backend on an always-on tier to avoid cold start delays

- Lazy-load images and reduce asset sizes

- Improve Lighthouse performance score by reducing render-blocking resources.
