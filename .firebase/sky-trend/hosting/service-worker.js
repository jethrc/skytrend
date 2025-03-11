  // service-worker.js

// Skip waiting and immediately activate the service worker
self.addEventListener('install', (event) => {
    self.skipWaiting();  // Force the service worker to activate immediately
  });
  
  // Activate event
  self.addEventListener('activate', (event) => {
    console.log('Service Worker Activated');
  });
  
  // Function to get weather data using fetch
  async function getWeather() {
    const apiKey = 'edb32554617dc90bd210361b92a7796a';  // Replace with your OpenWeather API key
    const city = 'Pontianak';  // Replace with your city or coordinates
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.weather[0].main.toLowerCase();  // e.g., 'rain'
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }
  
  // Function to send a general notification every 30 minutes
  async function sendGeneralNotification() {
    const data = {
      app_id: 'bc4f7229-b263-4f40-967c-e8350bcd6e99',  // Your OneSignal App ID
      included_segments: ['All'],  // Send to all subscribers
      headings: {
        en: 'SkyTrend: pengingat cuaca!',
      },
      contents: {
        en: 'Ini adalah pengingat cuaca Anda untuk tetap tinggal dan istirahat!',
      },
    };
  
    const config = {
      headers: {
        'Authorization': 'Basic os_v2_app_xrhxeknsmnhubft45a2qxtloteorcoicuvfuxt5mzlrvoegzugcnpri6nkv7xgodta4phiqyu43imxajrwokqhhredk7h4q2obitkly',  // Your OneSignal REST API Key
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await fetch('https://api.onesignal.com/notifications', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log('General notification sent:', responseData);
    } catch (error) {
      console.error('Error sending general notification:', error);
    }
  }
  
  // Function to send the weather notification if it's raining
  async function sendWeatherNotification() {
    const weather = await getWeather();
  
    if (weather && weather.includes('rain')) {
      const data = {
        app_id: 'bc4f7229-b263-4f40-967c-e8350bcd6e99',  // Your OneSignal App ID
        included_segments: ['All'],  // Send to all subscribers
        headings: {
          en: 'SkyTrend: Sekarang Hujan!',
        },
        contents: {
          en: 'Cuaca Hujan! siapkan mantel anda sebelum bepergian.',
        },
      };
  
      const config = {
        headers: {
          'Authorization': 'Basic os_v2_app_xrhxeknsmnhubft45a2qxtloteorcoicuvfuxt5mzlrvoegzugcnpri6nkv7xgodta4phiqyu43imxajrwokqhhredk7h4q2obitkly',  // Your OneSignal REST API Key
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };
  
      try {
        const response = await fetch('https://api.onesignal.com/notifications', {
          method: 'POST',
          headers: config.headers,
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        console.log('Weather notification sent:', responseData);
      } catch (error) {
        console.error('Error sending weather notification:', error);
      }
    }
  }
  
  // Send a general notification every 30 minutes
  setInterval(() => {
    sendGeneralNotification();
  }, 5 * 60 * 1000);  // 30 minutes (30 * 60 * 1000 ms)
  
  // Send a weather-based notification (if it rains) every 30 minutes
  setInterval(() => {
    sendWeatherNotification();
  }, 5 * 60 * 1000);  // Check every 30 minutes (30 * 60 * 1000 ms)
  
  