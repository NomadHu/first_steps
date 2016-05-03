package nomad.strat.service.utils

import akka.actor.{ActorPath, ActorRef, ActorSelection, Props}
import nomad.strat.service.persistence.dal.BaseDalImpl
import nomad.strat.service.persistence.entities.Tables.{Army, ArmyRow, Game, GameRow, PlayerRow, PlayersOfGame, PlayersOfGameRow, StratMap, StratMapRow}
import nomad.strat.service.rest.Player
//import persistence.dal._
import slick.backend.DatabaseConfig
import slick.driver.{JdbcProfile}
//import persistence.entities.{SuppliersTable, Supplier}
import slick.lifted.TableQuery


trait Profile {
	val profile: JdbcProfile
}


trait DbModule extends Profile{
	val db: JdbcProfile#Backend#Database
}

trait PersistenceModule {
  /*
	val playerDal: BaseDalImpl[Player,PlayerRow]
	val gameDal: BaseDalImpl[Game,GameRow]
	val playersOfGameDal: BaseDalImpl[PlayersOfGame,PlayersOfGameRow]
	val armyDal: BaseDalImpl[Army,ArmyRow]
	val mapDal: BaseDalImpl[StratMap,StratMapRow]
	*/
}


trait PersistenceModuleImpl extends PersistenceModule with DbModule{
	this: Configuration  =>

	// use an alternative database configuration ex:
	// private val dbConfig : DatabaseConfig[JdbcProfile]  = DatabaseConfig.forConfig("pgdb")
	// private val dbConfig : DatabaseConfig[JdbcProfile]  = DatabaseConfig.forConfig("h2db")
	private val dbConfig : DatabaseConfig[JdbcProfile]  = DatabaseConfig.forConfig("pgsql")

	override implicit val profile: JdbcProfile = dbConfig.driver
	override implicit val db: JdbcProfile#Backend#Database = dbConfig.db

  /*
	override val playerDal = new BaseDalImpl[Player,PlayerRow](TableQuery[Player]) {}
	override val gameDal = new BaseDalImpl[Game,GameRow](TableQuery[Game]) {}
	override val playersOfGameDal = new BaseDalImpl[PlayersOfGame,PlayersOfGameRow](TableQuery[PlayersOfGame]) {}
	override val armyDal = new BaseDalImpl[Army,ArmyRow](TableQuery[Army]) {}
	override val mapDal = new BaseDalImpl[StratMap,StratMapRow](TableQuery[StratMap]) {}
*/
	val self = this

}
