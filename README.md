
mvn versions:set -DnewVersion=0.0.11-SNAPSHOT
mvn package

-Dspring.profiles.active=prod