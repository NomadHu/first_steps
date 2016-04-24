package nomad.start.service.rest

import akka.actor.Actor
import com.wordnik.swagger.annotations._
import com.typesafe.scalalogging.LazyLogging
import spray.httpx.SprayJsonSupport
import spray.routing._
import spray.http._
import MediaTypes._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.util.{Failure, Success}
import spray.http.StatusCodes._
import akka.util.Timeout

import scala.concurrent.duration._
import com.gettyimages.spray.swagger._
import com.wordnik.swagger.model.ApiInfo
import nomad.start.service.persistence.entities.Dummy1
import nomad.start.service.utils.{Configuration, PersistenceModule}

import scala.reflect.runtime.universe._

class SprayServiceActor(modules: Configuration with PersistenceModule) extends Actor with HttpService with LazyLogging {

  // required as implicit value for the HttpService
  // included from SprayServiceActor
  def actorRefFactory = context

  implicit val timeout = Timeout(5.seconds)

  // create table for suppliers if the table didn't exist (should be removed, when the database wasn't h2)
  // modules.suppliersDal.createTable()

  val swaggerService = new SwaggerHttpService {
    override def apiTypes = Seq(typeOf[FirstStepHttpService])
    override def apiVersion = "2.0"
    override def baseUrl = "/"
    override def docsPath = "api-docs"
    override def actorRefFactory = context
    override def apiInfo = Some(new ApiInfo("Nomad Start API", "API of our strategic game.", "TOC Url", "strat@nomad.hu", "Apache V2", "http://www.apache.org/licenses/LICENSE-2.0"))
  }

  val firstSteps = new FirstStepHttpService(modules){
    def actorRefFactory = context
  }


  def receive = runRoute(
    firstSteps.Dummy1GetRoute ~
    firstSteps.Dummy1PostRoute ~
    swaggerService.routes ~
    get {
      pathPrefix("") { pathEndOrSingleSlash {
        getFromResource("swagger-ui/index.html")
      }
      } ~
        getFromResourceDirectory("swagger-ui")
    })
}


@Api(value = "/dummyEndPoint", description = "Just a sample thingy")
abstract class FirstStepHttpService(modules: Configuration with PersistenceModule) extends HttpService {

  import JsonProtocol._
  import SprayJsonSupport._

  implicit val timeout = Timeout(5.seconds)

  @ApiOperation(httpMethod = "GET", response = classOf[Dummy1], value = "Returns a supplier based on ID")
  @ApiImplicitParams(Array(
    new ApiImplicitParam(name = "id", required = true, dataType = "integer", paramType = "path", value = "ID of the dummy object that needs to be fetched")
  ))
  @ApiResponses(Array(
    new ApiResponse(code = 200, message = "Ok")))
  def Dummy1GetRoute = path("dummyEndPoint" / IntNumber) {
    (dummyId)      =>
    get {
      respondWithMediaType(`application/json`) {
        complete(Dummy1(dummyId,s"Name$dummyId"))

      /*
        This would be the code if we were getting it from DB.
        onComplete((modules.dummyDal.findById(supId)).mapTo[Option[Dummy1]]) {
          case Success(dummyOpt) => dummyOpt match {
            case Some(dummy) => complete(dummy)
            case None => complete(NotFound,s"The dummy with id $dummyId doesn't exist :-)")
          }
          case Failure(ex) => complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
        }
        */
      }
    }
  }

  @ApiOperation(value = "Add Dummy1", nickname = "addDummy1", httpMethod = "POST", consumes = "application/json", produces = "text/plain; charset=UTF-8")
  @ApiImplicitParams(Array(
    new ApiImplicitParam(name = "body", value = "Dummy1 Object", dataType = "nomad.strat.service.entities.Dummy1", required = true, paramType = "body")
  ))
  @ApiResponses(Array(
    new ApiResponse(code = 400, message = "Bad Request"),
    new ApiResponse(code = 201, message = "Entity Created")
  ))
  def Dummy1PostRoute = path("dummyEndPoint"){
    post {
      complete(StatusCodes.Created)
      /*
      entity(as[SimpleSupplier]){ supplierToInsert =>  onComplete((modules.suppliersDal.insert(Supplier(0,supplierToInsert.name,supplierToInsert.desc)))) {
        // ignoring the number of insertedEntities because in this case it should always be one, you might check this in other cases
        case Success(insertedEntities) => complete(StatusCodes.Created)
        case Failure(ex) => complete(InternalServerError, s"An error occurred: ${ex.getMessage}")
      }
      */
      }
    }
  }


