FROM node:20.10.0-alpine
WORKDIR /frontend
COPY public/ /frontend/public
COPY src/ /frontend/src
COPY package.json /frontend/
COPY tailwind.config.js /frontend/
RUN npm install
RUN npm install -D tailwindcss
RUN npx tailwindcss init
CMD ["npm", "start"]