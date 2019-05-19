name := """save-my-grade"""
organization := "fr.savemygrade"
maintainer := "marin.godechot@isep.fr"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.12.8"

libraryDependencies += guice

libraryDependencies += javaJdbc
libraryDependencies += "mysql" % "mysql-connector-java" % "8.0.16"
libraryDependencies ++= Seq(evolutions, jdbc)
libraryDependencies += "org.glassfish.jaxb" % "jaxb-core" % "2.3.0.1"
libraryDependencies += "org.glassfish.jaxb" % "jaxb-runtime" % "2.3.2"

lazy val myProject = (project in file("."))
  .enablePlugins(PlayJava, PlayEbean)

EclipseKeys.preTasks := Seq(compile in Compile, compile in Test)
libraryDependencies += javaForms