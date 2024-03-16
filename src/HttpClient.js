// Import the Axios library
import axios from 'axios';

// Create an Axios HTTP client instance named httpClient
const httpClient = axios.create({
    // Configuration options can be provided here, but none are provided in this case
});

// Export the httpClient instance to make it accessible in other files/modules
export {httpClient};
