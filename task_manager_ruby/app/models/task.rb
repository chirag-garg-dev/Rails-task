class Task < ApplicationRecord
  enum status: { todo: 0, in_progress: 1, done: 2 }
  validates :title, :description, presence: true
end
