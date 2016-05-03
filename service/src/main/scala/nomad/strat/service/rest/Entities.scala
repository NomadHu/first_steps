package nomad.strat.service.rest

trait BaseEntity {
  val id : Long
  def isValid : Boolean = true
}

// Map related entities
case class Position(x: Long, y: Long)

case class GameMap(id: Long, name: String, sizeX: Long, sizeY: Long, heighs: Seq[Int]) extends BaseEntity

// Generic entities
case class Player(id: Long, userId: String, password: String, email: String) extends BaseEntity

// Entities related to a game played
case class Army(id: Long, size: Long = 1, currentPosition: Position, plannedMovements: Seq[Position] = Nil) extends BaseEntity

case class Game(id: Long, map: GameMap, players: Seq[Player], armies: Map[Player, Seq[Army]]) extends BaseEntity