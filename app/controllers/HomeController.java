package controllers;

import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import play.data.FormFactory;
import play.libs.Files.TemporaryFile;

import javax.imageio.ImageIO;
import javax.inject.*;

import java.awt.image.BufferedImage;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class HomeController extends Controller {

	@Inject
	FormFactory formFactory;

	
  public Result upload(Http.Request request) throws IOException {
	  
	  File file = request.body().asRaw().asFile();
	    if (file != null) {
	    	Files.copy(file.toPath(), Paths.get("C:\\Users\\nroye\\Desktop\\Technoweb\\"+"Convention"+".png"));
	      return ok("File uploaded");
	    } else {
	      return badRequest().flashing("error", "Missing file");
	    }
	  }
	}