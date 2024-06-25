#
# Makefile for Next.js Project
#

#! Function to read the your local ip address
define get_ip
	$(shell hostname -I | cut -d' ' -f1)
endef

# Load environment variables from .env file
include .env

kill_PORT:
	@PID=$$(netstat -plten | awk '/172.16.120.62/ && /\/next-server/ {print $$9}' | cut -d'/' -f1); \
	if [ ! -z "$$PID" ]; then \
		kill -9 $$PID; \
		echo "Killing process $$PID"; \
	else \
		echo "No process found"; \
	fi


generate_build_no := \
		current_build_no=$$(grep -oP 'export const APP_BUILD_NO = \K\d+' src/app/utils/build_no.ts); \
		new_build_no=$$((current_build_no + 1)); \
		sed -i "s/export const APP_BUILD_NO = $$current_build_no;/export const APP_BUILD_NO = $$new_build_no;/" src/app/utils/build_no.ts; \
		git add .; \
		# git commit -m "Increment APP_BUILD_NO to $$new_build_no" --no-verify

#! Variables
NODE_VERSION=18
NEXT_VERSION=14.2.1


# Targets
.PHONY: ip run build rmn i test lint dc-up dc-down kill_PORTS

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
	@npx prisma migrate dev
prisma-reset-db:
	@npx prisma db push --force-reset
prisma-view:
	@npm run db:studio



#! Default target
.DEFAULT_GOAL := serve
