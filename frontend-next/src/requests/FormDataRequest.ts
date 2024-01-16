import axios from "axios";
import {requestBaseUrl} from "@/requests/constants";

export default async function FormPost(path: any, myFile: any) {
    try {
        const formData = new FormData();
        formData.append('image', myFile);

        const response = await axios.post(`${requestBaseUrl}${path}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data
    } catch (error) {
        return {error: error};
    }
}



