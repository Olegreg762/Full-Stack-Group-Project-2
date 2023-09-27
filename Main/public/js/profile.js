const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#expenseName').value.trim();
  const category = document.querySelector('#expenseDesc').value.trim();
  const amount = document.querySelector('#expenseFunding').value.trim();
  
  if (name && amount && category) {
    const response = await fetch(`/api/expense`, {
      method: 'POST',
      body: JSON.stringify({ name: name, amount: amount, category: category }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create expense');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/expense/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete expense');
    }
  }
};

document
  .querySelector('#new-expense')
  .addEventListener('click', newFormHandler);

document
  .querySelector('#delete-expense')
  .addEventListener('click', delButtonHandler);
