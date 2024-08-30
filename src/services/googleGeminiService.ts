import axios from 'axios';

const googleGeminiService = {
    async getMeasureValue(base64Image: string): Promise<number> {
        const response = await axios.post('https://api.google.dev/gemini/v1/vision/measure', {
            image: base64Image
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
            }
        });
        return response.data.measure_value;
    },

    async uploadImage(base64Image: string): Promise<string> {
        // Simulate upload and return a fake URL for now
        return `https://fakeimagehost.com/${Date.now()}`;
    }
};

export default googleGeminiService;
