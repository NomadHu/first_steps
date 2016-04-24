package nomad.start.service.utils

import akka.actor.ActorSystem


trait ActorModule {
  val system: ActorSystem
}


trait ActorModuleImpl extends ActorModule {
  this: Configuration =>
  val system = ActorSystem("nomadstrat_system", config)
}