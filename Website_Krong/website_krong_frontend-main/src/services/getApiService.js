const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchData(endpoint, options = {}, fetchMode = "default") {
  const API_KEY = process.env.API_KEY;
  const headers = {
    "Content-Type": "application/json",
    Authorization: API_KEY,
    ...options.headers,
  };

  const fetchOptions = {
    method: "GET",
    headers,
    ...options,
  };

  // Handle cache mode cleanly
  if (fetchMode === "no-store") {
    fetchOptions.cache = "no-store";
  } else if (fetchMode === "revalidate") {
    fetchOptions.next = { revalidate: 60 };
  }
  try {
    const response = await fetch(`${API_URL}${endpoint}`, fetchOptions);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return null; // Handle errors gracefully
  }
}
