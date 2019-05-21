package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.User;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import static io.ebean.config.TenantMode.DB;

public class LoginController extends Controller {
    public Result tokenCheck(Http.Request request) {
        User requestedUser;
        try {
            requestedUser = requestToUser(request);
        } catch (Exception e) {
            return badRequest(Util.createResponse(
                    "Expecting Json data", false));
        }
        User realUser = User.find.byId(requestedUser.getId());
        if (realUser == null || !requestedUser.getToken().equals(realUser.getToken())) {
            return unauthorized(Util.createResponse(
                    "Bad token", false
            ));
        }
        JsonNode jsonObject = Json.toJson(realUser);
        return ok(Util.createResponse(jsonObject, true));
    }

    public Result login(Http.Request request) {
        User requestedUser;
        try {
            requestedUser = requestToUser(request);
        } catch (Exception e) {
            return badRequest(Util.createResponse(
                    "Expecting Json data", false));
        }
        User realUser = User.find.query().where().eq("email", requestedUser.getEmail()).findOne();
        if (realUser == null || !requestedUser.getPassword().equals(realUser.getPassword())) {
            return unauthorized(Util.createResponse(
                    "Bad credentials", false
            ));

        }
        realUser.setToken(generateToken());
        realUser.save();
        JsonNode jsonObject = Json.toJson(realUser);
        return ok(Util.createResponse(jsonObject, true));
    }

    private String generateToken() {
        return String.valueOf(Math.random());
    }

    private User requestToUser(Http.Request request) throws Exception {
        JsonNode json = request.body().asJson();
        if (json == null) {
            throw new Exception();
        }
        return Json.fromJson(json, User.class);
    }
}
