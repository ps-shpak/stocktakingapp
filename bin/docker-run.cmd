@ECHO OFF
REM Runs command in docker with current working directory
docker run --rm --volume "%cd%:/app" --workdir "/app" %*