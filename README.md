# Weather data charts

## 🧾 Description

Web application that shows some weather data for your current location using charts.

#### Main libraries and technologies used in the project:

- ReactJS
- NextJS
- TypeScript
- [TailwindCSS](https://tailwindcss.com/). Utility CSS classes.
- [TanStack Query](https://tanstack.com/query/latest). For data fetching and state management.
- [TanStack Table](https://tanstack.com/table/v8). For building tables.
- [Recharts](https://recharts.org/). Charts components.
- [date-fns](https://date-fns.org/). Utilities to handle dates.
- [ky](https://github.com/sindresorhus/ky). Tiny HTTP client.

## ▶ How to run

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. Create a `.env` file in the root of your project based on the `.env.template` file. Add your current OpenWeather API key in the `NEXT_PUBLIC_OPEN_WEATHER_API_KEY` variable.

3. Run the app:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## License

Unlicensed.
