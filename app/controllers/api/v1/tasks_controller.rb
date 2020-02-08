class Api::V1::TasksController < ApplicationController
    def index
      @tasks = Task.all

      tagtasks = []
      
      @tasks.each do |task|  
        tagnames = []
        task.tags.each do |tag|
          tagnames.push(tag.name)
        end

        tagtasks << {
          name: task.name, 
          id: task.id, 
          done: task.done, 
          tags: task.tags,
        }
      end

      render json: tagtasks.to_json
      
    end
  
    def create
      task = Task.create(task_params)
      render json: task
    end
  
    def destroy
      Task.destroy(params[:id])
    end

    def update
      task = Task.find(params[:id])
      task.update_attributes(task_params)
      render json: task
    end
  
    private
  
    def task_params
      params.require(:task).permit(:id, :name, :done, :tag_ids => [])
    end
  end