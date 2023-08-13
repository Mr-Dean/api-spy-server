function clarifaiAPI(url) {

    const PAT = 'f8e10948cbf9420f85a5fcf3d7d7290a';

    const USER_ID = 'clarifai';       
    const APP_ID = 'main';
    const MODEL_ID = 'general-image-detection';
    const MODEL_VERSION_ID = '1580bb1932594c93b7e2e04456af7c6f';    
    const IMAGE_URL = url;


    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };



    return fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(results => {
            return results.outputs[0].data.regions;
        })
        .catch(error => {
            console.log('error', error);
            return 'error'
        });
}

module.exports = {
    clarifaiAPI,
}