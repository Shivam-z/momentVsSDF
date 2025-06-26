# ---------- Stage 1: Build with Maven ----------
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copy everything into the image
COPY . .

# Run Maven to build the Spring Boot app
RUN mvn clean package -DskipTests

# ---------- Stage 2: Run the built app ----------
FROM openjdk:17-jdk-alpine
WORKDIR /app

# Copy JAR from the previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose app port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
