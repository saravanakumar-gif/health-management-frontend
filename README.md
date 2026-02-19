# Health Management Frontend
#Purpose and Scope
This document provides a high-level introduction to the health-management-frontend application, describing its purpose, architecture, and core functional areas. The application is a React-based single-page application (SPA) for managing healthcare operations including patient records, doctor profiles, and appointment scheduling.

#Application Purpose
The health-management-frontend is a web-based medical management system that provides a unified interface for healthcare facility operations. The application serves as the client-side component of a full-stack healthcare management solution, communicating with a backend API hosted on Railway.

#Technology Stack
The application is built using modern web development technologies centered around the React ecosystem:

| Technology                | Version   | Purpose                              |
|---------------------------|-----------|--------------------------------------|
| react                     | 19.2.3    | Core UI library                      |
| react-dom                 | 19.2.3    | React rendering to DOM               |
| react-router-dom          | 7.12.0    | Client-side routing                  |
| axios                     | 1.13.2    | HTTP client for API communication    |
| bootstrap                 | 5.3.8     | UI styling and components            |
| react-scripts             | 5.0.1     | Build tooling and webpack config     |
| @testing-library/react    | 16.3.2    | Component testing utilities          |



#Application Architecture Diagram

                                    ┌───────────────────────────────┐
                                    │        Browser Environment    │
                                    │                               │
                                    │   index.html                  │
                                    │     (Entry Point)             │
                                    │                               │
                                    └───────────────┬───────────────┘
                                                    │
                                                    ▼
                                    ┌───────────────────────────────┐
                                    │        React Mount Point      │
                                    │          <div id="root">      │
                                    └───────────────┬───────────────┘
                                                    │
                                                    ▼
                          ┌───────────────────────────────────────┐
                          │            React Application          │
                          │                                       │
                          │          App.js                       │
                          │     • BrowserRouter                   │
                          │     • Routes / Route configuration    │
                          └───────────────────┬───────────────────┘
                                              │
                ┌─────────────────────────────┼─────────────────────────────┐
                │                             │                             │
    ┌───────────┴───────────┐     ┌───────────┴───────────┐     ┌───────────┴───────────┐
    │     Public Pages      │     │    Protected Pages    │     │     Form Pages        │
    │                       │     │                       │     │                       │
    │  • Login              │     │  • Dashboard          │     │  • PatientForm        │
    │  • Register           │     │  • PatientList        │     │  • DoctorForm         │
    │                       │     │  • DoctorList         │     │  • AppointmentForm    │
    └───────────┬───────────┘     └───────────┬───────────┘     └───────────┬───────────┘
                │                             │                             │
                └───────────────┬─────────────┼─────────────┬───────────────┘
                                │             │             │
                                ▼             ▼             ▼
                    ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
                    │   Service Layer │ │                 │ │                 │
                    │                 │ │                 │ │                 │
                    │  • authService  │ │  patientService │ │  doctorService  │
                    │  • (login,      │ │  • (CRUD        │ │  • (CRUD        │
                    │     register,   │ │     patients)   │ │     doctors)    │
                    │     logout, etc)│ │                 │ │                 │
                    └────────┬────────┘ └────────┬────────┘ └────────┬────────┘
                             │                   │                   │
                             └───────────┬───────┼───────────┬───────┘
                                         │       │           │
                                         ▼       ▼           ▼
                               ┌───────────────────────────────────┐
                               │            api.js                 │
                               │     (Central Axios Instance)      │
                               │  • baseURL                        │
                               │  • interceptors (auth token, etc) │
                               │  • request/response handling      │
                               └───────────────────┬───────────────┘
                                                   │
                                                   ▼
                                     ┌─────────────────────────────┐
                                     │     Backend API             │
                                     │  (Railway hosted)           │
                                     │  health-management-backend  │
                                     └─────────────────────────────┘


                                     
