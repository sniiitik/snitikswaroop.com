const https = require('https');

const FEED_URL = process.env.SUBSTACK_FEED_URL || 'https://yourname.substack.com/feed';

const fetchFeed = () => new Promise((resolve, reject) => {
  const request = https.get(FEED_URL, {
    timeout: 5000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; RSS-Reader/1.0)',
    },
  }, (response) => {
    if (response.statusCode !== 200) {
      reject(new Error(`Failed to fetch RSS feed: ${response.statusCode}`));
      return;
    }

    const data = [];
    response.on('data', chunk => data.push(chunk));
    response.on('end', () => resolve(Buffer.concat(data).toString()));
  });

  request.on('error', reject);
  request.on('timeout', () => {
    request.destroy();
    reject(new Error('Request timed out'));
  });
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const rssData = await fetchFeed();

    if (!rssData.includes('<?xml')) {
      throw new Error('Invalid RSS feed response');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=600',
      },
      body: rssData,
    };
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Failed to fetch RSS feed',
        details: error.message,
      }),
    };
  }
};
