🌿 Amaanitvam Platform

Amaanitvam Platform is the official digital ecosystem of **Amaanitvam Foundation**, designed to manage the organization's public website, administrative operations, team dashboard, certificates, donations, digital library, learning management system, reports, and future expansion modules.

The project follows a scalable **Monorepo Architecture**, allowing independent development and deployment of multiple applications while sharing common utilities and configurations.


🏗 Project Structure

amaanitvam-platform/

├── apps/
│   ├── website/
│   ├── admin-portal/
│   └── dashboard/
│
├── server/
│
├── packages/
│   ├── ui/
│   ├── shared-utils/
│   └── shared-config/
│
├── docs/
├── .github/
├── README.md
├── LICENSE
└── package.json


🚀 Applications

🌐 Website

Public NGO website.

Features

- Home
- About
- Programs
- Gallery
- Impact
- Volunteer
- Internship
- Contact
- Collaborations
- Certificate Verification
- Digital Library
- Courses
- Webinars & Competitions
- FAQs
- Donation

🛠 Admin Portal

Management portal for administrators.

Modules

- Dashboard
- Candidates
- Members
- Departments
- Tasks
- Meetings
- Announcements
- Donations
- Certificates
- Gallery
- CMS
- Reports
- Digital Library
- Courses
- Settings

👥 Team Dashboard

Portal for coordinators, interns and team members.

Modules

- Home
- Profile
- Tasks
- Projects
- Meetings
- Announcements
- Departments
- Reports
- Attendance

⚙ Backend API

Central API powering all applications.

Modules

- Authentication
- Users
- Candidates
- Members
- Departments
- Tasks
- Meetings
- Announcements
- Donations
- Certificates
- Gallery
- CMS
- Digital Library
- Courses
- Volunteers
- Internships
- Reports
- Notifications

💻 Tech Stack

Frontend

- HTML5
- CSS3
- JavaScript
- React
- Vite

Backend

- Node.js
- Express.js

Database

- MongoDB

Authentication

- Firebase Authentication

Cloud Storage

- Cloudinary

Payments

- Razorpay

🔒 Security

- Firebase Authentication
- JWT Verification
- Role-Based Access Control (RBAC)
- Request Validation
- Rate Limiting
- Environment Variables
- Centralized Error Handling

📦 Installation

Install all dependencies

```bash
npm install
```

▶ Development

Website

```bash
npm run dev:website
```

Admin Portal

```bash
npm run dev:admin
```

Dashboard

```bash
npm run dev:dashboard
```

Backend

```bash
npm run dev:server
```

---

🧪 Build

```bash
npm run build
```

📁 Environment Variables

Each application contains its own

```
.env.example
```

Copy it into

```
.env
```

and configure the required variables.

---

👥 Roles

- Super Admin
- Admin
- Coordinator
- Faculty
- Team Member
- Intern
- Content Editor
- Viewer

📚 Documentation

Documentation is available inside

```
docs/
```

including

- Architecture
- Deployment Guide
- API Documentation
- Database Design
- Contribution Guide

📈 Roadmap

- Learning Management System
- Faculty Portal
- Student Portal
- Mobile Application
- Analytics Dashboard
- Audit Logs
- Notification Center
- Multi-language Support

🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

❤️ Developed For

**Amaanitvam Foundation**

Empowering Communities Through Technology & Education.