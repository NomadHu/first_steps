package nomad.strat.service.rest

import nomad.strat.service.persistence.entities.Dummy1
import spray.json.DefaultJsonProtocol

// Collector of all json format we'd like to use on REST interface
// Can be Slick mapped case classes too.
object JsonProtocol extends DefaultJsonProtocol {
  implicit val dummy1Format = jsonFormat2(Dummy1)



}

