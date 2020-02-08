class Task < ApplicationRecord
    has_and_belongs_to_many :tags
    validates :name, presence: true
    validates :name, length: {in: 1..100}
end
