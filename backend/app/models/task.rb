class Task < ActiveRecord::Base
    has_many :tasks_users
    has_many :users, through: :tasks_users
end