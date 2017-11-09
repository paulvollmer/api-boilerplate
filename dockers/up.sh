#!/bin/bash
set -ev

# Environment variables.
NODE_ENV=${NODE_ENV:-development}
COUCHBASE_USER=${COUCHBASE_USER:-Administrator}
COUCHBASE_PASS=${COUCHBASE_PASS:-password}

pushd `dirname $0`

# Start the services and wait for it.
docker-compose up -d --build

STATUS=""
until [[ ${STATUS} = "healthy" ]]; do
    STATUS=`docker inspect --format='{{.State.Health.Status}}' lorem_couchbase`
    echo ${STATUS}
    sleep 5
done

# Initialize.
exec ./couchbase/init.sh

popd
