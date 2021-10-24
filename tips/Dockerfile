FROM node:16.1-alpine as deps
RUN apk add --no-cache libc6-compat

RUN mkdir -p /app/tips
WORKDIR /app/tips

COPY package*.json ./
COPY next.config.js ./
COPY .env ./

RUN npm install

FROM node:16.1-alpine as builder
WORKDIR /app/tips
COPY . .
COPY --from=deps /app/tips/node_modules ./node_modules
RUN npm run build

FROM node:16.1-alpine as runner
WORKDIR /app/tips

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

#COPY --from=builder /app/tips/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/tips/.next ./.next
COPY --from=builder /app/tips/node_modules ./node_modules
COPY --from=builder /app/tips/package.json ./package.json

USER nextjs

EXPOSE 9095

CMD npm run start