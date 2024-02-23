const sendJSONToServer = async (jsonData) => {
    try {
        const response = await fetch('http://192.168.1.6:3000/receive-json', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        });
        
        const responseData = await response.text();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
  
export { sendJSONToServer };
  