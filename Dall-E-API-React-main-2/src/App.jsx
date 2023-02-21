import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [preset, setPreset] = useState("london 18th century");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh..."
  );
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const presetImage = async (presetValue) => {
    setPreset(presetValue);
    // await generateImage();
  }

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt + ' ' + preset,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };
  return (
    <div className="app-main">
      {loading ? (
        <>
          <h2>Generating..Please Wait..</h2>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          {/* <div>
            <button onClick={() => presetImage('london 18th century')}>london 18th century</button>
            <button onClick={() => presetImage('london 19th century')}>london 19th century</button>
            <button onClick={() => presetImage('london 20th century')}>london 20th century</button>
          </div> */}
          <h2>Generate an Image using Open AI API</h2>

          <p>Describe an image using a prompt and select the century using the dropdown.</p>

          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="40"
          />
          <select name="size" id="size" defaultValue={'london 18th century'} onChange={(e)=>presetImage(e.target.value)}>
            <option value="london 18th century">london 18th century</option>
            <option value="london 19th century">london 19th century</option>
            <option value="london 20th century">london 20th century</option>
          </select> <br></br>
          <button onClick={generateImage}>Generate an Image</button>
          {result.length > 0 ? (
            <img className="result-image" src={result} alt="result" />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default App;
