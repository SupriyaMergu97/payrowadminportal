import * as CryptoJS from "crypto-js";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root", // This makes the service available globally in the app
})
export class SignatureEncryptionService {
  getUserData(): any {
    const data = sessionStorage.getItem("keyData");
    return data ? JSON.parse(data) : null;
  }
  // let data=JSON.parse(userData)
  encryptData(data: any, key: any): string {
    const keys = this.getUserData();
    // const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // AES 256-bit key
    // const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV
    const ivValue = keys?.iv || "gaOr3uvhZEwFeSbRHwlHcg=="; // Default IV if keys is null
    const iv = CryptoJS.enc.Base64.parse(`${ivValue}`); // Initialization vector (IV)
    // const key = CryptoJS.enc.Base64.parse("12345678901234567890123456789012"); // Base64-encoded secret key
    const secretkey = CryptoJS.enc.Base64.parse(key);
    // console.log(secretkey,iv,'test')
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretkey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    // return encrypted.toString();
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex); // Return hex-encoded ciphertext
  }

  async generateKey(keyValidation: string): Promise<Uint8Array> {
    // Helper to convert a string to a UTF-8 byte array
    const keys = this.getUserData();
    let deviceId = `${keys?.deviceId || "default-device-id"}`;
    function stringToUtf8Bytes(str: string): Uint8Array {
      return new TextEncoder().encode(str);
    }

    // Concatenate deviceId and keyValidation bytes
    const deviceIdBytes = stringToUtf8Bytes(deviceId);
    const keyValidationBytes = stringToUtf8Bytes(keyValidation);

    // Concatenate both byte arrays
    const combinedBytes = new Uint8Array(
      deviceIdBytes.length + keyValidationBytes.length,
    );
    combinedBytes.set(deviceIdBytes);
    combinedBytes.set(keyValidationBytes, deviceIdBytes.length);

    // Generate SHA-256 hash
    const hashBuffer = await crypto.subtle.digest("SHA-256", combinedBytes);

    // Convert ArrayBuffer to Uint8Array and slice to 32 bytes
    const fullHash = new Uint8Array(hashBuffer);
    return fullHash.slice(0, 32); // AES-256 requires a 32-byte key
  }

  encodeJsonObjectToHex(jsonData: object): string {
    const jsonString = JSON.stringify(jsonData);
    const byteArray = new TextEncoder().encode(jsonString); // Converts string to UTF-8 byte array
    let hexString = "";

    byteArray.forEach((byte) => {
      const hex = byte.toString(16); // Convert byte to hex
      hexString += hex.length === 1 ? "0" + hex : hex; // Pad with 0 if single digit
    });

    return hexString;
  }
  // encodeData(data: object): string {
  //     const jsonString = JSON.stringify(data);          // Convert JSON data to string
  //     const encodedHex = Buffer.from(jsonString).toString('hex'); // Encode string to hex
  //     return encodedHex;
  // }

  decodeData(encryptedText: string, key: Uint8Array): string {
    // Ensure the key is 32 bytes (256 bits)
    if (key.length !== 32) {
      throw new Error("Key must be 32 bytes for AES-256.");
    }

    // Convert the key from Uint8Array to CryptoJS format (WordArray)
    const cryptoKey = CryptoJS.lib.WordArray.create(key);

    // Decode the base64 encrypted text
    const encryptedWordArray = CryptoJS.enc.Base64.parse(encryptedText);

    // Wrap the WordArray in a CipherParams object to match the expected input type
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: encryptedWordArray,
    });
    // Decrypt using AES with ECB mode and PKCS7 padding (CryptoJS defaults to PKCS7)
    const decrypted = CryptoJS.AES.decrypt(cipherParams, cryptoKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Convert decrypted WordArray to UTF-8 string
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    // Check for valid UTF-8 output to handle binary data
    if (!decryptedText) {
      throw new Error("Decryption failed: resulted in invalid UTF-8 data.");
    }

    return decryptedText;
  }

  encryptFile(file: File, key: any) {
    let encryptedBase64;
    const keys = this.getUserData();
    const ivValue = keys?.iv || "gaOr3uvhZEwFeSbRHwlHcg=="; // Default IV if keys is null
    const iv = CryptoJS.enc.Base64.parse(`${ivValue}`); // Initialization vector (IV)
    // const key = CryptoJS.enc.Base64.parse("12345678901234567890123456789012"); // Base64-encoded secret key
    const secretkey = CryptoJS.enc.Base64.parse(key);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        try {
          // Convert file content to WordArray
          const wordArray = CryptoJS.lib.WordArray.create(event.target.result);

          // Generate a random IV (16 bytes for AES-256-CBC)
          // const iv = CryptoJS.lib.WordArray.random(16);

          // Encrypt the file data
          const encrypted = CryptoJS.AES.encrypt(wordArray, secretkey, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          });

          // Convert encrypted data and IV to base64 for transmission
          const encryptedBase64 = encrypted.toString();
          const ivBase64 = iv.toString(CryptoJS.enc.Base64);

          // Resolve with encrypted data and IV
          resolve(encryptedBase64);
        } catch (error) {
          reject(error);
        }
      };

      // Read file as ArrayBuffer
      reader.readAsArrayBuffer(file);
    });
  }
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
  encryptFormData(formData: any, key: any): string {
    // const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // AES 256-bit key
    // const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV
    const data: { [key: string]: any } = {};
    formData.forEach((value: any, key: any) => {
      data[key] = value;
    });
    const jsonString = JSON.stringify(data);
    const keys = this.getUserData();
    const ivValue = keys?.iv || "gaOr3uvhZEwFeSbRHwlHcg=="; // Default IV if keys is null
    const iv = CryptoJS.enc.Base64.parse(`${ivValue}`); // Initialization vector (IV)
    // const key = CryptoJS.enc.Base64.parse("12345678901234567890123456789012"); // Base64-encoded secret key
    const secretkey = CryptoJS.enc.Base64.parse(key);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretkey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    // return encrypted.toString();
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex); // Return hex-encoded ciphertext
  }

  generateMD5(DEVICEID: string, IMEI: string): string {
    const combinedString = DEVICEID + IMEI;

    // Generate MD5 hash
    const hash = CryptoJS.MD5(combinedString);

    // Convert to string and return
    return hash.toString(CryptoJS.enc.Hex);
  }
  decryptData(encryptedData: string, secretKey: string): any {
    // Convert the Base64-encoded key and IV to the required format
    const key = CryptoJS.enc.Base64.parse(secretKey); // Base64 encoded secret key from the backend
    const keys = this.getUserData();
    const ivHex = CryptoJS.enc.Base64.parse("gaOr3uvhZEwFeSbRHwlHcg=="); // IV in hexadecimal format (shared between backend and frontend)
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Hex.parse(encryptedData), // Convert hex to WordArray and assign to ciphertext
    });
    // Decrypt the data using AES-256-CBC
    const decrypted = CryptoJS.AES.decrypt(
      // encryptedData,
      cipherParams,
      key,
      {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    );
    console.log("decrypted", decrypted);
    // Convert decrypted data to a UTF-8 string and parse it as JSON
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    // const decryptedText = CryptoJS.enc.Base64.stringify(decrypted);
    console.log("decryptedText", decryptedText);
    try {
      return JSON.parse(decryptedText); // Parse the decrypted string to a JSON object
    } catch (error) {
      console.error("Failed to parse decrypted JSON:", error);
      return null;
    }
  }
  signKey(data: any): string {
    let deviceid = "deviceId_value";
    let imei = "IMEI_value";
    let code = this.generateMD5(deviceid, imei);
    console.log(code);
    let msg = `${data.httpmethod}|${deviceid}|${imei}|${code}|${data.timestamp}|${data.uri}`;
    // Create the HMAC using the clientKey and the message
    const key = CryptoJS.enc.Hex.parse(
      "e1f4ea9d3124388d42ce48786f2752c9f0e23bef4b8f7c892cf417d702b86a39",
    );
    const hash = CryptoJS.HmacSHA256(msg, key);

    // Return the Base64-encoded result
    return CryptoJS.enc.Base64.stringify(hash);
  }
  // public static String decrypt(String strToDecrypt, String secret, String iv, String alg) {
  //     try {
  //         setKey(secret);
  //              IvParameterSpec ivspec = new IvParameterSpec(Base64.getDecoder().decode(iv));
  //                  Cipher cipher = Cipher.getInstance(alg);
  //         cipher.init(Cipher.DECRYPT_MODE, secretKey, ivspec);
  //         return new String(cipher.doFinal(hexStringToByteArray(strToDecrypt)));
  //     } catch (Exception e) { System.out.println("Error while decrypting: " + e); }
  //     return null;
  // }
  createHeaderSignature(
    httpMethod: string,
    uri: string,
    jsonString: any,
    signatureKey: string,
    queryParams: string,
  ): string {
    // Create a string to sign
    // const queryParams = '';  // You can modify this to include query parameters if needed
    const stringToSign = `${httpMethod}\n${uri}\n${queryParams}\n${JSON.stringify(jsonString)}`;
    console.log("String to sign:", stringToSign);
    // Generate HMAC-SHA256 signature
    const hmac = CryptoJS.HmacSHA256(stringToSign, signatureKey);
    console.log("HMAC", hmac);
    const signature = CryptoJS.enc.Base64.stringify(hmac); // Encode the result to base64
    console.log("Signature:", signature);
    return signature;
  }
  // createHeaders(data: any) {
  //     const key = (Math.floor(Math.random() * (999999999999 - 100000000000 + 1)) + 100000000000).toString();
  //     const headers = new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'x-signature': data.signature,
  //         'x-deviceid': 'supriyamergu1997@gmail.com',
  //         'x-uuid': key,
  //         'x-timestamp': data.timeStamp,
  //     });
  //     return {headers,key};
  // }
  createHeader() {
    const keys = this.getUserData();
    const key = (
      Math.floor(Math.random() * (999999999999 - 100000000000 + 1)) +
      100000000000
    ).toString();

    // Handle case when keys is null (no session data)
    const deviceId = keys?.deviceId || "default-device-id";

    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'x-signature': data.signature,
      "x-deviceid": `${deviceId}`,
      "x-keyvalidation": key,
      // 'x-timestamp': data.timeStamp,
    });
    return { headers, key };
  }
  // encryptDataold(data: any): string {
  //     // const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // AES 256-bit key
  //     // const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV
  //     const iv = CryptoJS.enc.Hex.parse(`${environment.iv}`); // Initialization vector (IV)
  //     const key = CryptoJS.enc.Base64.parse("12345678901234567890123456789012"); // Base64-encoded secret key
  //     const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
  //         iv: iv,
  //         mode: CryptoJS.mode.CBC,
  //         padding: CryptoJS.pad.Pkcs7
  //     });
  //     return encrypted.ciphertext.toString(CryptoJS.enc.Hex); // Return hex-encoded ciphertext
  // }
  // public static String CreateHeaderSignature(String httpMethod, String Uri, String jsonString2) {
  //     Create the signature    Mac mac = null;    String signature = null;
  //     Create a string to sign    String queryParams = "";
  //            String stringToSign = httpMethod + "\n" + Uri + "\n" + queryParams + "\n" + jsonString2;
  //     Log.v("signatureKey", stringToSign);
  //     try {
  //         mac = Mac.getInstance("HmacSHA256");
  //         SecretKeySpec secretKeySpec = new SecretKeySpec(ApiKeys.SIGNATURE_KEY.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
  //         mac.init(secretKeySpec);
  //         byte[] rawHmac = mac.doFinal(stringToSign.getBytes(StandardCharsets.UTF_8));
  //         signature = Base64.getEncoder().encodeToString(rawHmac);
  //     } catch (NoSuchAlgorithmException | InvalidKeyException e) { e.printStackTrace(); }
  //     return signature;
  // }
}
