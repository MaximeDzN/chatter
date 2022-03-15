FROM openjdk:15-jdk-alpine


LABEL MAINTENER="Maxime Dazin"


RUN apk update && \
    apk upgrade && \
    apk add git &&\
    apk add maven &&\
    apk add bash 

RUN git clone https://github.com/MaximeDzN/chatter.git /chatter

WORKDIR /chatter/back

RUN mvn clean package -DskipTests

RUN cp target/*.jar app.jar

RUN addgroup -S spring && adduser -S spring -G spring

USER spring:spring

ENTRYPOINT ["java","-jar","app.jar"]