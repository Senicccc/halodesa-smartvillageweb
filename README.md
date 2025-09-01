# HaloDesa - Digital Village Platform

**Hosting**: https://halodesa-desamajusejahtera.vercel.app  
**Admin Page Access**: https://halodesa-desamajusejahtera.vercel.app/admin  
*(Login: email `admin1@galodesa.com`, password `admin1`)*

[![Next.js](https://img.shields.io/badge/Next.js-15+-blue?logo=next.js)](https://nextjs.org)  
[![Vercel](https://img.shields.io/badge/Deploy%20on-Vercel-000000?logo=vercel)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

HaloDesa is a **digital village platform** designed to simplify communication between village officials and residents. This template is made to be used by **all villages in Indonesia**, allowing each village to have an official portal for announcements, reports, village information, and digital citizen interaction.

Note: This is "Maju Sejahtera" village version, other version can be created with modifying this code template
---

## 📌 Project Title

**HaloDesa - Platform Digital Desa**

---

## 📖 Description

HaloDesa is a modern village website that enables:

- Residents to read village announcements in real-time.  
- Submit reports, complaints, and aspirations easily.  
- Access information about village profiles, public services, and event agendas.  
- Direct interaction with an **AI-powered Village Assistant** for website guidance.  

This template is **generic**, so other villages can customize content, logo, address, and services as needed.

---

## 🛠 Technologies Used

### Frontend & Framework
- [Next.js 15+](https://nextjs.org) — Modern React framework for SSR & SSG  
- React 18 — UI components  
- Tailwind CSS — Responsive and modern styling  

### Backend & API
- Next.js API routes (app/api) — For reports, AI chat, and other interactions  
- Replicate API — Connects to AI models for Village Assistant  
- Firebase — Firestore, Storage, Authentication  

### Utilities
- npm / yarn / pnpm — Package managers  

### Deployment
- Vercel — Hosting and automatic deployment for Next.js  

---

## 🌟 Features

1. **Village Information**  
   - Village profile, contact, address, etc.  
   - Event agenda, photo/video gallery, village news  

2. **Village Announcements**  
   - Latest announcement list  
   - Announcement category filter  
   - Announcement detail page  

3. **Reports & Complaints**  
   - Citizen complaint form  
   - Option for anonymous or identified reports  
   - AI chat guides residents on how to report  
   - Follow-up notifications to village officials  

4. **Village Assistant (AI)**  
   - Chatbot powered by Replicate AI  
   - Answers residents' questions about village services  
   - Provides website usage guidance  
   - Friendly, clear, and concise Indonesian language  
   - Always focused on website functions and benefits for residents  

5. **Admin Dashboard**  
   - CRUD for announcements  
   - Monitor citizen reports  
   - Statistics & data visualization for village activities  

6. **Responsive & Modern UI**  
   - Mobile friendly  
   - Interactive animations  
   - Filter, search, dropdown for navigation  

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/Senicccc/halodesa-smartvillageweb.git
cd halodesa-smartvillageweb
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the project root folder.

### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm 
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build & Production
```bash
npm run build
npm start
```

## AI Support Explanation

This website features an **AI-powered Village Assistant** to help residents use the website.

### AI Platform
- Replicate  
- Model: `ibm-granite/granite-3.3-8b-instruct`

### AI Functions
- Answers residents' questions about using the village website  
- Guides report/complaint submission  
- Explains how to access announcements, village profile, event agenda, letter services, and local UMKM information  
- Language: Indonesian (concise, clear, friendly)  

### Integration
- Next.js API route (`app/api/chat`) sends user prompts to the Replicate API and receives AI responses.  

### Security
- Replicate token is stored in `.env.local` and only used on the server, not exposed to the client.  




