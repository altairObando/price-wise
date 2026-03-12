
import axios, { AxiosInstance } from 'axios';

// Define a singleton class for making REST requests to the server
class StoreService {
  private static instance: StoreService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://storescraper.nacatamalitosoft.lat/',
      timeout: 5000, // Set a timeout of 5 seconds
    });
  }

  // Static method to get the singleton instance
  public static getInstance(): StoreService {
    if (!StoreService.instance) {
      StoreService.instance = new StoreService();
    }
    return StoreService.instance;
  }

  // Method to make a GET request to the server
  public async getData(url: string): Promise<any> {
    try {
      const response = await this.axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data from server:', error);
      throw error;
    }
  }

  // Method to make a POST request to the server
  public async postData(url: string, data: any): Promise<any> {
    try {
      const response = await this.axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      console.error('Error posting data to server:', error);
      throw error;
    }
  }
}

export default StoreService