require 'rails_helper'
RSpec.describe TasksController, type: :controller do
  let(:task) { FactoryBot.create(:task) }
  let(:body) { JSON.parse(response.body) }

  describe 'GET index' do
    it 'returns a successful response' do
      task.reload
      get :index
      expect(response).to be_successful
      expect(body[0]['title']).to eq('test')
    end
  end

  describe 'GET Show' do
    it 'returns a one task' do
      get :show, params: { id: task.id }
      expect(response).to be_successful
      expect(body['id']).to eq(task.id)
    end
  end

  describe 'POST#Create' do
    it 'without Description task creation' do
      get :create, params: { task: { title: 'task' } }
      expect(body['errors'][0]).to eq("Description can't be blank")
    end

    it 'without title task creation' do
      get :create, params: { task: { description: 'task' } }
      expect(body['errors'][0]).to eq("Title can't be blank")
    end

    it 'without Title and Description task creation' do
      get :create, params: { task: { status: 'todo' } }
      expect(body['errors']).to eq(["Title can't be blank", "Description can't be blank"])
    end

    it 'create successful task' do
      get :create, params: { task: { title: 'Today task', description: 'description', status: 'todo' } }
      expect(body['title']).to eq('Today task')
    end

    it 'Already todo task created' do
      task.reload
      get :create, params: { task: { title: 'Today task', description: 'description', status: 'todo' } }
      expect(body['errors']).to eq('Do not allow create new To Do Task, You have Already Todo tasks')
    end

    it 'Already todo task created but create in progress task' do
      task.reload
      get :create, params: { task: { title: 'In progress task', description: 'description', status: 'in_progress' } }
      expect(body['title']).to eq('In progress task')
    end
  end

  describe 'PUT#update' do
    it 'update successful task' do
      get :update, params: { id: task.id, task: { title: 'updated task' } }
      expect(response).to be_successful
      expect(body['title']).to eq('updated task')
    end

    it 'update task without title' do
      get :update, params: { id: task.id, task: { title: '' } }
      expect(body['errors'][0]).to eq("Title can't be blank")
    end
  end

  describe 'DELETE#destroy' do
    it 'destroy successful task' do
      get :destroy, params: { id: task.id}
      expect(response).to be_successful
      expect(body['message']).to eq("Task succefull deleted")
    end
  end
end
