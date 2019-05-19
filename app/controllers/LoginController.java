package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.User;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import static io.ebean.config.TenantMode.DB;

public class LoginController extends Controller {
    public Result tokenCheck(String token) {
        boolean tokenValidity = token.equals("1234");

        JsonNode jsonResponse = Json.toJson("{\"success\":" + tokenValidity + ", \"failMessage\":\"Wrong token.\"}");
        return ok(jsonResponse).as("application/json");
    }

    public Result login(Http.Request request) {
        JsonNode json = request.body().asJson();
        if (json == null) {
            return badRequest(Util.createResponse(
                    "Expecting Json data", false));
        }
        User requestedUser = Json.fromJson(json, User.class);
        User realUser = User.find.query().where().eq("email", requestedUser.getEmail()).findOne();
        if (realUser == null || !requestedUser.getPassword().equals(realUser.getPassword())) {
            return unauthorized(Util.createResponse(
                    "Bad credentials", false
            ));

        }
        JsonNode jsonObject = Json.toJson(realUser);
        return ok(Util.createResponse(jsonObject, true));
    }
}
