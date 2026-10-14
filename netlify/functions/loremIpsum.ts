import { Handler } from "@netlify/functions";

const baseUrl = 'https://api.api-ninjas.com/v1/loremipsum';
const apiKey = process.env.LOR_IPS_API_KEY;

export const handler: Handler = async (event) => {

  const paragraphNumber = event.queryStringParameters?.paragraphNumber;

  if (!paragraphNumber) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'paragraphNumber is required' }),
    };
  };

  if (!apiKey) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing API key' }),
    };
  };

  try {
  
    const response = await fetch(`${baseUrl}?paragraphs=${paragraphNumber}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'External API request failed' }),
      };
    };

    const data = await response.json();

    return {
      statusCode:200,
      body: JSON.stringify(data),
    };

  } catch (error) {

    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };

  };

};
