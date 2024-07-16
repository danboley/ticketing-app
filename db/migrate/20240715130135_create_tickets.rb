class CreateTickets < ActiveRecord::Migration[7.0]
  def change
    create_table :tickets do |t|
      t.string :name
      t.string :email
      t.text :description
      t.string :status
      t.text :comments

      t.timestamps
    end
  end
end
