import { useState } from "react";

function App(){

const [query, setQuery] = useState("");
const [country, setCountry] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
const [isDark, setIsDark] = useState(false);

async function searchCountry() {
  setIsLoading(true);
  setError("");
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);
    
    if (!res.ok) {  // ✅ yeh add karo
      setError("Country not found!");
      setIsLoading(false);
      return;
    }
    
    const data = await res.json();
    setCountry(data[0]);
  } catch (err) {
    setError("Country not found!");
  }
  setIsLoading(false);
}
return (
  <div className={`min-h-screen flex flex-col items-center p-10 ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <button
  onClick={() => setIsDark(!isDark)}
  className="mb-4 px-4 py-2 rounded-lg bg-gray-700 text-white"
>
  {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
    <h1 className="text-4xl font-bold mb-6">Country Search</h1>
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Search country..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchCountry()}
        className="border p-2 rounded-lg w-64"
      />
      <button
        onClick={searchCountry}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Search
      </button>
    </div>

    {isLoading && <p>Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}
    
    {country && (
  <div className={`mt-6 p-6 rounded-xl shadow-md text-center ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <img src={country.flags.png} className="w-32 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">{country.name.common}</h2>
        <p>Capital: {country.capital[0]}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
      </div>
    )}
    

  </div>
);
  }

export default App;