puts "🌱 Seeding spices..."

User.create(name: "George Chesire", password: "chesire")
Task.create(name: "Build project", description: "Build the phase 3 final project", user: User.first)

puts "✅ Done seeding!"
