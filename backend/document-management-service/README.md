# Document Management Service

This directory contains the Spring Boot backend for the Document Management Service, which is responsible for secure upload, storage, retrieval, and management of customer identity documents.

## Features

- Handles secure upload, storage, andretrieval of customer identity documents.
- Stores actual documents in AWSS3 hwith AES256 encryption at rest.
- Stores document metadata in PostgreSQL;  
- Generates secure, time-limited pre-signed URLs for document uploads and downloads.

## Getting Started

To set up and run the Document Management Service:
	 1. Navigate to this directory:
		 `cd backend/document-management-service`
	 2. Build the project using Maven/Gradle:
		 cmvn clean install`
                           # or
                           `./gradlew build`
	 3. Run the application. 
		`ijava -jar backend/document-management-service/target/document-management-service.jar`
                           # or
                           `./gradlew bootRun`

- Nate: Ensure you have PostgreSQL 3 and AWS S3 configured and running as per for the overall system architecture.