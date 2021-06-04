package services;

import model.Task;
import providers.TaskProvider;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.ArrayList;

@Path("task")
public class TaskServices {

    @POST
    @Consumes("application/json")
    @Path("add")
    public Response addTask(Task taskObj) {

        try {
            TaskProvider taskProvider = new TaskProvider();
            taskProvider.addTask(taskObj);
            return Response
                    .status(200)
                    .header("Access-Control-Allow-Origin", "*")
                    .build();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return Response
                    .status(500)
                    .header("Access-Control-Allow-Origin", "*")
                    .build();
        }
    }
    @DELETE
    @Consumes("application/json")
    @Path("delete/{taskId}")
    public Response deleteTask(@PathParam("taskId") int taskId){

        try {
            TaskProvider taskProvider= new TaskProvider();
            taskProvider.deleteTask(taskId);
            return Response
                    .status(200)
                    .header("Access-Control-Allow-Origin","*")
                    .build();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return Response
                    .status(500)
                    .header("Access-Control-Allow-Origin","*")
                    .build();
        }
    }

    @PUT
    @Consumes("application/json")
    @Path("update")
    public Response updateCategory(Task taskObj){

        try {
            TaskProvider taskProvider= new TaskProvider();
            System.out.println(taskObj.toString());
            taskProvider.updateCategory(taskObj);
            return Response
                    .status(200)
                    .header("Access-Control-Allow-Origin","*")
                    .build();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return Response
                    .status(500)
                    .header("Access-Control-Allow-Origin","*")
                    .build();
        }
    }

    @GET
    @Produces("application/json")
    @Consumes("application/json")
    @Path("getAllToDo")
    public Response getAllToDo(){

        try {
            TaskProvider taskProvider= new TaskProvider();
            ArrayList<Task> list= taskProvider.getAllToDo();
            return Response
                    .status(200)
                    .entity(list)
                    .header("Access-Control-Allow-Origin","*")
                    .build();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return Response
                    .status(500)
                    .header("Access-Control-Allow-Origin","*")
                    .build();
        }
    }

    @GET
    @Produces("application/json")
    @Consumes("application/json")
    @Path("getAllDoing")
    public Response getAllDoing(){

        try {
            TaskProvider taskProvider= new TaskProvider();
            ArrayList<Task> list= taskProvider.getAllDoing();
            return Response
                    .status(200)
                    .entity(list)
                    .header("Access-Control-Allow-Origin","*")
                    .build();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return Response
                    .status(500)
                    .header("Access-Control-Allow-Origin","*")
                    .build();
        }
    }

    @GET
    @Produces("application/json")
    @Consumes("application/json")
    @Path("getAllFinish")
    public Response getAllFinish(){

        try {
            TaskProvider taskProvider= new TaskProvider();
            ArrayList<Task> list= taskProvider.getAllFinish();
            return Response
                    .status(200)
                    .entity(list)
                    .header("Access-Control-Allow-Origin","*")
                    .build();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return Response
                    .status(500)
                    .header("Access-Control-Allow-Origin","*")
                    .build();
        }
    }

}
