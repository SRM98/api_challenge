const fs = require('fs');
const csv = require('csv-parser');
import * as path from "path";
import Broadcast from "../models/broadcast.model";



export function getTop10ForProvider(providerName: string, fileName: string): Promise<Array<Broadcast>> {

    const result: Array<Broadcast> = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, `../${fileName}`))
            .pipe(csv())
            .on('data', function (data) {
                //filtrer par provider et jusqu'a 10 resultats
                if (data.Provider === providerName && result.length < 10) {
                    result.push(data);
                }
            })
            .on('end', function () {
                resolve(result);
            });
    });

}

export function getAllProviderBroadcastsAlphabetical(providerName: string, start: number, limit: number, fileName: string): Promise<Array<Broadcast>> {

    const result: Array<Broadcast> = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, `../${fileName}`))
            .pipe(csv())
            .on('data', function (data) {
                //filtrer par provider
                if (data.Provider === providerName) {
                    result.push(data);
                }
            })
            .on('end', function () {
                //sort alphabetical
                result.sort((a, b) => a.Title.localeCompare(b.Title));
                //pagination logic
                let pageArray: Array<Broadcast> = [];
                const end = start + limit;
                if (result.length > start) {
                    if (result.length > end) {
                        pageArray = result.slice(start, end);
                    } else {
                        pageArray = result.slice(start);
                    }
                }
                resolve(pageArray);
            });
    });
}