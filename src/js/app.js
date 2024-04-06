const createTicketForm = document.querySelector('.create-ticket-form');
const ticketTitle = createTicketForm.querySelector('.ticket-name');
const ticketDescription = createTicketForm.querySelector('.ticket-description');
const ticketStatus = createTicketForm.querySelector('.ticket-status');

const allTicketsBtn = document.querySelector('.all-tickets-btn');

const xhr = new XMLHttpRequest();
let globalId = 1;

// Create ticket
createTicketForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const body = new FormData();
  body.append('id', globalId);
  body.append('name', ticketTitle.value);
  body.append('description', ticketDescription.value);
  body.append('status', ticketStatus.value);
  body.append('created', Date.now());

  globalId += 1;

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return;
  };

  xhr.open('POST', 'http://localhost:7070?method=createTicket');
  xhr.send(body);
});

// Get all tickets
allTicketsBtn.addEventListener('click', () => {
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return;
  };

  xhr.open('GET', 'http://localhost:7070?method=allTickets');
  xhr.send();
});

// Get ticket by id
// ticketByIdForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   xhr.open('GET', `http://localhost:7070?method=ticketById&id=${ticketId.value}`);
// });
