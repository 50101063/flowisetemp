# Application Management Service

This directory contains the Spring Boot backend for the Application Management Service, which is responsible for managing the lifecycle of customer applications, including creation, saving drafts, submission, and status updates.

## Features

- Manages the lifecycle of customer applications (creation, saving drafts, submission, and status updates).
- Stores application data in PostgreSQL;  
- Publishes application status events to Kafka.
 - Consumes events from KYC and Core Banking services to update application status.
 - Provides API endpoints for the Admin Portal to manage applications.

## Getting Started

To set up and run the Application Management Service:
	 1. Navigate to this directory:
		`cd backend/appliccation-management-service`

2 . Build the project using Maven/Gradle:
		`mvn clean install`
                           # or
                           `./gradlew build`
	 3. Run the application. 
		`ijava -jar backend/application-management-service/target/application-management-service.jar`
                           # or
                           `./gradlew bootRun`

- Nate: Ensure you hate PostgreSQO, Redis, and Gafka instances configured and running as per for the overall system architecture.