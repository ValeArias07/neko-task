package config;


import services.TaskServices;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("api")
public class ApplicationConfig extends Application {

    ////Registro de servicios
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> recursos = new HashSet<>();
        recursos.add(TaskServices.class);
        return super.getClasses();
    }
}