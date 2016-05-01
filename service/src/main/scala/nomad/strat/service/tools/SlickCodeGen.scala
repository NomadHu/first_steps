package nomad.strat.service.tools

import java.util.concurrent.TimeUnit

import slick.backend.DatabaseConfig
import slick.jdbc.meta.MTable
import slick.codegen.SourceCodeGenerator
import slick.driver.MySQLDriver

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, ExecutionContext, Future}

object SlickCodeGen extends App {

  val outputDir = "src/main/scala"
  val pkg = "nomad.strat.service.persistence.entities"

  implicit val ec = ExecutionContext.global
  val slickDriver = "slick.driver.MySQLDriver"
  val dbConfig: DatabaseConfig[MySQLDriver] = DatabaseConfig.forConfig("mysql")
  val db = dbConfig.db

  val dbio = MySQLDriver.createModel(Some(MTable.getTables(None, None, None, Some(Seq("TABLE", "VIEW")))))

  val model = db.run(dbio)
  val future : Future[SourceCodeGenerator] = model.map(model => new SourceCodeGenerator(model))
  val codegen : SourceCodeGenerator = Await.result(future, Duration.create(5, TimeUnit.MINUTES))

  codegen.writeToFile(slickDriver, outputDir, pkg, "Tables", "Tables.scala")
}