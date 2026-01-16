HELPDESK DASHBOARD
==================

A React-based helpdesk dashboard application for managing support tickets.

Features:
- View all support tickets in a responsive grid
- Filter tickets by status, priority, and category
- Search tickets by keyword
- View statistics and analytics
- Responsive design for all devices

Project Structure:
helpdesk-dashboard/
├── src/
│   ├── components/
│   │   ├── TicketCard.jsx    - Individual ticket display component
│   │   ├── FilterBar.jsx     - Filter and search controls
│   │   └── StatsCard.jsx     - Statistics display component
│   ├── data/
│   │   └── tickets.js        - Sample ticket data
│   ├── pages/
│   │   └── Dashboard.jsx     - Main dashboard page
│   ├── App.jsx               - Main app component
│   ├── index.css             - Global styles
│   └── index.js              - Entry point
└── public/
    └── index.html            - HTML template

Installation:
1. Install dependencies: npm install
2. Start development server: npm start
3. Build for production: npm run build

Technologies Used:
- React 18
- Tailwind CSS for styling
- Functional components with hooks
- Responsive design