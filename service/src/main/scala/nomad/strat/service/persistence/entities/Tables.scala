package nomad.strat.service.persistence.entities
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends {
  val profile = slick.driver.MySQLDriver
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
   *  @param id Database column id SqlType(INT), PrimaryKey
   *  @param size Database column size SqlType(INT), Default(Some(1))
   *  @param positionx Database column positionX SqlType(INT), Default(1)
   *  @param positiony Database column positionY SqlType(INT), Default(1)
   *  @param playerid Database column PlayerId SqlType(INT), Default(None) */
  case class ArmyRow(id: Int, size: Option[Int] = Some(1), positionx: Int = 1, positiony: Int = 1, playerid: Option[Int] = None)
  /** GetResult implicit for fetching ArmyRow objects using plain SQL queries */
  implicit def GetResultArmyRow(implicit e0: GR[Int], e1: GR[Option[Int]]): GR[ArmyRow] = GR{
    prs => import prs._
    ArmyRow.tupled((<<[Int], <<?[Int], <<[Int], <<[Int], <<?[Int]))
  }
  /** Table description of table Army. Objects of this class serve as prototypes for rows in queries. */
  class Army(_tableTag: Tag) extends Table[ArmyRow](_tableTag, "Army") {
    def * = (id, size, positionx, positiony, playerid) <> (ArmyRow.tupled, ArmyRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), size, Rep.Some(positionx), Rep.Some(positiony), playerid).shaped.<>({r=>import r._; _1.map(_=> ArmyRow.tupled((_1.get, _2, _3.get, _4.get, _5)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.PrimaryKey)
    /** Database column size SqlType(INT), Default(Some(1)) */
    val size: Rep[Option[Int]] = column[Option[Int]]("size", O.Default(Some(1)))
    /** Database column positionX SqlType(INT), Default(1) */
    val positionx: Rep[Int] = column[Int]("positionX", O.Default(1))
    /** Database column positionY SqlType(INT), Default(1) */
    val positiony: Rep[Int] = column[Int]("positionY", O.Default(1))
    /** Database column PlayerId SqlType(INT), Default(None) */
    val playerid: Rep[Option[Int]] = column[Option[Int]]("PlayerId", O.Default(None))

    /** Foreign key referencing Player (database name fk_Army_1) */
    lazy val playerFk = foreignKey("fk_Army_1", playerid, Player)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table Army */
  lazy val Army = new TableQuery(tag => new Army(tag))

  /** Entity class storing rows of table ArmyMovements
   *  @param armyid Database column ArmyId SqlType(INT)
   *  @param newpositionx Database column newPositionX SqlType(INT)
   *  @param newpositiony Database column newPositionY SqlType(INT)
   *  @param order Database column order SqlType(INT), Default(Some(0)) */
  case class ArmyMovementsRow(armyid: Int, newpositionx: Int, newpositiony: Int, order: Option[Int] = Some(0))
  /** GetResult implicit for fetching ArmyMovementsRow objects using plain SQL queries */
  implicit def GetResultArmyMovementsRow(implicit e0: GR[Int], e1: GR[Option[Int]]): GR[ArmyMovementsRow] = GR{
    prs => import prs._
    ArmyMovementsRow.tupled((<<[Int], <<[Int], <<[Int], <<?[Int]))
  }
  /** Table description of table Army_Movements. Objects of this class serve as prototypes for rows in queries. */
  class ArmyMovements(_tableTag: Tag) extends Table[ArmyMovementsRow](_tableTag, "Army_Movements") {
    def * = (armyid, newpositionx, newpositiony, order) <> (ArmyMovementsRow.tupled, ArmyMovementsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(armyid), Rep.Some(newpositionx), Rep.Some(newpositiony), order).shaped.<>({r=>import r._; _1.map(_=> ArmyMovementsRow.tupled((_1.get, _2.get, _3.get, _4)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column ArmyId SqlType(INT) */
    val armyid: Rep[Int] = column[Int]("ArmyId")
    /** Database column newPositionX SqlType(INT) */
    val newpositionx: Rep[Int] = column[Int]("newPositionX")
    /** Database column newPositionY SqlType(INT) */
    val newpositiony: Rep[Int] = column[Int]("newPositionY")
    /** Database column order SqlType(INT), Default(Some(0)) */
    val order: Rep[Option[Int]] = column[Option[Int]]("order", O.Default(Some(0)))

    /** Foreign key referencing Army (database name fk_ArmyMovements_1) */
    lazy val armyFk = foreignKey("fk_ArmyMovements_1", armyid, Army)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table ArmyMovements */
  lazy val ArmyMovements = new TableQuery(tag => new ArmyMovements(tag))

  /** Entity class storing rows of table Game
   *  @param id Database column id SqlType(INT), PrimaryKey
   *  @param name Database column name SqlType(VARCHAR), Length(45,true)
   *  @param mapid Database column MapId SqlType(INT) */
  case class GameRow(id: Int, name: String, mapid: Int)
  /** GetResult implicit for fetching GameRow objects using plain SQL queries */
  implicit def GetResultGameRow(implicit e0: GR[Int], e1: GR[String]): GR[GameRow] = GR{
    prs => import prs._
    GameRow.tupled((<<[Int], <<[String], <<[Int]))
  }
  /** Table description of table Game. Objects of this class serve as prototypes for rows in queries. */
  class Game(_tableTag: Tag) extends Table[GameRow](_tableTag, "Game") {
    def * = (id, name, mapid) <> (GameRow.tupled, GameRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(name), Rep.Some(mapid)).shaped.<>({r=>import r._; _1.map(_=> GameRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.PrimaryKey)
    /** Database column name SqlType(VARCHAR), Length(45,true) */
    val name: Rep[String] = column[String]("name", O.Length(45,varying=true))
    /** Database column MapId SqlType(INT) */
    val mapid: Rep[Int] = column[Int]("MapId")

    /** Foreign key referencing StratMap (database name fk_Game_1) */
    lazy val stratMapFk = foreignKey("fk_Game_1", mapid, StratMap)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (name) (database name name_UNIQUE) */
    val index1 = index("name_UNIQUE", name, unique=true)
  }
  /** Collection-like TableQuery object for table Game */
  lazy val Game = new TableQuery(tag => new Game(tag))

  /** Entity class storing rows of table Player
   *  @param id Database column id SqlType(INT), PrimaryKey
   *  @param username Database column userName SqlType(VARCHAR), Length(45,true), Default(None)
   *  @param password Database column password SqlType(VARCHAR), Length(255,true)
   *  @param email Database column email SqlType(VARCHAR), Length(225,true), Default(None) */
  case class PlayerRow(id: Int, username: Option[String] = None, password: String, email: Option[String] = None)
  /** GetResult implicit for fetching PlayerRow objects using plain SQL queries */
  implicit def GetResultPlayerRow(implicit e0: GR[Int], e1: GR[Option[String]], e2: GR[String]): GR[PlayerRow] = GR{
    prs => import prs._
    PlayerRow.tupled((<<[Int], <<?[String], <<[String], <<?[String]))
  }
  /** Table description of table Player. Objects of this class serve as prototypes for rows in queries. */
  class Player(_tableTag: Tag) extends Table[PlayerRow](_tableTag, "Player") {
    def * = (id, username, password, email) <> (PlayerRow.tupled, PlayerRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), username, Rep.Some(password), email).shaped.<>({r=>import r._; _1.map(_=> PlayerRow.tupled((_1.get, _2, _3.get, _4)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.PrimaryKey)
    /** Database column userName SqlType(VARCHAR), Length(45,true), Default(None) */
    val username: Rep[Option[String]] = column[Option[String]]("userName", O.Length(45,varying=true), O.Default(None))
    /** Database column password SqlType(VARCHAR), Length(255,true) */
    val password: Rep[String] = column[String]("password", O.Length(255,varying=true))
    /** Database column email SqlType(VARCHAR), Length(225,true), Default(None) */
    val email: Rep[Option[String]] = column[Option[String]]("email", O.Length(225,varying=true), O.Default(None))

    /** Uniqueness Index over (username) (database name userName_UNIQUE) */
    val index1 = index("userName_UNIQUE", username, unique=true)
  }
  /** Collection-like TableQuery object for table Player */
  lazy val Player = new TableQuery(tag => new Player(tag))

  /** Entity class storing rows of table PlayersOfGame
   *  @param gameid Database column GameId SqlType(INT)
   *  @param playerid Database column PlayerId SqlType(INT)
   *  @param playeralias Database column PlayerAlias SqlType(VARCHAR), Length(45,true), Default(None) */
  case class PlayersOfGameRow(gameid: Int, playerid: Int, playeralias: Option[String] = None)
  /** GetResult implicit for fetching PlayersOfGameRow objects using plain SQL queries */
  implicit def GetResultPlayersOfGameRow(implicit e0: GR[Int], e1: GR[Option[String]]): GR[PlayersOfGameRow] = GR{
    prs => import prs._
    PlayersOfGameRow.tupled((<<[Int], <<[Int], <<?[String]))
  }
  /** Table description of table Players_Of_Game. Objects of this class serve as prototypes for rows in queries. */
  class PlayersOfGame(_tableTag: Tag) extends Table[PlayersOfGameRow](_tableTag, "Players_Of_Game") {
    def * = (gameid, playerid, playeralias) <> (PlayersOfGameRow.tupled, PlayersOfGameRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(gameid), Rep.Some(playerid), playeralias).shaped.<>({r=>import r._; _1.map(_=> PlayersOfGameRow.tupled((_1.get, _2.get, _3)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column GameId SqlType(INT) */
    val gameid: Rep[Int] = column[Int]("GameId")
    /** Database column PlayerId SqlType(INT) */
    val playerid: Rep[Int] = column[Int]("PlayerId")
    /** Database column PlayerAlias SqlType(VARCHAR), Length(45,true), Default(None) */
    val playeralias: Rep[Option[String]] = column[Option[String]]("PlayerAlias", O.Length(45,varying=true), O.Default(None))

    /** Foreign key referencing Game (database name fk_PlayersOfGame_1) */
    lazy val gameFk = foreignKey("fk_PlayersOfGame_1", gameid, Game)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Player (database name fk_PlayersOfGame_2) */
    lazy val playerFk = foreignKey("fk_PlayersOfGame_2", playerid, Player)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table PlayersOfGame */
  lazy val PlayersOfGame = new TableQuery(tag => new PlayersOfGame(tag))

  /** Entity class storing rows of table StratMap
   *  @param id Database column id SqlType(INT), PrimaryKey
   *  @param name Database column name SqlType(VARCHAR), Length(45,true)
   *  @param sizex Database column sizeX SqlType(INT)
   *  @param sizey Database column sizeY SqlType(INT)
   *  @param altitudejson Database column altitudeJSon SqlType(TEXT) */
  case class StratMapRow(id: Int, name: String, sizex: Int, sizey: Int, altitudejson: String)
  /** GetResult implicit for fetching StratMapRow objects using plain SQL queries */
  implicit def GetResultStratMapRow(implicit e0: GR[Int], e1: GR[String]): GR[StratMapRow] = GR{
    prs => import prs._
    StratMapRow.tupled((<<[Int], <<[String], <<[Int], <<[Int], <<[String]))
  }
  /** Table description of table Strat_Map. Objects of this class serve as prototypes for rows in queries. */
  class StratMap(_tableTag: Tag) extends Table[StratMapRow](_tableTag, "Strat_Map") {
    def * = (id, name, sizex, sizey, altitudejson) <> (StratMapRow.tupled, StratMapRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(name), Rep.Some(sizex), Rep.Some(sizey), Rep.Some(altitudejson)).shaped.<>({r=>import r._; _1.map(_=> StratMapRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT), PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.PrimaryKey)
    /** Database column name SqlType(VARCHAR), Length(45,true) */
    val name: Rep[String] = column[String]("name", O.Length(45,varying=true))
    /** Database column sizeX SqlType(INT) */
    val sizex: Rep[Int] = column[Int]("sizeX")
    /** Database column sizeY SqlType(INT) */
    val sizey: Rep[Int] = column[Int]("sizeY")
    /** Database column altitudeJSon SqlType(TEXT) */
    val altitudejson: Rep[String] = column[String]("altitudeJSon")

    /** Uniqueness Index over (name) (database name name_UNIQUE) */
    val index1 = index("name_UNIQUE", name, unique=true)
  }
  /** Collection-like TableQuery object for table StratMap */
  lazy val StratMap = new TableQuery(tag => new StratMap(tag))
}
