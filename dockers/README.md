# Dockers

## Dev

- Install and start [Docker for Mac](https://docs.docker.com/docker-for-mac/).
- For reference see [docker-compose](https://docs.docker.com/compose/reference/overview/).

### Up

```bash
./up.sh
```

### Shutdown and cleanup

```bash
docker-compose down

docker rmi $(docker images -q -f "dangling=true")
docker volume rm $(docker volume ls -qf dangling=true)
```

## Boxes

- [Couchbase](https://hub.docker.com/_/couchbase/)
