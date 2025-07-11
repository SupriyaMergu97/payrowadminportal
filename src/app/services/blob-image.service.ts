import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root',
})
export class BlobImageService {
 

  constructor() {}

  // Get the image URL from Azure Blob Storage
 // fileupload/Screenshot%202024-03-07%20170213.png
  async getImageUrl(blobName: string): Promise<string> {
    let connectionString = 'https://payrowdev.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-10-02T21:32:16Z&st=2024-10-02T13:32:16Z&sip=0.0.0.0&spr=https,http&sig=Er6RKcQG9P4H6rqY61kFjnH7trP%2FHSHJppfg2Ad3kPw%3D'
    let containerName = 'fileupload'; // Replace with your container name
    try {
      const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      const containerClient = blobServiceClient.getContainerClient(containerName);

      // Get the blob client for the image
      const blobClient = containerClient.getBlobClient(blobName);

      // Return the URL of the blob
      return blobClient.url;
    } catch (error) {
      console.error('Error fetching image URL:', error);
      throw error;
    }
  }
}
