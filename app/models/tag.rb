class Tag < ApplicationRecord
    has_and_belongs_to_many :tasks
    validates :name, presence: true
    validates :color, presence: true
    validates :name, length: {in: 1..20}
end
