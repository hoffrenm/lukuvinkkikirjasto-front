import axios from 'axios';
const baseUrl = '/api/tips';

const getAll = async () => {
    const results = await axios.get(baseUrl);
    return results.data;
};

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
};

export default { getAll, create };