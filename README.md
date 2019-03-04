
mvn versions:set -DnewVersion=0.0.12-SNAPSHOT
mvn clean package

-Dspring.profiles.active=prod