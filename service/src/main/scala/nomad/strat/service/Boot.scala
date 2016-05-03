package nomad.strat.service

import akka.actor.{ActorSystem, Props}
import akka.io.IO
import spray.can.Http
import akka.pattern.ask
import akka.util.Timeout
import nomad.strat.service.rest.SprayServiceActor
import utils.{ActorModuleImpl, ConfigurationModuleImpl, PersistenceModuleImpl}

import scala.concurrent.duration._

object Boot extends App {

  // configuring modules for application, cake pattern for DI
  val modules = new ConfigurationModuleImpl  with ActorModuleImpl with PersistenceModuleImpl

  val service = modules.system.actorOf(Props(classOf[SprayServiceActor], modules), "strat-spray-rest-service")

  // IO requires an implicit ActorSystem, and ? (ask) requires an implicit timeout
  implicit val system = modules.system
  implicit val timeout = Timeout(5.seconds)

  // Bind HTTP to the specified service.
  IO(Http) ? Http.Bind(service, interface = "localhost", port = 8080)
}
