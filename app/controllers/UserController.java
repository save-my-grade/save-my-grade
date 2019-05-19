package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.User;
import models.UserStore;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import java.util.Set;

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

    public Result listUsers() {
        Set<User> result = UserStore.getInstance().getAllUsers();
        ObjectMapper mapper = new ObjectMapper();

        JsonNode jsonData = mapper.convertValue(result, JsonNode.class);
        return ok(Util.createResponse(jsonData, true));
    }
}
