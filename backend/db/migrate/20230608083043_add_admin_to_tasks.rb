class AddAdminToTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :admin, :integer, default: 1
  end
end
