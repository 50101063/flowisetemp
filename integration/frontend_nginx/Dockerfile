FROM nginx:alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the frontend static files into the Nginx web root
COPY ../../frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
