# README

Daniel Boley - Zealthy Take Home Exercise - Simple Ticketing System

Application deployed at:
URL TBD

Description:
Simple help desk ticketing system created for Zealthy take home exerecise. Backed runs on RoR with a PostgreSQL DB. Frontend runs on React. Through the main page of the app, users can create and submit new tickets to request help. Through the "admin panel", help desk professionals can view all tickets, then drill into specific tickets to leave comments and adjust the ticket info and status as needed.

General Information:

- Frontend: React.js & Javascript
- Styling: Tailwind CSS
- Backend: Ruby on Rails
- Database: PostgreSQL
- Deployment: Vercel

To run the app locally...

Prerequisits:

- Visual Studio Code (or like IDE)
- Ruby on Rails
- PostgreSQL
- React

Steps:

1. Clone repo locally, available at (https://github.com/danboley/ticketing-app)
2. Navigate to the backend folder
   - Run 'bundle install' to install backend dependencies
   - Run 'rails db:create', 'rails db:migrate', 'rails db:seed' to set up the database
   - Run 'rails server' to initialize the backend server
3. Navigate to the frontend folder
   - Run 'npm i' and 'npm start' to install frontend dependencies
   - Run 'npm start' to initialize the frontend server
4. In your browser, navigate to http://127.0.0.1:3000/ to view the backend data, and http://127.0.0.1:3001/ to interact with the frontend
