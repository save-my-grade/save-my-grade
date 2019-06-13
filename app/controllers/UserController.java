package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.User;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import java.util.List;

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

    public Result getUser(Integer id) {
        User user = User.find.byId(id);
        if (user == null) {
            return notFound("User does not exist");
        } else {
            user.setToken(null);
            JsonNode jsonObject = Json.toJson(user);
            return ok(Util.createResponse(jsonObject, true));
        }
    }

    public Result editUser(Http.Request request, Integer id) {
        User user = User.find.byId(id);
        if (user == null) {
            return notFound("User does not exist");
        }
        User newUser;
        try {
            newUser = Json.fromJson(Util.requestBodyToJson(request), User.class);
        } catch (Exception e) {
            return badRequest(Util.createResponse(
                    "Expecting Json data", false));
        }
        newUser.setId(id);
        newUser.update("default");
        JsonNode jsonObject = Json.toJson(newUser);
        return ok(Util.createResponse(jsonObject, true));
    }

    public Result getAllUsers() {
        List<User> users = User.find.all();
        JsonNode jsonObject = Json.toJson(users);
        return ok(Util.createResponse(jsonObject, true));
    }
}
