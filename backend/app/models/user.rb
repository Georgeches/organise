class User < ActiveRecord::Base
    has_many :task_users
    has_many :tasks, through: :task_users
end