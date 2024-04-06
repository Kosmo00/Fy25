FROM nginx

RUN apt-get update && apt-get install -y certbot python3-certbot-nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY certbot.sh /usr/local/bin/certbot.sh

RUN chmod +x /usr/local/bin/certbot.sh

EXPOSE 80
EXPOSE 443

# Comando para iniciar Nginx y ejecutar el script de Certbot
CMD ["nginx", "-g", "daemon off;"]