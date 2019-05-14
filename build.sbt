name := """save-my-grade"""
organization := "fr.savemygrade"
maintainer := "marin.godechot@isep.fr"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.12.8"

libraryDependencies += guice

libraryDependencies ++= Seq(
  "org.pac4j" %% "play-pac4j" % "7.0.1",
  "org.pac4j" % "pac4j-cas" % "3.6.1"
)
