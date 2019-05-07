// The Play plugin
addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.7.0")

// Defines scaffolding (found under .g8 folder)
// http://www.foundweekends.org/giter8/scaffolding.html
// sbt "g8Scaffold form"
addSbtPlugin("org.foundweekends.giter8" % "sbt-giter8-scaffold" % "0.11.0")

// Heroku deploy
//resolvers += Resolver.url("heroku-sbt-plugin-releases",
//  url("https://dl.bintray.com/heroku/sbt-plugins/"))(Resolver.ivyStylePatterns)
//
//addSbtPlugin("com.heroku" % "sbt-heroku" % "1.0.1")
