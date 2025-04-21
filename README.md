# 🌍 **ClimateX - Your Personal Weather Companion**

## **Description**
ClimateX is a **modern, responsive weather application** that provides:
- **Live weather details** for your **current location**.
- **Hourly temperature chart** using Recharts.
- **5-day weather forecast** to help plan ahead.
- **Search functionality** to look up weather in **any city worldwide**.
- **Favorite cities feature**—save and access frequently checked locations.
- **Geolocation support**—fetches location-based weather automatically.

This project is built for **ease of use** and **efficiency**, leveraging **custom hooks** and **state management** for a seamless experience.

---

## **Features**
✔ **Live Weather Updates** – Get instant **weather, temperature, and humidity** data.  
✔ **Hourly Temperature Chart** – Powered by **Recharts**, providing **graphical insights**.  
✔ **5-Day Forecast** – Future weather trends including **wind speed & pressure**.  
✔ **Search Any City** – Look up **weather details globally**.  
✔ **Favorite Cities** – Save **frequently checked locations** for quick access.  
✔ **Geolocation Support** – Fetches **current location** using the **Navigator API**.  
✔ **Fully Responsive Design** – Works **flawlessly** across devices.  
✔ **Optimized Data Fetching** – Uses **TanStack Query for caching & API efficiency**.  

---

## **Tech Stack**
🔹 **React.js** – Frontend framework.  
🔹 **TanStack Query** – API fetching and caching.  
🔹 **ShadCN UI** – Modern **UI components** for sleek design.  
🔹 **OpenWeather API** – Fetches **weather and forecast data**.  
🔹 **Geolocation API** – Retrieves **real-time location** using the browser.  
🔹 **Recharts** – Displays **hourly temperature trends** in **graph format**.  

---

## 🚀 Setup Instructions

Follow these steps to get **ClimateX** up and running:

1️⃣ Start by cloning the repository from GitHub and navigating to the project directory. This ensures you have the latest version of ClimateX on your local machine.

2️⃣ Install the necessary dependencies required for the project. This will set up React, TanStack Query, ShadCN UI, and other essential packages to ensure ClimateX runs smoothly.
npm install

3️⃣ Set up environment variables by creating a `.env` file in the root directory. You need to provide an API key for OpenWeather to fetch live weather data. Make sure to replace the placeholder with your actual API key.
VITE_OPEN_WEATHER_API_KEY = Your_API_Key

4️⃣ Launch the application using the development server. This will open ClimateX in your browser, allowing you to start exploring its features.
npm run dev

⚠️ Ensure you grant location permissions when prompted by the browser. ClimateX uses your device's location to fetch real-time weather updates, and without permission, it may not display local weather details correctly. If location access is blocked, go to your browser settings, navigate to Privacy & Security, and enable location for the site.