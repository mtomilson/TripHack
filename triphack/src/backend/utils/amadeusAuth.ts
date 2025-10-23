import dotenv from "dotenv"

let cachedToken: string | null = null;
let tokenExpiry = 0;

dotenv.config();

export async function getAccessToken(): Promise<string> {
  // says "i promise to give you something once i finish running this"
  if (cachedToken && Date.now() < tokenExpiry) {
    //if cached token is still valid, reuse it we do NOT want to create a new one
    return cachedToken;
  }

  //if we do not have a cached token, request new one

  const response = await fetch(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_API_KEY!,
        client_secret: process.env.AMADEUS_API_SECRET!,
      })
    }
  );
  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000;

  return cachedToken!;
}
