# 📘 How to Use the Kubernetes Security Lab

## Prerequisites
- Docker
- kubectl
- kind

## Start the Cluster
```bash
cd kind-cluster
./create-cluster.sh
```

## Load a Scenario
```bash
kubectl apply -f ../scenarios/01-rbac-misconfig/manifest.yaml
```

## Teardown the Cluster
```bash
./teardown-cluster.sh
```
