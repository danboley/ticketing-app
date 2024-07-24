require "test_helper"

class TicketsControllerTest < ActionDispatch::IntegrationTest
  # Setup test data
  setup do
    @valid_ticket_params = { ticket: { name: "Jane Doe", status: "new", email: "janedoe@gmail.com", description: "Test ticket.", comments: "Initial comments." } }
    @ticket = Ticket.create!(name: "John Doe", status: "new", email: "johndoe@gmail.com", description: "Test ticket.", comments: "Initial comments.")
  end

  # Create ticket test
  test "should create ticket" do
    assert_difference('Ticket.count', 1) do
      post tickets_url, params: @valid_ticket_params, as: :json
    end

    assert_response :created
    assert_not_nil Ticket.find_by(email: "janedoe@gmail.com")
  end

  # Get ticket test
  test "should get ticket" do
    get ticket_url(@ticket), as: :json
    assert_response :ok

    json_response = JSON.parse(@response.body)
    assert_equal @ticket.name, json_response["name"]
    assert_equal @ticket.status, json_response["status"]
    assert_equal @ticket.email, json_response["email"]
    assert_equal @ticket.description, json_response["description"]
    assert_equal @ticket.comments, json_response["comments"]
  end

  # Update ticket test
  test "should update ticket" do
    patch ticket_url(@ticket), params: { ticket: { name: "John Doe", status: "resolved", email: "johndoe@gmail.com", description: "Test Ticket.", comments: "Updated comments." } }
    assert_response :ok

    @ticket.reload
    assert_equal "John Doe", @ticket.name
    assert_equal "resolved", @ticket.status
    assert_equal "johndoe@gmail.com", @ticket.email
    assert_equal "Test Ticket.", @ticket.description
    assert_equal "Updated comments.", @ticket.comments
  end
end
