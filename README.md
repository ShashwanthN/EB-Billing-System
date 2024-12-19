
# EB Billing System

<img src="https://github.com/user-attachments/assets/30f13ea0-fe01-4f32-b6ef-f879dbbe0ab2" alt="EB Billing System" width="300"/>

*Image for illustrative purposes only, sourced from Tamil Nadu Generation and Distribution Corporation Limited.*


---

## Overview

The **EB Billing System** is a comprehensive, modern platform for managing electricity billing processes. Built with **Spring Boot**, **JWT**, and **React.js**, the system provides a secure, scalable, and user-friendly solution. The platform automates bill generation, payment processing, and integrated with **Razorpay** for seamless online transactions.

### Key Features

- **Spring Boot Backend**: Manages business logic, handles JWT-based authentication, and provides REST API endpoints.
- **React.js Frontend**: Delivers a responsive and interactive user interface.
- **Razorpay Integration**: Facilitates secure online payments.
- **Bill Generation**: Automatically calculates and generates monthly electricity bills.
- **Receipt Generation**: Provides automatic receipt generation for completed payments.

---

## Development Lifecycle

The development of the EB Billing System was completed over a span of 16 days. Below is a detailed breakdown of the process:

- **Day 1-2: Planning & Design**
  - Defined project scope and requirements.
  - Created wireframes and UI mockups for the frontend.
  - Designed the database schema to manage user data, billing information, and payments.

- **Day 3-5: Backend Development**
  - Set up the Spring Boot project structure.
  - Implemented core business logic including user management, bill generation, and payment processing.
  - Integrated JWT for secure authentication.
  - Developed REST API endpoints for frontend communication.

- **Day 6-8: Frontend Development**
  - Set up the React.js project using Vite.
  - Developed key components for user registration, login, and bill viewing.
  - Integrated Razorpay for payment processing.
  - Styled the application using Tailwind CSS.

- **Day 9-11: Integration & Testing**
  - Integrated the frontend with backend APIs.
  - Conducted integration testing to ensure system stability.
  - Fixed bugs and optimized performance.

- **Day 12-14: Deployment Preparation**
  - Prepared the application for deployment, including environment configuration and packaging.
  - Configured the database and application server.
  - Wrote deployment scripts and documentation.

- **Day 15-16: Final Testing & Documentation**
  - Conducted final testing to ensure the system was production-ready.
  - Documented the project, including setup instructions, API documentation, and user guides.
  - Created this README and organized images for a clear overview of the project.

---

## Business Case

The EB Billing System addresses inefficiencies and complexities associated with manual billing processes. By automating bill generation and payment collection, the system reduces operational costs, minimizes errors, and enhances customer satisfaction. The integration with Razorpay ensures secure and convenient payment options, making it easier for users to pay their bills on time.

---

## How to Run

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ShashwanthN/EB-Billing-System.git
3. **Backend Setup**:
   - Navigate to the `eb-billing-system` directory.
   - Configure the `.env` file with your database credentials and other environment variables.
   - Build and run the Spring Boot application:
     \`\`\`bash
     mvn clean package
     java -jar target/eb-billing-system.jar
     \`\`\`

4. **Frontend Setup**:
   - Navigate to the `React-vite-frontend` directory.
   - Install dependencies and start the development server:
     \`\`\`bash
     npm install
     npm run dev
     \`\`\`

5. **Access the Application**:
   - Open your browser and go to `http://localhost:5173`.

---

## Technologies Used

- **Backend**: Spring Boot, Hibernate, JWT
- **Frontend**: React.js, Vite, Tailwind CSS
- **Payment Gateway**: Razorpay
- **Database**: MySQL

---

## Business Benefits

- **Reduced Operational Costs**: Automates repetitive tasks, saving time and resources.
- **Improved Accuracy**: Eliminates manual errors in billing.
- **Enhanced User Experience**: Simple and secure online payments.
- **Scalability**: Easily handles increasing numbers of users and transactions.

---


## Images of Interfaces

![Register](https://github.com/user-attachments/assets/ed813018-bc0a-4144-be4b-326086971dbf)
## 
![OTP Verification](https://github.com/user-attachments/assets/d80eeda4-1b40-4b6e-85b5-6f519d0dc63d)
## 
![Login](https://github.com/user-attachments/assets/a228d587-85be-445d-ba2a-ac09fc1bd168)
## 
![Home](https://github.com/user-attachments/assets/8e741725-f700-4c74-909a-7604048d45ab)
## 
![Bills](https://github.com/user-attachments/assets/a95f1214-f02b-4dde-88ab-07ea7905525a)
## 
![Bills Confirmation](https://github.com/user-attachments/assets/89c4405b-24b2-4f94-a9f6-7040a8b6f8a5)
## 
![Bills Reading](https://github.com/user-attachments/assets/9e40e057-8b7e-4213-aebd-9cbabe8f3e16)
## 
![Service Registration](https://github.com/user-attachments/assets/3605f6f6-817b-4548-927e-695746c3c5ea)
## 
![Payment for Service Registration](https://github.com/user-attachments/assets/ef1645fb-c4f0-47ca-86a9-a927dd51675a)
## 
![Update Info](https://github.com/user-attachments/assets/30c73335-8975-4cd1-a436-af002541ca7c)
## 
![Calculation](https://github.com/user-attachments/assets/ff048387-bc12-4131-9dfd-a865da4317cf)
## 
![Payment Receipt](https://github.com/user-attachments/assets/35959d7a-3d8f-4f18-a2cc-a9348e0a9baf)
## 

---
