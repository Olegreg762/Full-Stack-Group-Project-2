const newBudgetHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#budgetName').value.trim();
    const amount = document.querySelector('#budgetFunding').value.trim();
    
    if (name && amount) {
      const response = await fetch(`/api/budget`, {
        method: 'POST',
        body: JSON.stringify({ name: name, amount: amount}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        console.log('Failed to create budget');
      }
    }
  };
  
  const delBudgetHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/budget/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete budget');
      }
    }
  };
  
  document
    .querySelector('#new-budget')
    .addEventListener('click', newBudgetHandler);
  
  document
    .querySelector('#delete-budget')
    .addEventListener('click', delBudgetHandler);