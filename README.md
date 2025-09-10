# Descripcion

## Correr en dev

1. Clonar el repositorio.
2. Crear una copia del ```.env.template``` y reenombrarlo a ```.env``` y cambiar variables de entorno.
3. Intslar dependencias ```npm install```
4. Levantar la base de datos ```docker compose up -d```
5. Corer las migraciones de Prisma ```npx prisma migrate dev```
5. Ejecutar seed ```npm run seed```
6. Correr el proyecto ```npm run dev```

## Correr en prod