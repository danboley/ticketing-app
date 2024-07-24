if Rails.env.development? || Rails.env.test?
  puts "Clearing Database..."

  Ticket.destroy_all

  puts "Seeding Tickets..."

  Ticket.create!(
    name: "Jane Doe",
    status: "new",
    email: "janedoe@gmail.com",
    description: "This is Jane's test ticket for DB seeding purposes.",
  )

  Ticket.create!(
    name: "John Doe",
    status: "new",
    email: "johndoe@gmail.com",
    description: "This is John's test ticket for DB seeding purposes.",
  )

  puts "Tickets seeded successfully."
else
  puts "Seeding is skipped in production environment."
end