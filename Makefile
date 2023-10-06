dev:
	. ./env.development.blocktrain.sh
	docker compose -f docker-compose.common.yml build
	docker compose -f docker-compose.common.yml up

# source env.staging.work3.sh - requires docker repository logged in
build-image:
	docker compose -f docker-compose.common.yml -f docker-compose.deploy.yml build
	docker compose -f docker-compose.common.yml -f docker-compose.deploy.yml push

deploy-staging: build-image shutdown-staging
#	source ./env.staging.work3.sh
	sh -x akash_generate.sh -e staging
	sh -x akash_deploy.sh -e staging
#	sleep 20
#	sh -x dns_update.sh -e staging

shutdown-staging:
	sh -x akash_shutdown.sh -e staging
