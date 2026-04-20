# Cloud-Native E-Commerce Application

A production-ready e-commerce platform built with a microservices architecture, React (Node.js backend), Docker, Kubernetes, and CI/CD pipelines.

## Architecture

- **Frontend**: React (Vite)
- **API Gateway**: Node.js Proxy
- **User Service**: Node.js + Express + MongoDB (Auth)
- **Product Service**: Node.js + Express + MongoDB
- **Order Service**: Node.js + Express + PostgreSQL
- **Payment Service**: Node.js + Express (Mock)

## Quick Start (Docker Compose)

1. Ensure Docker and Docker Compose are installed.
2. Run `docker-compose up --build`
3. Access the application:
   - Frontend: `http://localhost:5173` (or port configured in Compose)
   - API Gateway: `http://localhost:8080`

## Services
* **MongoDB**: `localhost:27017`
* **PostgreSQL**: `localhost:5432`
* **Redis**: `localhost:6379`
