package controllers;

import play.libs.Files.TemporaryFile;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import play.data.Form;
import play.data.FormFactory;
import javax.inject.*;
import java.io.File;
import models.Sheet;

import java.nio.file.Paths;

public class HomeController extends Controller {

	@Inject
	FormFactory formFactory;
	

  public Result upload(Http.Request request) {
	  
	
	File file = request.body().asRaw().asFile();
    if (file != null) {
      TemporaryFile File = file.getRef();
      File.copyTo(Paths.get("/file/destination.jpg"), true);
      return ok("File uploaded");
    } else {
      return badRequest().flashing("error", "Missing file");
    }
  }
}
  
