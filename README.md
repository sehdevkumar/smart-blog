# CARGO COUNTING DASHBOARD

```
   Contributors: 
   sehdev@atai.ai
```


## `Built in`

### Nextjs Stack

### Generally we called it T3-stack

1. Tailwind CSS Framework
2. prisma ORM
3. sqlight


## Set Env Variables 

please find out the `.env` file and make changes.

```ts
# Prisma
# https://www.prisma.io/docs/reference/database-reference/connection-urls#env
DATABASE_URL="file:./db.sqlite"

SERVER_HOST_IP="172.16.120.62"
SERVER_PORT="3002"

 ```


## Run to install node modules
 `make i`

## Run In Dev Env
 `make run-dev`

## Run In Prod 
 `make build && make run-prod`


## Run to init Prisma 
`make prisma-init`


## Run to prisma migrations
 `prisma-migration`

## Run to reset Prisma DB
`make prisma-reset-db`


### Please checkout Makefile to Start Docker and clean cache

``` Makefile


    #
# Makefile for Next.js Project
#

#! Function to read the your local ip address
define get_ip
	$(shell hostname -I | cut -d' ' -f1)
endef

generate_build_no := \
		current_build_no=$$(grep -oP 'export const APP_BUILD_NO = \K\d+' src/app/utils/build_no.ts); \
		new_build_no=$$((current_build_no + 1)); \
		sed -i "s/export const APP_BUILD_NO = $$current_build_no;/export const APP_BUILD_NO = $$new_build_no;/" src/app/utils/build_no.ts; \
		git add .; \
		# git commit -m "Increment APP_BUILD_NO to $$new_build_no" --no-verify

#! Variables
NODE_VERSION=18
NEXT_VERSION=14.2.1

# Load environment variables from .env file
include .env.example

# Targets
.PHONY: ip run build rmn i test lint dc-up dc-down

#! System Commands
ip:
	@echo $(call get_ip)

#! Next.js Commands
run-dev:
	@npm run dev -- -H $(SERVER_HOST_IP) -p $(SERVER_PORT)

build:
	@npm run build

run-prod:
	@npm run start -- -H $(SERVER_HOST_IP) -p $(SERVER_PORT)


rmn:
	rm -rf node_modules

i:
	@npm install

test:
	@npm test

lint:
	@npm run lint

#! Docker Cli Commands
dc-up:
	sudo docker-compose up --remove-orphans

dc-down:
	sudo docker-compose down

dc-remove-all:
	sudo docker system prune -a

#! Git/Phabricators commands
diff:
	arc diff --preview
build_no:
	$(generate_build_no)

#! Prisma Migrations
prisma-init:
	@npx prisma init --datasource-provider sqlite
prisma-migration:
	@npx prisma migrate dev --name init
prisma-reset-db:
	@npx prisma db push --force-reset



#! Default target
.DEFAULT_GOAL := serve

  



```



