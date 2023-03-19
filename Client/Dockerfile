# Stage 1: Compile and Build angular codebase
FROM node:16.18-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
RUN npm i @angular/cli
COPY ./ /app/
RUN npm run build --omit=dev

# Stage 2: Serve app with nginx server
FROM nginx:alpine
# Copy the build output to replace the default nginx contents.
COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /app/dist/client /usr/share/nginx/html/
COPY ./src/index.html /usr/share/nginx/html/
# Expose port 80 for HTTP traffic
EXPOSE 80
# daemon off runs nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
