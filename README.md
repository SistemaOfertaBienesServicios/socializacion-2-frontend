# socializacion-2-frontend

> Proyecto de front-end para solcializacion-2-backend

## Propósito

Servir de frontend para interactuar con solcializacion-2-backend.

## Setup del entorno

### NodeJS

```
https://nodejs.org/es/download/package-manager/
```

### tmux

* MAC OS

```shell
brew install tmux
```

* Sistemas con soporte apt-get

```shell
apt-get install tmux
```

### Recomendaciones

Instalar [css-auto-reload](http://allenm.github.io/css-auto-reload/#version-1.1.0-en) para tener auto-reload Google Chrome

### Configurar variables de entorno.

Las variables de entorno están definidas en el archivo `.env`, que está incluido dentro de `.gitignore`, por lo que es necesario crear una copia del `.env.dist` y definir las variables después de haber clonado el proyecto.

## ¿Comó empezar a trabajar?

### Instalación de dependencias

```shell
make setup
```

### Iniciar el proyecto

```shell
make start
```
