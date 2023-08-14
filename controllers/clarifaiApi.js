const axios = require('axios');

function clarifaiAPI(url) {
    const PAT = 'f8e10948cbf9420f85a5fcf3d7d7290a';
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    const MODEL_ID = 'general-image-detection';
    const MODEL_VERSION_ID = '1580bb1932594c93b7e2e04456af7c6f';
    const IMAGE_URL = url;

    const raw = JSON.stringify({
        user_app_id: {
            user_id: USER_ID,
            app_id: APP_ID,
        },
        inputs: [
            {
                data: {
                    image: {
                        url: IMAGE_URL,
                    },
                },
            },
        ],
    });

    const requestOptions = {
        method: 'POST',
        url: `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
        headers: {
            Accept: 'application/json',
            Authorization: `Key ${PAT}`,
        },
        data: raw,
    };

    return axios(requestOptions)
        .then((response) => {
            const results = response.data;
            return results.outputs[0].data.regions;
        })
        .catch((error) => {
            console.log('error', error);
            return 'error';
        });
}

async function detectImage(req, res) {
    try {
        const { input } = req.body;
    
        const data = await clarifaiAPI(input);
        res.status(200).json(data);
    } 
    catch(error) {
        res.status(500).json(error)
    }
}

module.exports = {
    detectImage,
};
