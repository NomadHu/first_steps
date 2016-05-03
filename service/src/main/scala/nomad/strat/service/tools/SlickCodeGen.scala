package nomad.strat.service.tools

import java.util.concurrent.TimeUnit

import slick.backend.DatabaseConfig
import slick.jdbc.meta.MTable
import slick.codegen.SourceCodeGenerator
import slick.driver.PostgresDriver

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, ExecutionContext, Future}

object SlickCodeGen extends App {

  val outputDir = "src/main/scala"
  val pkg = "nomad.strat.service.persistence.entities"

  implicit val ec = ExecutionContext.global
  val slickDriver = "slick.driver.PostgresDriver"
  val dbConfig: DatabaseConfig[PostgresDriver] = DatabaseConfig.forConfig("pgsql")
  val db = dbConfig.db

  val dbio = PostgresDriver.createModel(Some(MTable.getTables(None, None, None, Some(Seq("TABLE", "VIEW")))))

  val model = db.run(dbio)
  val future : Future[SourceCodeGenerator] = model.map(model => new SourceCodeGenerator(model))
  val codegen : SourceCodeGenerator = Await.result(future, Duration.create(5, TimeUnit.MINUTES))

  codegen.writeToFile(slickDriver, outputDir, pkg, "Tables", "Tables.scala")
}