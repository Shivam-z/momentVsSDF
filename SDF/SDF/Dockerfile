# Use a minimal base image with Java
FROM openjdk:17-jdk-alpine

# Set work directory
WORKDIR /app

# Copy built Spring Boot jar into the image
COPY target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
