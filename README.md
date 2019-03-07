
mvn versions:set -DnewVersion=0.0.13-SNAPSHOT
mvn clean package

-Dspring.profiles.active=prod
SPRING_PROFILES_ACTIVE=prod