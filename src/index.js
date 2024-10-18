const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// User array to represent mock database
let users = []

// POST Method
app.post('/users', (req, res) => {
    // Retrieve user name and email from post request body
    const name = req.body.name
    const email = req.body.email

    // Validate that both name and email were in request body
    // If name not found
    if (!name) {
        // Respond with error and info
        return res.status(400).json({error: "User's name not found in request"})
    }
    // If email not found
    if (!email) {
        // Respond with error and info
        return res.status(400).json({error: "User's email not found in request"})
    }

    // Create unique user id
    // Assume id is not unique and initialize it to 0
    let unique = false
    let id = 0
    // While the id is not unique
    while (!unique) {
        // Let us assume that it is true
        unique = true
        if (users.find(user => user.id === id)) {
            // If the id is used, set unique to false
            unique = false
            // Increment the id
            id = id + 1
        }
    }

    // Push user with id, name, and email into the users array
    const user = {id: id, name: name, email: email}
    users.push(user)

    // Return status 201 "Created" and send the newly created user
    res.status(201).json(user)
})

// GET Method
app.get('/users/:id', (req, res) => {
    // Retrieve user id from request parameters
    const id = parseInt(req.params.id)

    // Find the user in the mock database
    const user = users.find(user => user.id === id)
    
    // If user with specified id not found
    if (!user) {
        // Respond with error and info
        return res.status(404).json({error: `User with provided id ${id} not found`})
    }

    // Return status 200 "OK" and send the retrieved user
    res.status(200).json(user)
})

// PUT Method
app.put('/users/:id', (req, res) => {
    // Retrieve user id from request parameters
    const id = parseInt(req.params.id)

    // Retrieve user name and email from post request body
    const name = req.body.name
    const email = req.body.email

    // Validate that both name and email were in request body
    // If name not found
    if (!name) {
        // Respond with error and info
        return res.status(400).json({error: "User's name not found in request"})
    }
    // If email not found
    if (!email) {
        // Respond with error and info
        return res.status(400).json({error: "User's email not found in request"})
    }

    // Find the user in the mock database
    let user = users.find(user => user.id === id)
    
    // If user with specified id not found
    if (!user) {
        // Respond with error and info
        return res.status(404).json({error: `User with provided id ${id} not found`})
    }

    // Get the index of the user in the userarray
    const index = users.indexOf(user)
    // Update the user at its index
    users[index] = {id: id, name: name, email: email}

    // Return status 200 "OK" and send the updated user
    res.status(200).json(users[index])
})

// DELETE Method
app.delete('/users/:id', (req, res) => {
    // Retrieve user id from request parameters
    const id = parseInt(req.params.id)

    // Find the user in the mock database
    let user = users.find(user => user.id === id)
    
    // If user with specified id not found
    if (!user) {
        // Respond with error and info
        return res.status(404).json({error: `User with provided id ${id} not found`})
    }

    // Delete the user at its index
    users.splice(users.indexOf(user), 1)

    // Return status 204 "No Content"
    res.status(204).send()
})

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing