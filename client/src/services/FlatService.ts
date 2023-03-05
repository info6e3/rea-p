import FlatApi from "../api/FlatApi";

class FlatService {
    async getFlatsWithinBounds(bounds: []) {
        try {
            const response = await FlatApi.getPointsWithinBounds(bounds);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async getFlatById(id: number) {
        try {
            const response = await FlatApi.getFlatById(id);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async getFlatsByOwner() {
        try {
            const response = await FlatApi.getFlatsByOwner();
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async getNearestFlats(point: [number, number], lim: number) {
        try {
            const response = await FlatApi.getNearestFlats(point, lim);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async postFlat(data: any) {
        try {
            const response = await FlatApi.postFlat(data);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }
}


export default new FlatService();