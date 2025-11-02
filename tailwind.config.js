/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rtaf: { navy: '#003B77', bg1: '#001e3c', bg2: '#001529', cyan: '#00E5FF', alert: '#FF4D4F' }
      },
      borderRadius: { '2xl': '1rem' }
    }
  },
  plugins: []
};
