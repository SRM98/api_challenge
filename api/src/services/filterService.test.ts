import {describe, expect, test} from '@jest/globals';
import Broadcast from '../models/broadcast.model';
import * as filterService from "../services/filterService"


const fileName : string = "assets_test.csv";

describe('getTop10ForProvider', () => {

  test('returns 10 objects', async () =>  {
    const result: Array<Broadcast> = await filterService.getTop10ForProvider("BM", fileName);
    expect(result.length).toBe(10);
  });

  test('provider is SH', async () =>  {
    const result: Array<Broadcast> = await filterService.getTop10ForProvider("SH", fileName);
    result.forEach((element) => {
      expect(element.Provider).toBe("SH");
    })
  });

});

describe('getAllProviderBroadcastsAlphabetical', () => {

  test('returns 20 objects', async () =>  {
    const result: Array<Broadcast> = await filterService.getAllProviderBroadcastsAlphabetical("BM", 0, 20, fileName);
    expect(result.length).toBe(20);
  });

  test('returns nothing', async () =>  {
    const result: Array<Broadcast> = await filterService.getAllProviderBroadcastsAlphabetical("SH", 1000, 10, fileName);
    expect(result.length).toBe(0);
  });

  test('returns all SH', async () =>  {
    const result: Array<Broadcast> = await filterService.getAllProviderBroadcastsAlphabetical("SH", 0, 1000, fileName);
    expect(result.length).toBe(94);
  });

  test('provider is SH', async () =>  {
    const result: Array<Broadcast> = await filterService.getAllProviderBroadcastsAlphabetical("SH", 0, 20, fileName);
    result.forEach((element) => {
      expect(element.Provider).toBe("SH");
    })
  });

});