package nomad.start.service.persistence.entities

case class Map(id: Long, name: String, sizeX: Long, sizeY: Long, heighs: Seq[Int]) extends BaseEntity

case class Position(x: Long, y: Long)

