FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY defailt.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]