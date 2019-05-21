package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.User;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

public class UserController extends Controller {
    public Result create(Http.Request request) {
        JsonNode json = request.body().asJson();
        if (json == null) {
            return badRequest(Util.createResponse(
                    "Expecting Json data", false));
        }
        User user = Json.fromJson(json, User.class);
        user.save();
        JsonNode jsonObject = Json.toJson(user);
        return created(Util.createResponse(jsonObject, true));
    }
}
