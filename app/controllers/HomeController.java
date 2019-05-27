package controllers;

import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class HomeController extends Controller {

    public Result upload(Http.Request request) throws IOException {

        File file = request.body().asRaw().asFile();
        if (file != null) {
            Files.copy(file.toPath(), Paths.get("Convention" + ".png"));
            return ok("File uploaded");
        } else {
            return badRequest().flashing("error", "Missing file");
        }
    }
}