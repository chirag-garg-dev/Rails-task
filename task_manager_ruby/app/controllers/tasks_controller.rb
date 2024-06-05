class TasksController < ApplicationController
  before_action :set_task, only: %i[show update destroy]
  before_action :check_task_status, only: [:create]
  def index
    @tasks = Task.all
    render json: @tasks
  end

  def show
    render json: @task
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render json: @task, status: :created, location: @task
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @task.destroy
      render json: { message: "Task succefull deleted" }
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def check_task_status
    complete_task = Task.all.where(status: 'todo').count
    return if complete_task == 0 || params[:task][:status] != 'todo'

    data = (complete_task.to_f / Task.all.count.to_f) * 100

    return if data <= 50

    render json: { errors: 'Do not allow create new To Do Task, You have Already Todo tasks' },
           status: :unprocessable_entity
  end

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :status)
  end
end
