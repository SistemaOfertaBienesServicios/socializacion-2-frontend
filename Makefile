setup: clean  ## Instalar dependencias del proyecto
	npm install

start: ## Correr el proyecto
	npm start
	
test:
	npm test

clean: ## Borrar carpeta node_modules y los hooks de git
	rm -rf .git/hooks
	rm -rf node_modules
	find . -name "package-lock.json" -delete
	find . -name ".DS_Store" -delete

build: ## Genera el bundle de webpack de producción
	npm build
