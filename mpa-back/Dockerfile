FROM maven:3.9-eclipse-temurin-23-alpine as builder

WORKDIR /home/app
COPY . ./
COPY pom.xml ./
RUN mvn -Dmaven.test.skip=true clean package


FROM eclipse-temurin:23-jre-alpine

WORKDIR /home/app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/home/app/app.jar"]
COPY --from=builder /home/app/target/*.jar app.jar