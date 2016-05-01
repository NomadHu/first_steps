package nomad.strat.service.persistence.entities
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends {
  val profile = slick.driver.PostgresDriver
} with Tables

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait Tables {
  val profile: slick.driver.JdbcProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = Array(Army.schema, ArmyMovements.schema, Game.schema, Player.schema, PlayersOfGame.schema, StratMap.schema).reduceLeft(_ ++ _)
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Army
   *  @param armyUuid Database column army_uuid SqlType(uuid), PrimaryKey
   *  @param size Database column size SqlType(int4), Default(Some(1))
   *  @param positionX Database column position_x SqlType(int4), Default(1)
   *  @param positionY Database column position_y SqlType(int4), Default(1)
   *  @param playerUuid Database column player_uuid SqlType(uuid), Default(None) */
  case class ArmyRow(armyUuid: java.util.UUID, size: Option[Int] = Some(1), positionX: Int = 1, positionY: Int = 1, playerUuid: Option[java.util.UUID] = None)
  /** GetResult implicit for fetching ArmyRow objects using plain SQL queries */
  implicit def GetResultArmyRow(implicit e0: GR[java.util.UUID], e1: GR[Option[Int]], e2: GR[Int], e3: GR[Option[java.util.UUID]]): GR[ArmyRow] = GR{
    prs => import prs._
    ArmyRow.tupled((<<[java.util.UUID], <<?[Int], <<[Int], <<[Int], <<?[java.util.UUID]))
  }
  /** Table description of table army. Objects of this class serve as prototypes for rows in queries. */
  class Army(_tableTag: Tag) extends Table[ArmyRow](_tableTag, "army") {
    def * = (armyUuid, size, positionX, positionY, playerUuid) <> (ArmyRow.tupled, ArmyRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(armyUuid), size, Rep.Some(positionX), Rep.Some(positionY), playerUuid).shaped.<>({r=>import r._; _1.map(_=> ArmyRow.tupled((_1.get, _2, _3.get, _4.get, _5)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column army_uuid SqlType(uuid), PrimaryKey */
    val armyUuid: Rep[java.util.UUID] = column[java.util.UUID]("army_uuid", O.PrimaryKey)
    /** Database column size SqlType(int4), Default(Some(1)) */
    val size: Rep[Option[Int]] = column[Option[Int]]("size", O.Default(Some(1)))
    /** Database column position_x SqlType(int4), Default(1) */
    val positionX: Rep[Int] = column[Int]("position_x", O.Default(1))
    /** Database column position_y SqlType(int4), Default(1) */
    val positionY: Rep[Int] = column[Int]("position_y", O.Default(1))
    /** Database column player_uuid SqlType(uuid), Default(None) */
    val playerUuid: Rep[Option[java.util.UUID]] = column[Option[java.util.UUID]]("player_uuid", O.Default(None))

    /** Foreign key referencing Player (database name fk_army_1) */
    lazy val playerFk = foreignKey("fk_army_1", playerUuid, Player)(r => Rep.Some(r.playerUuid), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table Army */
  lazy val Army = new TableQuery(tag => new Army(tag))

  /** Entity class storing rows of table ArmyMovements
   *  @param armyUuid Database column army_uuid SqlType(uuid)
   *  @param newPositionX Database column new_position_x SqlType(int4)
   *  @param newPositionY Database column new_position_y SqlType(int4)
   *  @param sequenceId Database column sequence_id SqlType(int4), Default(Some(0)) */
  case class ArmyMovementsRow(armyUuid: java.util.UUID, newPositionX: Int, newPositionY: Int, sequenceId: Option[Int] = Some(0))
  /** GetResult implicit for fetching ArmyMovementsRow objects using plain SQL queries */
  implicit def GetResultArmyMovementsRow(implicit e0: GR[java.util.UUID], e1: GR[Int], e2: GR[Option[Int]]): GR[ArmyMovementsRow] = GR{
    prs => import prs._
    ArmyMovementsRow.tupled((<<[java.util.UUID], <<[Int], <<[Int], <<?[Int]))
  }
  /** Table description of table army_movements. Objects of this class serve as prototypes for rows in queries. */
  class ArmyMovements(_tableTag: Tag) extends Table[ArmyMovementsRow](_tableTag, "army_movements") {
    def * = (armyUuid, newPositionX, newPositionY, sequenceId) <> (ArmyMovementsRow.tupled, ArmyMovementsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(armyUuid), Rep.Some(newPositionX), Rep.Some(newPositionY), sequenceId).shaped.<>({r=>import r._; _1.map(_=> ArmyMovementsRow.tupled((_1.get, _2.get, _3.get, _4)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column army_uuid SqlType(uuid) */
    val armyUuid: Rep[java.util.UUID] = column[java.util.UUID]("army_uuid")
    /** Database column new_position_x SqlType(int4) */
    val newPositionX: Rep[Int] = column[Int]("new_position_x")
    /** Database column new_position_y SqlType(int4) */
    val newPositionY: Rep[Int] = column[Int]("new_position_y")
    /** Database column sequence_id SqlType(int4), Default(Some(0)) */
    val sequenceId: Rep[Option[Int]] = column[Option[Int]]("sequence_id", O.Default(Some(0)))

    /** Foreign key referencing Army (database name fk_armymovements_1) */
    lazy val armyFk = foreignKey("fk_armymovements_1", armyUuid, Army)(r => r.armyUuid, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table ArmyMovements */
  lazy val ArmyMovements = new TableQuery(tag => new ArmyMovements(tag))

  /** Entity class storing rows of table Game
   *  @param gameUuid Database column game_uuid SqlType(uuid), PrimaryKey
   *  @param name Database column name SqlType(varchar), Length(45,true)
   *  @param mapUuid Database column map_uuid SqlType(uuid) */
  case class GameRow(gameUuid: java.util.UUID, name: String, mapUuid: java.util.UUID)
  /** GetResult implicit for fetching GameRow objects using plain SQL queries */
  implicit def GetResultGameRow(implicit e0: GR[java.util.UUID], e1: GR[String]): GR[GameRow] = GR{
    prs => import prs._
    GameRow.tupled((<<[java.util.UUID], <<[String], <<[java.util.UUID]))
  }
  /** Table description of table game. Objects of this class serve as prototypes for rows in queries. */
  class Game(_tableTag: Tag) extends Table[GameRow](_tableTag, "game") {
    def * = (gameUuid, name, mapUuid) <> (GameRow.tupled, GameRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(gameUuid), Rep.Some(name), Rep.Some(mapUuid)).shaped.<>({r=>import r._; _1.map(_=> GameRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column game_uuid SqlType(uuid), PrimaryKey */
    val gameUuid: Rep[java.util.UUID] = column[java.util.UUID]("game_uuid", O.PrimaryKey)
    /** Database column name SqlType(varchar), Length(45,true) */
    val name: Rep[String] = column[String]("name", O.Length(45,varying=true))
    /** Database column map_uuid SqlType(uuid) */
    val mapUuid: Rep[java.util.UUID] = column[java.util.UUID]("map_uuid")

    /** Foreign key referencing StratMap (database name fk_game_1) */
    lazy val stratMapFk = foreignKey("fk_game_1", mapUuid, StratMap)(r => r.mapUuid, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (name) (database name game_name_key) */
    val index1 = index("game_name_key", name, unique=true)
  }
  /** Collection-like TableQuery object for table Game */
  lazy val Game = new TableQuery(tag => new Game(tag))

  /** Entity class storing rows of table Player
   *  @param playerUuid Database column player_uuid SqlType(uuid), PrimaryKey
   *  @param userName Database column user_name SqlType(varchar), Length(45,true)
   *  @param password Database column password SqlType(varchar), Length(255,true)
   *  @param email Database column email SqlType(varchar), Length(225,true), Default(None) */
  case class PlayerRow(playerUuid: java.util.UUID, userName: String, password: String, email: Option[String] = None)
  /** GetResult implicit for fetching PlayerRow objects using plain SQL queries */
  implicit def GetResultPlayerRow(implicit e0: GR[java.util.UUID], e1: GR[String], e2: GR[Option[String]]): GR[PlayerRow] = GR{
    prs => import prs._
    PlayerRow.tupled((<<[java.util.UUID], <<[String], <<[String], <<?[String]))
  }
  /** Table description of table player. Objects of this class serve as prototypes for rows in queries. */
  class Player(_tableTag: Tag) extends Table[PlayerRow](_tableTag, "player") {
    def * = (playerUuid, userName, password, email) <> (PlayerRow.tupled, PlayerRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(playerUuid), Rep.Some(userName), Rep.Some(password), email).shaped.<>({r=>import r._; _1.map(_=> PlayerRow.tupled((_1.get, _2.get, _3.get, _4)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column player_uuid SqlType(uuid), PrimaryKey */
    val playerUuid: Rep[java.util.UUID] = column[java.util.UUID]("player_uuid", O.PrimaryKey)
    /** Database column user_name SqlType(varchar), Length(45,true) */
    val userName: Rep[String] = column[String]("user_name", O.Length(45,varying=true))
    /** Database column password SqlType(varchar), Length(255,true) */
    val password: Rep[String] = column[String]("password", O.Length(255,varying=true))
    /** Database column email SqlType(varchar), Length(225,true), Default(None) */
    val email: Rep[Option[String]] = column[Option[String]]("email", O.Length(225,varying=true), O.Default(None))

    /** Uniqueness Index over (userName) (database name player_user_name_key) */
    val index1 = index("player_user_name_key", userName, unique=true)
  }
  /** Collection-like TableQuery object for table Player */
  lazy val Player = new TableQuery(tag => new Player(tag))

  /** Entity class storing rows of table PlayersOfGame
   *  @param gameUuid Database column game_uuid SqlType(uuid)
   *  @param playerUuid Database column player_uuid SqlType(uuid)
   *  @param playerAlias Database column player_alias SqlType(varchar), Length(45,true), Default(None) */
  case class PlayersOfGameRow(gameUuid: java.util.UUID, playerUuid: java.util.UUID, playerAlias: Option[String] = None)
  /** GetResult implicit for fetching PlayersOfGameRow objects using plain SQL queries */
  implicit def GetResultPlayersOfGameRow(implicit e0: GR[java.util.UUID], e1: GR[Option[String]]): GR[PlayersOfGameRow] = GR{
    prs => import prs._
    PlayersOfGameRow.tupled((<<[java.util.UUID], <<[java.util.UUID], <<?[String]))
  }
  /** Table description of table players_of_game. Objects of this class serve as prototypes for rows in queries. */
  class PlayersOfGame(_tableTag: Tag) extends Table[PlayersOfGameRow](_tableTag, "players_of_game") {
    def * = (gameUuid, playerUuid, playerAlias) <> (PlayersOfGameRow.tupled, PlayersOfGameRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(gameUuid), Rep.Some(playerUuid), playerAlias).shaped.<>({r=>import r._; _1.map(_=> PlayersOfGameRow.tupled((_1.get, _2.get, _3)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column game_uuid SqlType(uuid) */
    val gameUuid: Rep[java.util.UUID] = column[java.util.UUID]("game_uuid")
    /** Database column player_uuid SqlType(uuid) */
    val playerUuid: Rep[java.util.UUID] = column[java.util.UUID]("player_uuid")
    /** Database column player_alias SqlType(varchar), Length(45,true), Default(None) */
    val playerAlias: Rep[Option[String]] = column[Option[String]]("player_alias", O.Length(45,varying=true), O.Default(None))

    /** Foreign key referencing Game (database name fk_playersofgame_1) */
    lazy val gameFk = foreignKey("fk_playersofgame_1", gameUuid, Game)(r => r.gameUuid, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Player (database name fk_playersofgame_2) */
    lazy val playerFk = foreignKey("fk_playersofgame_2", playerUuid, Player)(r => r.playerUuid, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table PlayersOfGame */
  lazy val PlayersOfGame = new TableQuery(tag => new PlayersOfGame(tag))

  /** Entity class storing rows of table StratMap
   *  @param mapUuid Database column map_uuid SqlType(uuid), PrimaryKey
   *  @param name Database column name SqlType(varchar), Length(45,true)
   *  @param sizeX Database column size_x SqlType(int4)
   *  @param sizeY Database column size_y SqlType(int4)
   *  @param altitudeJson Database column altitude_json SqlType(json), Length(2147483647,false) */
  case class StratMapRow(mapUuid: java.util.UUID, name: String, sizeX: Int, sizeY: Int, altitudeJson: String)
  /** GetResult implicit for fetching StratMapRow objects using plain SQL queries */
  implicit def GetResultStratMapRow(implicit e0: GR[java.util.UUID], e1: GR[String], e2: GR[Int]): GR[StratMapRow] = GR{
    prs => import prs._
    StratMapRow.tupled((<<[java.util.UUID], <<[String], <<[Int], <<[Int], <<[String]))
  }
  /** Table description of table strat_map. Objects of this class serve as prototypes for rows in queries. */
  class StratMap(_tableTag: Tag) extends Table[StratMapRow](_tableTag, "strat_map") {
    def * = (mapUuid, name, sizeX, sizeY, altitudeJson) <> (StratMapRow.tupled, StratMapRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(mapUuid), Rep.Some(name), Rep.Some(sizeX), Rep.Some(sizeY), Rep.Some(altitudeJson)).shaped.<>({r=>import r._; _1.map(_=> StratMapRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column map_uuid SqlType(uuid), PrimaryKey */
    val mapUuid: Rep[java.util.UUID] = column[java.util.UUID]("map_uuid", O.PrimaryKey)
    /** Database column name SqlType(varchar), Length(45,true) */
    val name: Rep[String] = column[String]("name", O.Length(45,varying=true))
    /** Database column size_x SqlType(int4) */
    val sizeX: Rep[Int] = column[Int]("size_x")
    /** Database column size_y SqlType(int4) */
    val sizeY: Rep[Int] = column[Int]("size_y")
    /** Database column altitude_json SqlType(json), Length(2147483647,false) */
    val altitudeJson: Rep[String] = column[String]("altitude_json", O.Length(2147483647,varying=false))

    /** Uniqueness Index over (name) (database name strat_map_name_key) */
    val index1 = index("strat_map_name_key", name, unique=true)
  }
  /** Collection-like TableQuery object for table StratMap */
  lazy val StratMap = new TableQuery(tag => new StratMap(tag))
}
