# Cloud-Native E-Commerce Application

A production-ready e-commerce platform built using a microservices architecture. The system is designed for scalability, modularity, and real-world deployment using modern cloud-native tools.

---

## 🚀 Tech Stack

**Frontend**

* React (Vite)

**Backend**

* Node.js + Express (Microservices)

**Infrastructure**

* Docker & Docker Compose
* Kubernetes (deployment-ready)
* CI/CD pipelines (GitHub Actions-ready)

**Databases**

* MongoDB (User & Product services)
* PostgreSQL (Order service)
* Redis (Caching)

---

## 🏗️ Architecture

* **API Gateway** – Central entry point (Node.js Proxy)
* **User Service** – Authentication & user management (MongoDB)
* **Product Service** – Product catalog management (MongoDB)
* **Order Service** – Order processing (PostgreSQL)
* **Payment Service** – Mock payment handling

---

## ⚡ Features

* Scalable microservices-based architecture
* Secure user authentication system
* Product management with database integration
* Order processing with relational database support
* API Gateway for request routing
* Containerized setup for consistent environments
* Ready for Kubernetes deployment and CI/CD pipelines

---

## 🐳 Quick Start (Docker)

### Prerequisites

* Docker
* Docker Compose

### Run the project

```bash
docker-compose up --build
```

---

## 🌐 Access the Application

* **Frontend:** http://localhost:5173
* **API Gateway:** http://localhost:8080

### Services

* MongoDB: `localhost:27017`
* PostgreSQL: `localhost:5432`
* Redis: `localhost:6379`

---

## 📦 Project Structure

```
/frontend
/api-gateway
/services
  /user-service
  /product-service
  /order-service
  /payment-service
/docker-compose.yml
```

---

## 🔧 Setup (Manual - Optional)

If not using Docker:

1. Install dependencies for each service:

```bash
npm install
```

2. Configure environment variables (.env)

3. Run services individually:

```bash
npm run dev
```

---

## 📈 Future Improvements

* Real payment gateway integration
* Advanced authentication (OAuth, JWT refresh)
* Admin dashboard
* Monitoring & logging (Prometheus, Grafana)
* Full Kubernetes deployment

---

## 🔗 Live Demo

(Add your deployed link here if available)

---

## 📌 Notes

This project demonstrates a real-world cloud-native system design approach using microservices and containerization, suitable for scalable production environments.
