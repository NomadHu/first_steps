package nomad.start.service.persistence.entities

case class Army(id: Long, size: Long = 1, currentPosition: Position, plannedMovements: Seq[Position] = Nil) extends BaseEntity

