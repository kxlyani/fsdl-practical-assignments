# Assignment 06 — Online Appointment Booking System (MERN Stack)

**Subject:** Full Stack Development Lab (FSDL)

## Overview

A full-stack MERN application for booking medical appointments online. Patients can register, browse doctors, book/reschedule/cancel time slots, and manage appointments from a dashboard. Includes an admin panel for managing doctors and viewing all appointments.

## Features

- JWT-based authentication (register/login)
- Browse doctors and available time slots
- Book, reschedule, and cancel appointments
- Role-based access control (patient vs. admin)
- Admin panel for managing doctors and appointments

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, React Router, Axios, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT, bcryptjs |

## Folder Structure

```
Assignment-06/
├── source-code/
│   └── appointment-booking-system/
│       ├── backend/     # Express API, models, routes, auth middleware
│       └── frontend/    # React app (pages, components, context)
├── output-screenshots/
└── README.md
```

## Getting Started

**Backend**
```bash
cd source-code/appointment-booking-system/backend
npm install
npm run dev
```
Runs on `http://localhost:5000`

**Frontend**
```bash
cd source-code/appointment-booking-system/frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

Requires a `.env` file in `backend/` with `MONGO_URI`, `JWT_SECRET`, and `PORT`.