class CreateTaskUsers < ActiveRecord::Migration[6.1]
  def change
    create_join_table :users, :tasks do |t|
      
    end
  end
end
