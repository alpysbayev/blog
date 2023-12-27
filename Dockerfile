FROM maven:3.8.5-openjdk-18 AS builder

ADD pom.xml pom.xml
ADD ./src src/

#RUN mvn clean install
RUN mvn clean install -DskipTests


FROM openjdk:18

#ADD /target/blog-0.0.1-SNAPSHOT.jar backend.jar
COPY --from=builder /target/blog-0.0.1-SNAPSHOT.jar backend.jar

EXPOSE 8080

#ENTRYPOINT ["java", "-jar", "backend.jar"]
CMD ["java", "-jar", "backend.jar"]