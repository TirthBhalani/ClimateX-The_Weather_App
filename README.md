# 🌍 **ClimateX - Your Personal Weather & Air Quality Companion**

## **Description**
ClimateX is a **modern, responsive weather and air quality application** that provides:
- **Live weather details** for your **current location**.
- **Hourly temperature chart** using Recharts.
- **5-day weather forecast** to help plan ahead.
- **Air pollution data** with historical trends and forecasts.
- **Search functionality** to look up weather and air quality in **any city worldwide**.
- **Favorite cities feature**—save and access frequently checked locations.
- **Geolocation support**—fetches location-based data automatically.

This project is built for **ease of use** and **efficiency**, leveraging **custom hooks** and **state management** for a seamless experience.

---

## **Features**
✔ **Live Weather Updates** – Get instant **weather, temperature, and humidity** data.  
✔ **Hourly Temperature Chart** – Powered by **Recharts**, providing **graphical insights**.  
✔ **5-Day Forecast** – Future weather trends including **wind speed & pressure**.  
✔ **Air Pollution Monitoring** – Track **historical air quality** and see **pollution forecasts**.  
✔ **Air Quality Index (AQI)** – Visual indicators of current **air quality levels**.  
✔ **Search Any City** – Look up **weather and air quality details globally**.  
✔ **Favorite Cities** – Save **frequently checked locations** for quick access.  
✔ **Geolocation Support** – Fetches **current location** using the **Navigator API**.  
✔ **Fully Responsive Design** – Works **flawlessly** across devices.  
✔ **Optimized Data Fetching** – Uses **TanStack Query for caching & API efficiency**.  

---

## **Tech Stack**
🔹 **React.js** – Frontend framework.  
🔹 **TanStack Query** – API fetching and caching.  
🔹 **ShadCN UI** – Modern **UI components** for sleek design.  
🔹 **OpenWeather API** – Fetches **weather, forecast, and air pollution data**.  
🔹 **Geolocation API** – Retrieves **real-time location** using the browser.  
🔹 **Air pollution API** – Fetches **current, forecast and historical air pollution data**. 
🔹 **Recharts** – Displays **hourly temperature trends** and **air quality metrics** in **graph format**.  

---

## **Screenshots**

### Weather Dashboard
![Weather Dashboard](/public/images/weather-dashboard.png)

### Air Pollution Page
![Air Pollution Current](/public/images/air-pollution.png)
![Air Pollution Historical](/public/images/air-pollution-forecast.png)


---

## 🚀 Setup Instructions

Follow these steps to get **ClimateX** up and running:

1️⃣ Start by cloning the repository from GitHub and navigating to the project directory. This ensures you have the latest version of ClimateX on your local machine.

2️⃣ Install the necessary dependencies required for the project. This will set up React, TanStack Query, ShadCN UI, and other essential packages to ensure ClimateX runs smoothly.
```
npm install
```

3️⃣ Set up environment variables by creating a `.env` file in the root directory. You need to provide an API key for OpenWeather to fetch live weather data. Make sure to replace the placeholder with your actual API key.
```
VITE_OPEN_WEATHER_API_KEY = Your_API_Key
```

4️⃣ Launch the application using the development server. This will open ClimateX in your browser, allowing you to start exploring its features.
```
npm run dev
```

⚠️ Ensure you grant location permissions when prompted by the browser. ClimateX uses your device's location to fetch real-time weather and air quality updates, and without permission, it may not display local data correctly. If permissions have been permanently blocked, you'll need to adjust your browser settings manually.