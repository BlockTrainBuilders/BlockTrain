# blocktrain-runner
export PORT=8000
export DEBUG=DEBUG,INFO,WARN,ERROR
export ADDRESS="okp41qljavkuszlclekhd2mjrnaexp4l6aljtnrvk6u"

# docker
export IMAGE=localhost:5000
export TAG=v`node -pe "require(\"./package.json\")['version']"`