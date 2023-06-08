class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  # Add your routes here
  get "/" do
    { message: "Good luck with your project!" }.to_json
  end

  get "/users" do
    { users: User.all }.to_json
  end

  get "/tasks" do
    { tasks: Task.all }.to_json
  end

  get "/tasksusers" do
    {tasksusers: TasksUser.all}.to_json
  end

  get "/currentuser/tasks/:id" do
    if params[:id] === 0
      {tasks: []}.to_json
    else
      user = User.find(params[:id])
      {tasks: user.tasks}.to_json
    end
  end

  get "/tasks/:id" do
    task = Task.find(params[:id])
    {taskusers: task.users}.to_json
  end

  post '/addtask' do
    new_task_params = JSON.parse(request.body.read)
    task_name = new_task_params['name']
    task_description = new_task_params['description']
    task_admin = new_task_params['admin']
    task_user = User.find_by(id:task_admin)
    
    new_task = Task.create(name: task_name, description: task_description, admin: task_admin)
    TasksUser.create(user: task_user, task: new_task)
    new_task.to_json
  end

  post '/newuser' do
    new_user_params = JSON.parse(request.body.read)
    user_name = new_user_params['name']
    user_password = new_user_params['password']

    new_user = User.create(name: user_name, password: user_password)
    new_user.to_json
  end

  delete '/removeuser/:user_id/:task_id' do
    taskuser = TasksUser.find_by(user_id: params[:user_id], task_id: params[:task_id])
  
    if taskuser
      taskuser.destroy
      taskuser.to_json
    else
      status 404
      { error: 'Record not found' }.to_json
    end
  end

  post '/addtaskuser' do
    new_taskuser_params = JSON.parse(request.body.read)
    taskuser_user = new_taskuser_params['user']
    taskuser_task = new_taskuser_params['task']
    
    new_task_user = TasksUser.create(user: User.find(taskuser_user), task: Task.find(taskuser_task))
    new_task_user.to_json
  end

end
