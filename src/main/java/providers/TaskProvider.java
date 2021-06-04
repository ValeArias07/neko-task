package providers;

import db.DBConnection;
import model.Task;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;


public class TaskProvider {

    public void addTask(Task task) throws SQLException {
        DBConnection connection = new DBConnection();
        String sql = ("INSERT INTO A00361996Tasks (title, description, category, date) " +
                "VALUES ($TITLE,$DESCRIPTION,$CATEGORY, $DATE)")
                .replace("$TITLE","'"+task.getTitle()+"'")
                .replace("$DESCRIPTION", "'"+task.getDescription()+"'")
                .replace("$CATEGORY","'"+task.getCategory()+"'")
                .replace("$DATE","'"+task.getDate()+"'");
        connection.connect();
        connection.commandSQL(sql);
        connection.disconnect();
    }
    public void deleteTask(int id) throws SQLException {
        DBConnection connection = new DBConnection();
        String sql = ("DELETE FROM A00361996Tasks WHERE id=$ID").replace("$ID", ""+id);
        connection.connect();
        connection.commandSQL(sql);
        connection.disconnect();
    }

    public void updateCategory(Task task) throws SQLException {
        DBConnection connection = new DBConnection();
        String sql = ("UPDATE A00361996Tasks SET title=$TITLE, description=$DESCRIPTION, category=$CATEGORY, date=$DATE WHERE id=$ID")
                .replace("$ID",""+task.getId())
                .replace("$TITLE","'"+task.getTitle()+"'")
                .replace("$DESCRIPTION", "'"+task.getDescription()+"'")
                .replace("$CATEGORY","'"+task.getCategory()+"'")
                .replace("$DATE","'"+task.getDate()+"'");
        connection.connect();
        System.out.println(sql);
        connection.commandSQL(sql);
        connection.disconnect();
    }

    public ArrayList<Task> getAllCategory() throws SQLException {
        String sql= "SELECT * FROM A00361996Tasks";
        DBConnection connection = new DBConnection();
        connection.connect();
        ArrayList<Task> allTask = new ArrayList<Task>();
        ResultSet resultSet =  connection.getDataBySQL(sql);
        while(resultSet.next()) {
            int id = Integer.parseInt(resultSet.getString(resultSet.findColumn("id")));
            String title = resultSet.getString(resultSet.findColumn("title"));
            String description = resultSet.getString(resultSet.findColumn("description"));
            String category = resultSet.getString(resultSet.findColumn("category"));
            String date = resultSet.getString(resultSet.findColumn("date"));
            allTask.add(new Task(id, title, description,category,date));
        }
        connection.disconnect();
        return allTask;
    }

    public ArrayList<Task> getAllToDo() throws SQLException {
        String sql= "SELECT * FROM A00361996Tasks WHERE category="+"'"+"To-Do"+"'";
        DBConnection connection = new DBConnection();
        connection.connect();
        ArrayList<Task> allTask = new ArrayList<Task>();
        ResultSet resultSet =  connection.getDataBySQL(sql);
        while(resultSet.next()) {
            int id = Integer.parseInt(resultSet.getString(resultSet.findColumn("id")));
            String title = resultSet.getString(resultSet.findColumn("title"));
            String description = resultSet.getString(resultSet.findColumn("description"));
            String category = resultSet.getString(resultSet.findColumn("category"));
            String date = resultSet.getString(resultSet.findColumn("date"));
            allTask.add(new Task(id, title, description,category,date));
        }
        connection.disconnect();
        return allTask;
    }

    public ArrayList<Task> getAllDoing() throws SQLException {
        String sql= "SELECT * FROM A00361996Tasks WHERE category="+"'"+"Doing"+"'";
        DBConnection connection = new DBConnection();
        connection.connect();
        ArrayList<Task> allTask = new ArrayList<Task>();
        ResultSet resultSet =  connection.getDataBySQL(sql);
        while(resultSet.next()) {
            int id = Integer.parseInt(resultSet.getString(resultSet.findColumn("id")));
            String title = resultSet.getString(resultSet.findColumn("title"));
            String description = resultSet.getString(resultSet.findColumn("description"));
            String category = resultSet.getString(resultSet.findColumn("category"));
            String date = resultSet.getString(resultSet.findColumn("date"));
            allTask.add(new Task(id, title, description,category,date));
        }
        connection.disconnect();
        return allTask;
    }

    public ArrayList<Task> getAllFinish() throws SQLException {
        String sql= "SELECT * FROM A00361996Tasks WHERE category="+"'"+"Finish"+"'";
        DBConnection connection = new DBConnection();
        connection.connect();
        ArrayList<Task> allTask = new ArrayList<Task>();
        ResultSet resultSet =  connection.getDataBySQL(sql);
        while(resultSet.next()) {
            int id = Integer.parseInt(resultSet.getString(resultSet.findColumn("id")));
            String title = resultSet.getString(resultSet.findColumn("title"));
            String description = resultSet.getString(resultSet.findColumn("description"));
            String category = resultSet.getString(resultSet.findColumn("category"));
            String date = resultSet.getString(resultSet.findColumn("date"));
            allTask.add(new Task(id, title, description,category,date));
        }
        connection.disconnect();
        return allTask;
    }

    public Task getTask(int id) throws SQLException {
        String sql= ("SELECT FROM A00361996Tasks where id=$ID").replace("$ID", ""+id);
        DBConnection connection = new DBConnection();
        connection.connect();
        Task task=null;
        ResultSet resultSet =  connection.getDataBySQL(sql);
        while(resultSet.next()) {
            String title = resultSet.getString(resultSet.findColumn("name"));
            String description = resultSet.getString(resultSet.findColumn("type"));
            String category = resultSet.getString(resultSet.findColumn("category"));
            String date = resultSet.getString(resultSet.findColumn("date"));
            task = new Task(title, description,category,date);
        }
        connection.disconnect();
        return task;
    }
}
