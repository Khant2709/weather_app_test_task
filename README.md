# Weather-app (Тестовое задание)

Это приложение позволяет получать прогноз погоды на основе данных из [OpenWeatherMap API](https://openweathermap.org/).

## 🚀 Как запустить проект

1. Склонируйте репозиторий:
   ```sh
   git clone https://github.com/Khant2709/weather_app_test_task.git
   cd weather-app
   
2. Установите зависимости:
    ``` 
   npm install
    
    
3. Настройте API-ключ (через .env):
    * Получите API-ключ на openweathermap.org.
    * Создайте в корне проекта файл .env и добавьте туда
    * VITE_API_KEY=ВАШ_API_КЛЮЧ
    
    
4. Настройте API-ключ (через /envData.ts):
    * Замените VITE_API_KEY в файле src/config/envData.ts
    * export const API_KEY = "ВАШ_API_КЛЮЧ";
    
    
5. Запустите проект:
    * npm run dev