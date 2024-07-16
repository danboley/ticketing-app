class Ticket < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true
  validates :description, presence: true
  validates :status, inclusion: { in: %w(new in_progress resolved) }
end