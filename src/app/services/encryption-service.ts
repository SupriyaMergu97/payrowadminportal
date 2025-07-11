import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' // This makes the service available globally in the app
})
export class EncryptionService {
    private secretKey = 'mySecretKey123456';
    encrypt(data: string) {
        const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // AES 256-bit key
        const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV
        const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data.toString()), key, { iv: iv });
        console.log("decrypted", this.decrypt(encrypted.toString()))
        return encrypted.toString();
    }

    decrypt(data: string) {
        try {
            const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // AES 256-bit key
            const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV
            const decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv });
            const temp = CryptoJS.enc.Utf8.stringify(decrypted);
            return temp;
        } catch (error) {
            console.error("Decryption error:", error);
            return '';
        }
    }
    decryptArrayTemp(encryptedData: string) {
        try {
            // Convert key and IV from hex to WordArray
            const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // AES 256-bit key
            const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV
            // const parsedKey = CryptoJS.enc.Base64.parse('12345678901234567890123456789012');
            // const parsedIv = CryptoJS.enc.Base64.parse('1234567890123456');

            // Decrypt the data
            const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            console.log('decrypted', decrypted)
            // Convert decrypted data to UTF-8 string
            const decryptedText = CryptoJS.enc.Utf8.stringify(decrypted);

            // Parse and return the original array
            return JSON.parse(decryptedText);
        } catch (error) {
            console.error("Decryption error:", error);
            return null;
        }
    }

    encryptData(data: string): string {
        const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // AES 256-bit key
        const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV
    
        // Encrypt the data
        const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, { iv: iv });
    
        // Convert the encrypted data to Hex instead of Base64
        const encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    
        return encryptedHex; // Return encrypted data in Hex format
    }
    
    encryptArray(data: any): string {
        const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // AES 256-bit key
        const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV
        // Step 1: Convert the array of objects to a JSON string
        const jsonString = JSON.stringify(data);
    
        // Step 2: Encrypt the JSON string using AES-256-CBC
        const encrypted = CryptoJS.AES.encrypt(jsonString, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
    
        // Step 3: Convert the encrypted data to hex format (avoids '/' characters)
        return encrypted.toString(); // Returns a string in base64 format
    }
    
    decryptArray(encryptedData: any) {
        const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // AES 256-bit key
        const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV
        // Step 1: Decrypt the encrypted string
        const decrypted = CryptoJS.AES.decrypt(encryptedData, key, { iv: iv });

        // Step 2: Convert decrypted bytes to UTF-8 string
        const decryptedText = CryptoJS.enc.Utf8.stringify(decrypted);

        // Step 3: Parse the decrypted string back to array of objects
        return JSON.parse(decryptedText);
    };

}