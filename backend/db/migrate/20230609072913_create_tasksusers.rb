class CreateTasksusers < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks_users do |t|
      t.belongs_to :user
      t.belongs_to :task
    end

    add_index :tasks_users, [:user_id, :task_id], unique: true
  end
end
