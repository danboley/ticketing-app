class TicketsController < ApplicationController
  before_action :set_ticket, only: [:show, :edit, :update, :destroy]

  # GET /tickets
  def index
    @tickets = Ticket.all
    render json: @tickets, status: :ok # 200 OK
  end

  # GET /tickets/1
  def show
    render json: @ticket, status: :ok # 200 OK
  end

  # GET /tickets/new
  def new
    @ticket = Ticket.new
  end

  # GET /tickets/1/edit
  def edit
  end

  # POST /tickets
  def create
    @ticket = Ticket.new(ticket_params)

    if @ticket.save
      render json: @ticket, status: :created # 201 Created
    else
      render json: @ticket.errors, status: :unprocessable_entity # 422 Unprocessable Entity
    end
  end

  # PATCH/PUT /tickets/1
  def update
    if @ticket.update(ticket_params)
      render json: @ticket, status: :ok # 200 OK
    else
      render json: @ticket.errors, status: :unprocessable_entity # 422 Unprocessable Entity
    end
  end

  # DELETE /tickets/1
  def destroy
    @ticket.destroy
    head :no_content # 204 No Content
  end

  private
    def set_ticket
      @ticket = Ticket.find(params[:id])
    end

    def ticket_params
      params.require(:ticket).permit(:name, :status, :email, :description, :comments)
    end
end
