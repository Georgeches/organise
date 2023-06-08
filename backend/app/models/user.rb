class User < ActiveRecord::Base
    has_many :tasks_users
    has_many :tasks, through: :tasks_users
end