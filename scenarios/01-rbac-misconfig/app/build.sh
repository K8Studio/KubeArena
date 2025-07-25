# From inside 01-rbac-misconfig/
docker build -t rbac-misconfig .

# Load into Kind cluster
kind load docker-image rbac-misconfig  --name KubeArena
