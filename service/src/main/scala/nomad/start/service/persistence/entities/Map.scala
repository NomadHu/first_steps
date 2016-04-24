package nomad.start.service.persistence.entities

case class Map(id: Long, name: String, sizeX: Long, sizeY: Long) extends BaseEntity

case class Position(x: Long, y: Long)

