import api from "../http";
import {AxiosResponse} from "axios";
import {IFlat} from "../models/IFlat";

export default class FlatApi {
    static async getPointsWithinBounds(bounds: []): Promise<AxiosResponse<IFlat[]>> {
        return api.get('/flat/get-flats-within-bounds', { params: { bounds: bounds } })
    }

    static async getFlatById(id: number): Promise<AxiosResponse<IFlat>> {
        return api.get('/flat/get-flat-by-id', { params: { id } })
    }

    static async getFlatsByOwner(): Promise<AxiosResponse<IFlat[]>> {
        return api.get('/flat/get-flats-by-owner')
    }

    static async getNearestFlats(point: [number, number], lim: number): Promise<AxiosResponse<IFlat[]>> {
        return api.get('/flat/get-nearest-flats', { params: { point, lim} })
    }

    static async postFlat(data: any): Promise<AxiosResponse<IFlat[]>> {
        return api.post('/flat/post-flat', data)
    }
}

